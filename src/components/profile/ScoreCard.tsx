"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

interface ScoreCardProps {
    score: number;
    rank?: number;
    loading?: boolean;
}

export function ScoreCard({ score, rank, loading }: ScoreCardProps) {
    if (loading) {
        return (
            <div className="bg-white rounded-2xl p-8 shadow-lg animate-pulse h-64 flex items-center justify-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 shadow-lg relative overflow-hidden text-center"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Trophy className="w-32 h-32 text-base-blue" />
            </div>

            <h3 className="text-lg font-medium text-muted-text mb-2">Onchain Score</h3>
            <div className="text-6xl font-bold text-base-blue mb-4">{score}</div>

            {rank && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-soft-blue rounded-full text-base-blue font-medium">
                    <Trophy className="w-4 h-4" />
                    Rank #{rank}
                </div>
            )}
        </motion.div>
    );
}
