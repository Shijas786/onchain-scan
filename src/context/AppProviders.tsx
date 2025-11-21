"use client";

import { ReactNode, useEffect } from "react";
import { WagmiConfig } from "wagmi";
import { wagmiConfig } from "@/lib/wagmi";
import { appKit } from "@/lib/appkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function AppProviders({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Initialize AppKit client-side only
    appKit;
  }, []);

  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiConfig>
  );
}

