"use client";

import { auth } from "@/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

interface FirebaseAuthProviderProps {
  children: React.ReactNode;
}

const syncFirebasAuth = async (session: Session) => {
  if (session && session.firebaseToken) {
    try {
      await signInWithCustomToken(auth, session.firebaseToken);
    } catch (error) {
      console.error(`Error signing in with custom token: ${error}`);
    }
  } else {
    auth.signOut();
  }
};

const FirebaseAuthProvider: React.FC<FirebaseAuthProviderProps> = ({
  children,
}) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;
    syncFirebasAuth(session);
  }, [session]);

  return <>{children}</>;
};

export default FirebaseAuthProvider;
