"use client";

import { Header } from "@/components/layout/Header";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { useReadContract } from "wagmi";
import { ONCHAIN_SCORE_ABI, CONTRACT_ADDRESS } from "@/lib/abi";
import { Loader2 } from "lucide-react";

export default function LeaderboardPage() {
    const { data, isLoading, error } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: ONCHAIN_SCORE_ABI,
        functionName: "getAllScores",
    });

    const [addresses, scores] = (data as [string[], bigint[]]) || [[], []];

    const entries = addresses.map((addr, i) => ({
        rank: 0, // Will assign after sort
        address: addr,
        score: Number(scores[i]),
        tokens: 0, // Placeholder as contract doesn't store this details
        lps: 0,
        lastActive: "Recently",
    }));

    // Sort by score desc
    entries.sort((a, b) => b.score - a.score);

    // Assign ranks
    entries.forEach((e, i) => {
        e.rank = i + 1;
    });

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <Header />

            <div className="pt-24 pb-10 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl font-bold text-dark-text mb-2">Global Leaderboard</h1>
                    <p className="text-muted-text">Top onchain performers on Base</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-base-blue" />
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500">
                        Failed to load leaderboard. Contract might not be deployed.
                    </div>
                ) : (
                    <LeaderboardTable entries={entries} />
                )}
            </div>
        </main>
    );
}
