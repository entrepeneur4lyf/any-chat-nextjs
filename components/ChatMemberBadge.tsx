"use client";

import useAdminId from "@/hooks/useAdminId";
import { ChatMembers, chatMembersRef } from "@/lib/converters/ChatMember";
import { Loader2 } from "lucide-react";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Badge } from "./ui/badge";
import UserAvtar from "./UserAvtar";

interface ChatMemberBadgeProps {
  chatId: string;
}

const ChatMemberBadge: React.FC<ChatMemberBadgeProps> = ({ chatId }) => {
  const [members, loading, error] = useCollectionData<ChatMembers>(
    chatMembersRef(chatId)
  );
  console.log({members});

  const adminId = useAdminId(chatId);

  if (loading && !members) return <Loader2 className="animate-spin" />;

  return (
    !loading && (
      <div className="p-2 border rounded-xl m-5">
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 p-2">
          {members?.map((member) => (
            <Badge
              variant="secondary"
              key={member.userId}
              className="h-14 p-5 pl-2 pr-5 fled space-x-2"
            >
              <div className="flex items-center space-x-2">
                <UserAvtar name={member.email} image={member.image} />
              </div>
              <div className="">
                <p className="">{member.email}</p>
                {member.userId === adminId && (
                  <p className="text-indigo-400 animate-pulse">Admin</p>
                )}
              </div>
            </Badge>
          ))}
        </div>
      </div>
    )
  );
};

export default ChatMemberBadge;
