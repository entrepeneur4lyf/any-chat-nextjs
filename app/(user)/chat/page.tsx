import ChatList from "@/components/ChatList";
import React from "react";

interface ChatPageProps {
  params: {};
  searchParams: {
    error: string;
  };
}

const ChatPage: React.FC<ChatPageProps> = ({
  params,
  searchParams: { error },
}) => {
  return (
    <div>
      {/* Chat Permission Chat */}

      <ChatList />
    </div>
  );
};

export default ChatPage;
