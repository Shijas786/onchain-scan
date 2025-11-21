import { OnchainProfile, ScoreBreakdown } from "./types";

export function calculateScore(profile: OnchainProfile): ScoreBreakdown {
  const tokenCount = Math.min(profile.tokens.length, 20);
  const nftCollections = new Set(profile.nfts.map((n) => n.contractAddress)).size;
  const nftCollectionsCapped = Math.min(nftCollections, 10);
  const lpCount = profile.lpPositions.length;
  const txBuckets = Math.floor(profile.totalTxCount / 10);
  const volumeBuckets = Math.floor(profile.volumeUsd / 500);
  const mintCount = profile.mintCount;
  const stakingCount = profile.stakingTxCount;
  const uniqueContracts = profile.uniqueContracts;

  const tokensPoints = tokenCount;
  const nftsPoints = nftCollectionsCapped;
  const lpPoints = lpCount * 10;
  const stakingPoints = stakingCount * 5;
  const txPoints = txBuckets;
  const volumePoints = volumeBuckets;
  const mintPoints = mintCount * 2;
  const contractPoints = uniqueContracts;

  const raw =
    tokensPoints +
    nftsPoints +
    lpPoints +
    stakingPoints +
    txPoints +
    volumePoints +
    mintPoints +
    contractPoints;

  const normalized = Math.min(raw, 1000);

  return {
    score: normalized,
    tokensPoints,
    nftsPoints,
    lpPoints,
    stakingPoints,
    txPoints,
    volumePoints,
    mintPoints,
    contractPoints
  };
}
