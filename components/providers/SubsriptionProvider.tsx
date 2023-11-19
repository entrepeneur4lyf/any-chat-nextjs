"use client";

import { subscriptionRef } from "@/lib/converters/Subscription";
import { useSubscriptionStore } from "@/store/store";
import { onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

interface SubscriptionProviderProps {
  children: React.ReactNode;
}

const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({
  children,
}) => {
  const { data: session } = useSession();

  const setSubscription = useSubscriptionStore(
    (state) => state.setSubscription
  );

  useEffect(() => {
    if (!session?.user.id) return;

    return onSnapshot(
      subscriptionRef(session?.user.id),
      (snapshot) => {
        if (snapshot.empty) {
          console.log("User has no subscription");
          setSubscription(null);
          return;
        } else {
          console.log("User has a subscription");
          setSubscription(snapshot.docs[0].data());
        }
      },
      (error) => {
        console.log(`Error getting user subscription: ${error}`);
      }
    );
  }, [session, setSubscription]);

  return <>{children}</>;
};

export default SubscriptionProvider;
