import { LpPosition } from "@/lib/types";

export function LpTable({ positions }: { positions: LpPosition[] }) {
  if (!positions.length) return null;

  return (
    <section className="card p-5">
      <h2 className="text-sm font-semibold mb-3">Liquidity positions</h2>
      <div className="space-y-2 max-h-72 overflow-auto text-xs">
        {positions.map((lp) => (
          <div key={lp.poolAddress} className="flex justify-between">
            <div>
              <div className="font-medium">{lp.poolName}</div>
              <div className="text-baseMuted text-[11px]">
                {lp.token0} / {lp.token1}
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">${lp.usdValue.toFixed(2)}</div>
              {lp.sharePercent && (
                <div className="text-[11px] text-baseMuted">
                  {lp.sharePercent.toFixed(3)}% of pool
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

