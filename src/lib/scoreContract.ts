import { base } from "viem/chains";
import { Address } from "viem";

export const SCORE_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_SCORE_CONTRACT_ADDRESS as Address;

export const scoreAbi = [
  {
    type: "function",
    name: "updateScore",
    stateMutability: "nonpayable",
    inputs: [{ name: "newScore", type: "uint256" }],
    outputs: []
  },
  {
    type: "function",
    name: "getScore",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ type: "uint256" }]
  }
] as const;

export const scoreChain = base;

