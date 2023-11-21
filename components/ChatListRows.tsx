"use client";

import {
  ChatMembers,
  chatMembersCollectionGroupRef,
} from "@/lib/converters/ChatMember";
import { MessageSquare } from "lucide-react";

import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { CreateChatButton } from "./CreateChatButton";
import { useSession } from "next-auth/react";
import ChatListRow from "./ChatListRow";

interface ChatListRowsProps {
  initialChats: ChatMembers[];
}

const ChatListRows: React.FC<ChatListRowsProps> = ({ initialChats }) => {
  const { data: session } = useSession();

  const [members, loding, error] = useCollectionData<ChatMembers>(
    session && chatMembersCollectionGroupRef(session?.user.id!),
    {
      initialValue: initialChats,
      
    }
  );

  if (members?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center pt-42 space-y-2">
        <MessageSquare className="h-10 w-10" />
        <h1 className="text-5xl font-extralight">Welcome!</h1>
        <h2 className="pb-10">
          You have no chats. Click the button below to start a new chat.
        </h2>
        <CreateChatButton isLarge />
      </div>
    );
  }

  return (
    <div>
      {members?.map((member) => (
        <ChatListRow key={member.chatId} chatId={member.chatId} />
      ))}
    </div>
  );
};

export default ChatListRows;
