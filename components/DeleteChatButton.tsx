"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useToast } from "./ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useAdminId from "@/hooks/useAdminId";
import axios from "axios";

interface DeleteChatButtonProps {
  chatId: string;
}

const DeleteChatButton: React.FC<DeleteChatButtonProps> = ({ chatId }) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const adminId = useAdminId(chatId);

  const handleDelete = async () => {
    toast({
      title: "Deleting chat...",
      description: "This may take a moment.",
    });

    await axios
      .delete(`/api/chat/delete`, {
        data: {
          chatId,
        },
      })
      .then(() => {
        toast({
          title: "Success",
          description: "Your chat has been deleted.",
          className: "bg-green-500 text-white",
          duration: 3000,
        });
        router.replace("/chat");
      })
      .catch((err) => {
        console.log(`Error deleting chat: ${err}`);
        toast({
          title: "Error",
          description: "There was an error deleting your chat.",
          className: "bg-red-500 text-white",
          duration: 3000,
        });
      })
      .finally(() => {
        setIsOpen(false);
      });
  };

  return (
    session?.user?.id === adminId && (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive">Delete Chat</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this chat?
            </DialogTitle>
            <DialogDescription>
              This will delete all messages and cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 space-x-2">
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>

            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  );
};

export default DeleteChatButton;
