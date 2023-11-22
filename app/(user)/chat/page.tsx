import ChatList from "@/components/ChatList";
import ChatPermissionError from "@/components/ChatPermissionError";
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
      {
        error === "permission" && (
          <div className="m-2">
            <ChatPermissionError />
          </div>
        )
      }
      <ChatList />
    </div>
  );
};

export default ChatPage;
