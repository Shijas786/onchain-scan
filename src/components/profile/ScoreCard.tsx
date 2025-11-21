"use client";

import { OnchainProfile, ScoreBreakdown } from "@/lib/types";
import { useWriteContract } from "wagmi";
import { SCORE_CONTRACT_ADDRESS, scoreAbi } from "@/lib/scoreContract";
import { shortAddress } from "@/lib/utils";

type Props = {
  profile: OnchainProfile;
  breakdown: ScoreBreakdown;
};

export function ScoreCard({ profile, breakdown }: Props) {
  const { writeContract, isPending } = useWriteContract();

  const handlePublish = () => {
    if (!SCORE_CONTRACT_ADDRESS) {
      alert("Score contract address not configured.");
      return;
    }
    writeContract({
      address: SCORE_CONTRACT_ADDRESS,
      abi: scoreAbi,
      functionName: "updateScore",
      args: [BigInt(breakdown.score)]
    });
  };

  return (
    <section className="card p-6 md:p-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="text-xs uppercase tracking-wide text-baseMuted mb-1">
          Onchain score
        </div>
        <div className="flex items-end gap-3">
          <div className="text-4xl md:text-5xl font-semibold">{breakdown.score}</div>
          <div className="text-xs text-baseMuted mb-1">
            out of 1000
          </div>
        </div>
        <div className="mt-3 text-sm text-baseMuted">
          {shortAddress(profile.address)} · {profile.tokens.length} tokens ·{" "}
          {profile.nfts.length} NFTs · {profile.lpPositions.length} LP positions
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
        <Breakdown label="Tokens" value={breakdown.tokensPoints} />
        <Breakdown label="NFTs" value={breakdown.nftsPoints} />
        <Breakdown label="LP" value={breakdown.lpPoints} />
        <Breakdown label="Staking" value={breakdown.stakingPoints} />
        <Breakdown label="Tx Activity" value={breakdown.txPoints} />
        <Breakdown label="Volume" value={breakdown.volumePoints} />
        <Breakdown label="Mints" value={breakdown.mintPoints} />
        <Breakdown label="Contracts" value={breakdown.contractPoints} />
        <button
          onClick={handlePublish}
          disabled={isPending}
          className="col-span-2 mt-2 inline-flex justify-center rounded-2xl bg-baseBlue text-white py-2.5 text-sm font-medium shadow-card disabled:opacity-60"
        >
          {isPending ? "Publishing..." : "Publish score onchain"}
        </button>
      </div>
    </section>
  );
}

function Breakdown({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-baseSoftBlue/40 px-3 py-2">
      <div className="text-[11px] uppercase tracking-wide text-baseMuted">
        {label}
      </div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}
