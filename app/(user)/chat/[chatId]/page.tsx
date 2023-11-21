import ChatInput from "@/components/ChatInput";
import React from "react";

interface ChatPageProps {
  params: {
    chatId: string;
  };
}

const ChatPage: React.FC<ChatPageProps> = ({ params: { chatId } }) => {
  return (
    <>
      {/* Admin Controls */}
      {/* Chat Members Badge */}
      {/* Chat Messages */}
      {/* Chat Input */}
      <ChatInput chatId={chatId} />
    </>
  );
};

export default ChatPage;
