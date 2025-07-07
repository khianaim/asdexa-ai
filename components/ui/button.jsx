import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-black/80 shadow-md",
        accent1: "bg-white border border-black text-black hover:bg-black hover:text-white shadow-md",
        accent2: "bg-[#f7c6f9] text-black hover:bg-[#e2c3dc] shadow-sm",
        accent3: "bg-[#decce1] text-black hover:bg-[#ceb8cf] shadow-sm",
        outline:
          "border border-gray-300 text-black hover:bg-[#f7f7f7] shadow-sm",
        ghost: "bg-transparent hover:bg-[#f5f5f5] text-black",
        link: "text-[#555ea4] hover:underline underline-offset-4",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-8 px-3 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
