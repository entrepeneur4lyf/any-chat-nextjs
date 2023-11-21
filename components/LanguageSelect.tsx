"use client";

import {
  LanguagesSupported,
  LanguagesSupportedMap,
  useLanguageStore,
  useSubscriptionStore,
} from "@/store/store";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const LanguageSelect = () => {
  const [language, setLanguage, getLanguages, getNotSupportedLanguages] =
    useLanguageStore((state) => [
      state.language,
      state.setLanguage,
      state.getLanguages,
      state.getNotSupportedLanguages,
    ]);

  const subscription = useSubscriptionStore((state) => state.subscription);
  const isPro =
    subscription?.role === "pro" || subscription?.status === "active";

  const pathName = usePathname();
  const isChatPage = pathName.includes("/chat");
  return (
    isChatPage && (
      <div>
        <Select
          onValueChange={(value: LanguagesSupported) => setLanguage(value)}
        >
          <SelectTrigger className="w-[150px] text-black dark:text-white">
            <SelectValue
              placeholder={LanguagesSupportedMap[language]}
              className=""
            />
          </SelectTrigger>

          <SelectContent>
            {subscription === undefined ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                {getLanguages(isPro).map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {LanguagesSupportedMap[lang]}
                  </SelectItem>
                ))}

                {getNotSupportedLanguages(isPro).map((lang) => (
                  <Link href="/register" key={lang} prefetch={false}>
                    <SelectItem
                      key={lang}
                      value={lang}
                      disabled
                      className="bg-gray300/50 text-gray500 dark:text-white py-2 my-1"
                    >
                      {LanguagesSupportedMap[lang]} (PRO)
                    </SelectItem>
                  </Link>
                ))}
              </>
            )}
          </SelectContent>
        </Select>
      </div>
    )
  );
};

export default LanguageSelect;
