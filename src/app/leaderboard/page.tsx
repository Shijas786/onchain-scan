import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";

const mock = [
  {
    rank: 1,
    address: "0x1234...abcd",
    ens: "whale.eth",
    score: 780,
    tokens: 18,
    lpPositions: 4,
    lastActive: "2h ago"
  },
  {
    rank: 2,
    address: "0xabcd...9999",
    ens: null,
    score: 650,
    tokens: 12,
    lpPositions: 2,
    lastActive: "5h ago"
  }
];

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <section className="card p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Onchain Leaderboard</h1>
        <p className="text-baseMuted">
          High-activity Base wallets ranked by their onchain score. Later you can wire this to an indexer.
        </p>
      </section>
      <LeaderboardTable entries={mock} />
    </div>
  );
}
