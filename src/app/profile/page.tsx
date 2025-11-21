"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { ScoreCard } from "@/components/profile/ScoreCard";
import { StatCard } from "@/components/profile/StatCard";
import { TokensTable } from "@/components/profile/TokensTable";
import { NftGrid } from "@/components/profile/NftGrid";
import { WalletData } from "@/lib/covalent";
import { ScoreBreakdown } from "@/lib/scoring";
import { Coins, Image as ImageIcon, Activity, Layers, Share2, UploadCloud } from "lucide-react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { Button } from "@/components/ui/button";
import { ONCHAIN_SCORE_ABI, CONTRACT_ADDRESS } from "@/lib/abi";

export default function ProfilePage() {
    const searchParams = useSearchParams();
    const address = searchParams.get("address");

    const [data, setData] = useState<WalletData | null>(null);
    const [score, setScore] = useState<ScoreBreakdown | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { address: connectedAddress } = useAccount();
    const { writeContract, data: hash, isPending } = useWriteContract();
    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    useEffect(() => {
        if (!address) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/scan?address=${address}`);
                const json = await res.json();
                if (json.error) throw new Error(json.error);

                setData(json.walletData);
                setScore(json.score);
            } catch (err) {
                console.error(err);
                setError("Failed to load profile data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [address]);

    const handlePublish = () => {
        if (!score) return;
        writeContract({
            address: CONTRACT_ADDRESS,
            abi: ONCHAIN_SCORE_ABI,
            functionName: "updateScore",
            args: [BigInt(score.total)],
        });
    };

    if (!address) return <div>No address provided</div>;

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <Header />

            <div className="pt-24 pb-10 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-dark-text mb-2">Onchain Profile</h1>
                            <p className="text-muted-text font-mono bg-gray-100 px-3 py-1 rounded-lg inline-block">
                                {address}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            {connectedAddress === address && (
                                <Button
                                    onClick={handlePublish}
                                    disabled={!score || isPending || isConfirming || isSuccess}
                                    className="gap-2"
                                >
                                    {isPending || isConfirming ? (
                                        <Activity className="w-4 h-4 animate-spin" />
                                    ) : isSuccess ? (
                                        <UploadCloud className="w-4 h-4" />
                                    ) : (
                                        <UploadCloud className="w-4 h-4" />
                                    )}
                                    {isSuccess ? "Published!" : "Publish Score"}
                                </Button>
                            )}
                            <Button variant="outline" className="gap-2">
                                <Share2 className="w-4 h-4" /> Share
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-8">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                    <div className="lg:col-span-1">
                        <ScoreCard score={score?.total || 0} loading={loading} />

                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <StatCard
                                label="Tokens"
                                value={data?.tokens.length || 0}
                                icon={Coins}
                            />
                            <StatCard
                                label="NFTs"
                                value={data?.nfts.length || 0}
                                icon={ImageIcon}
                            />
                            <StatCard
                                label="Transactions"
                                value={data?.transactions.length || 0}
                                icon={Activity}
                            />
                            <StatCard
                                label="LPs"
                                value={data?.liquidity?.length || 0}
                                icon={Layers}
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        {loading ? (
                            <div className="h-64 bg-white rounded-xl animate-pulse" />
                        ) : (
                            <>
                                <TokensTable tokens={data?.tokens || []} />

                                <div>
                                    <h3 className="text-xl font-bold text-dark-text mb-4">NFT Collection</h3>
                                    <NftGrid nfts={data?.nfts || []} />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
