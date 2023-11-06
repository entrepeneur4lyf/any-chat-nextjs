"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { MessageSquarePlusIcon } from "lucide-react";

export const CreateChatButton = () => {
  const router = useRouter();

  const createNewChat = async () => {
    router.push(`/chat/asd`);
  };

  return (
    <Button onClick={createNewChat} variant="ghost">
      <MessageSquarePlusIcon className="text-black dark:text-white" />
    </Button>
  );
};
