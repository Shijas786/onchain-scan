import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({
  chain: mainnet,
  transport: http()
});

export async function resolveEns(nameOrAddress: string): Promise<string> {
  if (nameOrAddress.endsWith(".eth")) {
    try {
      const addr = await client.getEnsAddress({ name: nameOrAddress });
      return addr ?? nameOrAddress;
    } catch {
      return nameOrAddress;
    }
  }

  return nameOrAddress;
}

