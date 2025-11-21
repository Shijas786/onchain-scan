export const ONCHAIN_SCORE_ABI = [
    {
        inputs: [{ internalType: "uint256", name: "newScore", type: "uint256" }],
        name: "updateScore",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "getAllScores",
        outputs: [
            { internalType: "address[]", name: "", type: "address[]" },
            { internalType: "uint256[]", name: "", type: "uint256[]" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "scores",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
] as const;

export const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Replace with deployed address
