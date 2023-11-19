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
import { useSubscriptionStore } from "@/store/store";
import { Loader2, StarIcon } from "lucide-react";
import ManageAccountButton from "./ManageAccountButton";

interface UserButtonProps {
  session: Session | null;
}

const UserButton: React.FC<UserButtonProps> = ({ session }) => {
  const subsctiption = useSubscriptionStore((state) => state.subscription);

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

            {subsctiption === undefined && (
              <DropdownMenuItem>
                <Loader2 className="flex items-center justify-center animate-spin" />
              </DropdownMenuItem>
            )}
            {subsctiption?.role === "pro" && (
              <>
                <DropdownMenuLabel className="text-xs flex items-center justify-center space-x-1 text-[#E935C1] animate-pulse">
                  <StarIcon />
                  <span className="text-green-500">Pro </span> Member
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <ManageAccountButton />
                </DropdownMenuItem>
              </>
            )}

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
