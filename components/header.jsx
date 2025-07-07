import React from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";

export default async function Header() {
  await checkUser();

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
      <Image
      src={"/asdexa.png"}
      alt="Asdexa Logo"
      width={300}
      height={100}
      className="h-28 w-auto object-contain"
    />

        </Link>
        {/* Action Buttons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button
                variant="accent1"
                className="hidden md:inline-flex items-center gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                Industry Insights
              </Button>
              <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>

            {/* Growth Tools Dropdown */}
            <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="accent2" className="flex items-center gap-2">
      <StarsIcon className="h-4 w-4" />
      <span className="hidden md:block">Growth Tools</span>
      <ChevronDown className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      className="w-56 bg-white border border-gray-200 shadow-xl rounded-xl p-2"
    >
      {[
        {
          href: "/resume",
          label: "Build Resume",
          icon: FileText,
        },
        {
          href: "/ai-cover-letter",
          label: "Cover Letter",
          icon: PenBox,
        },
        {
          href: "/interview",
          label: "Interview Prep",
          icon: GraduationCap,
        },
      ].map(({ href, label, icon: Icon }) => (
        <DropdownMenuItem
          key={label}
          asChild
          className="group cursor-pointer px-3 py-2 rounded-full transition-all duration-200 ease-in-out hover:bg-[#f7c6f9]/60 focus:bg-[#f7c6f9]/60"
        >
          <Link
            href={href}
            className="flex items-center gap-2 text-sm font-medium text-black/80 group-hover:text-black transition-colors duration-200 ease-in-out"
          >
            <Icon className="h-4 w-4 text-black/70 group-hover:text-black transition-colors duration-200" />
            <span className="group-hover:text-black transition-colors duration-200">
              {label}
            </span>
          </Link>
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
</DropdownMenu>

          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
