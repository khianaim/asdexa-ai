"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

// Optional: load Clerk secret key for direct API call
const CLERK_API_KEY = process.env.CLERK_SECRET_KEY;

async function ensureUserExists(userId) {
  // First try to find by Clerk userId
  let user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    // Fetch Clerk user data via API
    const clerkUser = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    }).then((res) => res.json());

    const email = clerkUser.email_addresses?.[0]?.email_address;

    // Check if a user with this email already exists
    user = await db.user.findUnique({
      where: { email },
    });

    if (user) {
      // Just attach the Clerk userId if missing
      user = await db.user.update({
        where: { email },
        data: {
          clerkUserId: userId,
        },
      });
    } else {
      // Create new user if none exists
      user = await db.user.create({
        data: {
          clerkUserId: userId,
          email,
          name: clerkUser.first_name ?? "User",
          imageUrl: clerkUser.image_url,
        },
      });
    }
  }

  return user;
}


export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await ensureUserExists(userId);

  try {
    const result = await db.$transaction(
      async (tx) => {
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });

        if (!industryInsight) {
          const insights = await generateAIInsights(data.industry);

          // Normalize enum values for Prisma
          insights.demandLevel = insights.demandLevel?.toUpperCase();
          insights.marketOutlook = insights.marketOutlook?.toUpperCase();

          industryInsight = await tx.industryInsight.create({
            data: {
              industry: data.industry,
              ...insights,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
        }

        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { updatedUser, industryInsight };
      },
      {
        timeout: 10000,
      }
    );

    revalidatePath("/");
    return result.updatedUser;
  } catch (error) {
    console.error("Error updating user and industry:", error.message);
    throw new Error("Failed to update profile");
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await ensureUserExists(userId);

  try {
    const userWithIndustry = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    return {
      isOnboarded: !!userWithIndustry?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}
