import { createConfig, http } from "@wagmi/core";
import { base } from "viem/chains";
import { injected, walletConnect } from "@wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_REOWN_PROJECT_ID!
    })
  ],
  transports: {
    [base.id]: http()
  }
});
