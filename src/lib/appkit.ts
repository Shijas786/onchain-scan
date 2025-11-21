"use client";

import { createAppKit } from "@reown/appkit";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { base } from "viem/chains";
import { base as baseNetwork } from "@reown/appkit/networks";
import { http } from "@wagmi/core";

const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!;

const wagmiAdapter = new WagmiAdapter({
  chains: [base],
  connectors: [],
  transports: {
    [base.id]: http()
  },
  networks: [baseNetwork],
  projectId
});

export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks: [baseNetwork],
  projectId,
  themeMode: "light",
  features: {
    email: true
  }
});

