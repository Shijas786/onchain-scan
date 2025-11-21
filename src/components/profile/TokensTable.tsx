import { TokenBalance } from "@/lib/types";

export function TokensTable({ tokens }: { tokens: TokenBalance[] }) {
  if (!tokens.length) return null;

  return (
    <section className="card p-5">
      <h2 className="text-sm font-semibold mb-3">Tokens</h2>
      <div className="space-y-2 max-h-72 overflow-auto">
        {tokens.map((t) => (
          <div
            key={t.contractAddress + t.symbol}
            className="flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-baseSoftBlue" />
              <div>
                <div className="font-medium">{t.symbol}</div>
                <div className="text-baseMuted text-[11px]">{t.name}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">
                {Number(t.balance) / 10 ** t.decimals}
              </div>
              <div className="text-[11px] text-baseMuted">
                {t.fiatValue ? `$${t.fiatValue.toFixed(2)}` : "-"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
