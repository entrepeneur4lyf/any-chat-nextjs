"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Loader2, MessageSquarePlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { useSubscriptionStore } from "@/store/store";
import { v4 as uuid4 } from "uuid";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import {
  addChatRef,
  chatMembersCollectionGroupRef,
} from "@/lib/converters/ChatMember";
import { ToastAction } from "./ui/toast";

interface CreateChatButtonProps {
  isLarge?: boolean;
}

export const CreateChatButton: React.FC<CreateChatButtonProps> = ({
  isLarge,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);

  const createNewChat = async () => {
    if (!session?.user?.id) return;

    setLoading(true);
    toast({
      title: "Creating a new chat...",
      description: "Please wait while we create a new chat for you",
      duration: 5000,
    });

    const noOfchats = (
      await getDocs(chatMembersCollectionGroupRef(session.user.id))
    ).docs.map((doc) => doc.data()).length;

    const isPro =
      subscription?.role === "pro" || subscription?.status === "active";

    if (!isPro && noOfchats >= 3) {
      toast({
        title: "You have reached the maximum number of chats!",
        description: "Please upgrade to pro to create more chats",
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push("/register")}
          >
            Upgrade to Pro
          </ToastAction>
        ),
      });
      return;
    }
    const chatId = uuid4();

    await setDoc(addChatRef(chatId, session.user.id), {
      userId: session.user.id!,
      email: session.user.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId,
      image: session.user.image || "",
    })
      .then(() => {
        toast({
          title: "Chat created!",
          description: "You can now start chatting with your friends",
          duration: 5000,
        });
        router.push(`/chat/${chatId}`);
      })
      .catch((err) => {
        toast({
          title: "Error creating chat!",
          description: err.message,
          duration: 5000,
        });
      })
      .finally(() => {
        setLoading(false);
      });

    // router.push(`/chat/asd`);
  };

  if (isLarge) {
    return (
      <Button variant="default" onClick={createNewChat}>
        {loading ? <Loader2 className="animate-spin" /> : "Crate a New Chat"}
      </Button>
    );
  }

  return (
    <Button onClick={createNewChat} variant="ghost">
      <MessageSquarePlusIcon className="text-black dark:text-white" />
    </Button>
  );
};
