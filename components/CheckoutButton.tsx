"use client";

import { db } from "@/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const CheckoutButton = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const createCheckoutSession = async () => {
    if (!session?.user.id) return;

    // push a document into firestore database
    setLoading(true);

    const docReg = await addDoc(
      collection(db, "customers", session?.user.id, "checkout_sessions"),
      {
        price: "price_1ODtu3SASZjM18yWaFqefhNT",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );
    // ... strpe extension on firebase will create a checkout session
    return onSnapshot(docReg, (snap) => {
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;

      if (error) {
        // show error to your customer
        // inspect your cloud function logs in the firebase console
        alert(`An error occured: ${error.message}`);
        setLoading(false);
      }

      if (url) {
        // redirect to checkout
        window.location.assign(url);
        setLoading(false);
      }
    });
    // redirect user to checkout page
  };

  return (
    <div className="flex flex-col space-y-2">
      <button
        onClick={() => createCheckoutSession()}
        className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80"
      >
        {loading ? "Loading..." : "Sign Up"}
      </button>
    </div>
  );
};

export default CheckoutButton;
