"use client";

import { createAppKit } from "@reown/appkit";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { base } from "viem/chains";
import { wagmiConfig } from "./wagmi";

const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!;

const wagmiAdapter = new WagmiAdapter({
  wagmiConfig,
  projectId,
  networks: [base]
});

export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks: [base],
  projectId,
  themeMode: "light",
  defaultNetwork: base,
  features: {
    email: true,
    socials: true
  }
});

