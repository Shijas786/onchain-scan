"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getOnchainProfile } from "@/lib/covalent";
import { calculateScore } from "@/lib/scoring";
import { resolveEns } from "@/lib/ens";
import { ScoreCard } from "@/components/profile/ScoreCard";
import { TokensTable } from "@/components/profile/TokensTable";
import { LpTable } from "@/components/profile/LpTable";
import { NftGrid } from "@/components/profile/NftGrid";
import { ActivityTimeline } from "@/components/profile/ActivityTimeline";
import { ProfileSkeleton } from "@/components/ui/skeletons";

function ProfileContent() {
  const params = useSearchParams();
  const input = params.get("address") ?? "";

  const { data, isLoading, error } = useQuery({
    queryKey: ["profile", input],
    queryFn: async () => {
      const addr = await resolveEns(input);
      const profile = await getOnchainProfile(addr);
      const breakdown = calculateScore(profile);
      return { profile, breakdown };
    },
    enabled: !!input,
    staleTime: 30_000
  });

  if (!input) {
    return <p className="text-baseMuted">No address provided.</p>;
  }

  if (isLoading) return <ProfileSkeleton />;

  if (error || !data) {
    return (
      <p className="text-red-500">
        Failed to load profile. Check address and try again.
      </p>
    );
  }

  const { profile, breakdown } = data;

  return (
    <div className="space-y-6">
      <ScoreCard profile={profile} breakdown={breakdown} />
      <div className="grid md:grid-cols-2 gap-6">
        <TokensTable tokens={profile.tokens} />
        <LpTable positions={profile.lpPositions} />
      </div>
      <NftGrid nfts={profile.nfts} />
      <ActivityTimeline items={profile.activities} />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileContent />
    </Suspense>
  );
}
