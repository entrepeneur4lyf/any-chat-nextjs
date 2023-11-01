import Link from "next/link";
import React from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const Logo = () => {
  return (
    <Link href="/" prefetch={false} className="overflow-hidden">
      <div className="flex items-center w-72 h-14">
        <AspectRatio
          ratio={16 / 9}
          className="flex items-center justify-center"
        >
        <h1 className={cn("text-2xl font-bold", font.className)}>
            Any Chat
        </h1>
        </AspectRatio>
      </div>
    </Link>
  );
};

export default Logo;
