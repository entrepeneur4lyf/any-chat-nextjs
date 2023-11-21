import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ClientProvider from "@/components/providers/ClientProvider";
import FirebaseAuthProvider from "@/components/providers/FirebaseAuthProvider";
import SubscriptionProvider from "@/components/providers/SubsriptionProvider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Any Chat",
  description:
    "You can chat in any language with anyone. No need to know the language of the other person.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <html lang="en">
        <body className="flex flex-col min-h-screen">
          <FirebaseAuthProvider>
            <SubscriptionProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                storageKey="any-chat-theme"
              >
                <Header />
                {children}
                <Toaster />
              </ThemeProvider>
            </SubscriptionProvider>
          </FirebaseAuthProvider>
        </body>
      </html>
    </ClientProvider>
  );
}
