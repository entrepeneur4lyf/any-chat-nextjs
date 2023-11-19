"use server";

/**
 * This code is not working facing error that's why i created api
 * path: app/api/stripe/route.ts
 *
 * Error: action="javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you're trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
 * https://github.com/vercel/next.js/discussions/54337
 */
import { authOptions } from "@/auth";
import { adminDb } from "@/firebase-admin";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export const generatePortalLink = async () => {
  const session = await getServerSession(authOptions);
  const host = headers().get("host");

  if (!session?.user.id) return console.log("No user id found");

  const {
    user: { id },
  } = session;

  const returnUrl =
    process.env.NODE_ENV === "development"
      ? `http://${host}/register`
      : `https://${host}/register`;

  const doc = await adminDb.collection("customers").doc(id).get();

  if (!doc.data()) return console.log(`No customer found for ${id}`);

  const stripeId = doc.data()!.stripeId;

  const stripeSession = await stripe.billingPortal.sessions.create({
    customer: stripeId,
    return_url: returnUrl,
  });

  redirect(stripeSession.url);
};
