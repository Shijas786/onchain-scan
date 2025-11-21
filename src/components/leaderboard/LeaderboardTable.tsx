type Row = {
  rank: number;
  address: string;
  ens: string | null;
  score: number;
  tokens: number;
  lpPositions: number;
  lastActive: string;
};

export function LeaderboardTable({ entries }: { entries: Row[] }) {
  if (!entries.length) return <p className="text-baseMuted text-sm">No scores yet.</p>;

  return (
    <section className="card p-5">
      <table className="w-full text-xs md:text-sm">
        <thead>
          <tr className="text-baseMuted text-[11px] uppercase">
            <th className="text-left py-2">Rank</th>
            <th className="text-left py-2">Address / ENS</th>
            <th className="text-right py-2">Score</th>
            <th className="text-right py-2">Tokens</th>
            <th className="text-right py-2">LP</th>
            <th className="text-right py-2">Last active</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e.rank} className="border-t border-baseSoftBlue/60">
              <td className="py-2">{e.rank}</td>
              <td className="py-2">
                <div className="flex flex-col">
                  <span className="font-medium">
                    {e.ens ?? e.address}
                  </span>
                  {e.ens && (
                    <span className="text-[11px] text-baseMuted">
                      {e.address}
                    </span>
                  )}
                </div>
              </td>
              <td className="py-2 text-right font-semibold">{e.score}</td>
              <td className="py-2 text-right">{e.tokens}</td>
              <td className="py-2 text-right">{e.lpPositions}</td>
              <td className="py-2 text-right text-baseMuted text-[11px]">
                {e.lastActive}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
