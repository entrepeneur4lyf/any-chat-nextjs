import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

import React from "react";

interface UserAvtarProps {
  name?: string | null;
  image?: string | null;
  className?: string;
}

const UserAvtar: React.FC<UserAvtarProps> = ({ image, name, className }) => {
  return (
    <Avatar className={cn("bg-white text-black", className)}>
      {image && (
        <AvatarImage
          src={image}
          alt={name || "User Avatar"}
          width={40}
          height={40}
          className="rounded-full"
        />
      )}

      <AvatarFallback delayMs={1000} className="dark:bg-white dark:text-black text-lg">
        {name
          ?.split(" ")
          .map((n) => n[0])
          .join("")}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvtar;
