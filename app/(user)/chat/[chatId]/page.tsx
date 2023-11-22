import { authOptions } from "@/auth";
import AdminControls from "@/components/AdminControls";
import ChatInput from "@/components/ChatInput";
import ChatMemberBadge from "@/components/ChatMemberBadge";
import ChatMessages from "@/components/ChatMessages";
import { sortedMessagesRef } from "@/lib/converters/Messages";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import React from "react";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

const ChatPage: React.FC<ChatPageProps> = async ({ params: { chatId } }) => {
  const session = await getServerSession(authOptions);

  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data()
  );

  return (
    <>
      {/* Admin Controls */}
      <AdminControls chatId={chatId} />
      {/* Chat Members Badge */}
      <ChatMemberBadge chatId={chatId}/>
      {/* Chat Messages */}
      <div className="flex-1">
        <ChatMessages
          chatId={chatId}
          session={session}
          initialMessages={initialMessages}
        />
      </div>
      {/* Chat Input */}
      <ChatInput chatId={chatId} />
    </>
  );
};

export default ChatPage;
