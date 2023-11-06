"use client";

import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvtar from "./UserAvtar";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react";

interface UserButtonProps {
  session: Session | null;
}

const UserButton: React.FC<UserButtonProps> = ({ session }) => {
  if (!session)
    return (
      <Button variant="outline" onClick={() => signIn()}>
        Sign In
      </Button>
    );

  return (
    session && (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvtar name={session.user?.name} image={session.user?.image} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => signOut()}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  );
};

export default UserButton;
