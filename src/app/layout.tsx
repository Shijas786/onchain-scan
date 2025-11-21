import "../styles/globals.css";
import type { Metadata } from "next";
import { AppProviders } from "@/context/AppProviders";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Onchain Profile Tracker",
  description: "Base Onchain Profile Tracker Miniapp"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-baseBg text-baseText">
        <AppProviders>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 max-w-6xl mx-auto px-4 pb-12 pt-6">
              {children}
            </main>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
