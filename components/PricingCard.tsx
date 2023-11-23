import { CheckIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import CheckoutButton from "./CheckoutButton";

interface PricingCardProps {
  redirect: boolean;
}

const tiels = [
  {
    name: "Starter",
    id: null,
    href: "#",
    priceMonthly: 0,
    description:
      "Get chatting right away with anyone, anywhere, in any language.",
    features: [
      "20 Message Chat Limit in Chats",
      "2 Perticipant Limit in Chats",
      "3 Chat Room Limit",
      "Supports 2 Language",
      "48-hour support response time",
    ],
  },
  {
    name: "Pro",
    id: "pro",
    href: "#",
    priceMonthly: "₹59",
    description: "Unlock all features and start chatting with anyone.",
    features: [
      "Unlimited Messages in Chats",
      "Unlimited Perticipants in Chats",
      "Unlimited Chat Rooms",
      "Supports 10 Language",
      "1-hour, dedicated support response time",
      "Early access to new features",
    ],
  },
];

const PricingCard: React.FC<PricingCardProps> = ({ redirect }) => {
  return (
    <div>
      <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
        {tiels.map((tier) => (
          <div
            className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10"
            key={tier.id}
          >
            <div className="">
              <h3
                id={tier.id + tier.name}
                className="text-base font-semibold leading-7 text-indigo-600"
              >
                {tier.name}
              </h3>

              <div className="mt-4 flex items-baseline gap-x-2">
                {tier.priceMonthly ? (
                  <>
                    <span className="text-5xl font-bold tracking-tight text-gray-900">
                      {tier.priceMonthly}
                    </span>
                    <span className="text-base font-semibold leading-7 text-gray-600">
                      /month
                    </span>
                  </>
                ) : (
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    Free
                  </span>
                )}
              </div>
              <p className="mt-6 text-base leading-7 text-gray-600">
                {tier.description}
              </p>
              <ul
                role="list"
                className="mt-10 space-y-4 text-sm leading-6 text-gray-600"
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className="h-6 w-6 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {redirect ? (
              <Link
                href="/register"
                className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80"
              >
                Get Started Today
              </Link>
            ) : (
              tier.id && <CheckoutButton />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCard;
