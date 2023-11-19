import { authOptions } from "@/auth";
import { adminDb } from "@/firebase-admin";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const host = headers().get("host");

    if (!session?.user.id)
      return new NextResponse("unauthorized", { status: 401 });

    const {
      user: { id },
    } = session;

    const returnUrl =
      process.env.NODE_ENV === "development"
        ? `http://${host}/register`
        : `https://${host}/register`;

    const doc = await adminDb.collection("customers").doc(id).get();

    if (!doc.data())
      return new NextResponse(`No customer found for ${id}`, { status: 404 });

    const stripeId = doc.data()!.stripeId;

    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: stripeId,
      return_url: returnUrl,
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}
