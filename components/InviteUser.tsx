"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import { addChatRef, chatMembersRef } from "@/lib/converters/ChatMember";
import { useSession } from "next-auth/react";
import { getUserByEmailRef } from "@/lib/converters/User";
import { useToast } from "./ui/use-toast";
import useAdminId from "@/hooks/useAdminId";
import { PlusCircleIcon } from "lucide-react";
import { useSubscriptionStore } from "@/store/store";
import { ToastAction } from "./ui/toast";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import ShareLink from "./ShareLink";

interface InviteUserProps {
  chatId: string;
}

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const InviteUser: React.FC<InviteUserProps> = ({ chatId }) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const adminId = useAdminId(chatId);
  const subscription = useSubscriptionStore((state) => state.subscription);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenInviteLink, setIsOpenInviteLink] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!session?.user.id) return;

    toast({
      title: "Sending invite...",
      description: "Please wait while we send the invite to the user.",
    });

    const noOfUsersInChat = (await getDocs(chatMembersRef(chatId))).size;

    const isPro =
      subscription?.role === "pro" && subscription?.status === "active";

    if (!isPro && noOfUsersInChat >= 2) {
      toast({
        title: "You have reached the maximum number of users for this chat.",
        description: "You can only have 2 users in a chat. Upgrade to Pro.",
        variant: "destructive",
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

    const querySnapshot = await getDocs(getUserByEmailRef(values.email));

    if (querySnapshot.empty) {
      toast({
        title: "User not found.",
        description: "Please check the email address and try again.",
        variant: "destructive",
      });
      return;
    } else {
      const user = querySnapshot.docs[0].data();
      await setDoc(addChatRef(chatId, user.id), {
        userId: user.id,
        email: user.email!,
        timestamp: serverTimestamp(),
        chatId,
        isAdmin: false,
        image: user.image || "",
      }).then(() => {
        toast({
          title: "User added to chat.",
          description: "The user has been added to the chat.",
          className: "bg-green-500 text-white",
          duration: 5000,
        });

        setIsOpenInviteLink(true);
      });
    }

    form.reset();
  };

  return (
    adminId === session?.user?.id && (
      <>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircleIcon size={24} className="mr-2" />
              Add User To Chat
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add User to Chat</DialogTitle>
              <DialogDescription>
                Enter the email address of the user you want to add to this
                chat.{" "}
                <span className="text-indigo-600 font-bold">
                  (They must have an account on this site to be added to this)
                </span>
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="test@gmail.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button className="ml-auto sm:w-fit w-full" type="submit">
                  Add To Chat
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        <ShareLink
          isOpen={isOpenInviteLink}
          setIsOpen={setIsOpenInviteLink}
          chatId={chatId}
        />
      </>
    )
  );
};

export default InviteUser;
