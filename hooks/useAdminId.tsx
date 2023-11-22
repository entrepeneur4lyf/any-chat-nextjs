"use client";

import { chatMemberAdminRef } from "@/lib/converters/ChatMember";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const useAdminId = (chatId: string) => {
  const [adminId, setAdminId] = useState<string>("");

  useEffect(() => {
    const fetchAdminId = async () => {
      const adminId = (await getDocs(chatMemberAdminRef(chatId))).docs.map(
        (doc) => doc.id
      )[0];
      setAdminId(adminId);
    };
    fetchAdminId();
  }, [chatId]);

  return adminId;
};

export default useAdminId;
