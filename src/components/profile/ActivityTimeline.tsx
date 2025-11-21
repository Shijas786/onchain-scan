import { ActivityItem } from "@/lib/types";

export function ActivityTimeline({ items }: { items: ActivityItem[] }) {
  if (!items.length) return null;

  return (
    <section className="card p-5">
      <h2 className="text-sm font-semibold mb-3">Recent activity</h2>
      <ul className="space-y-2 max-h-80 overflow-auto text-xs">
        {items.slice(0, 30).map((a) => (
          <li key={a.hash} className="flex justify-between">
            <div>
              <div className="font-medium">{a.description}</div>
              <div className="text-[11px] text-baseMuted">
                {new Date(a.timestamp).toLocaleString()}
              </div>
            </div>
            <div className="text-right text-[11px] text-baseMuted">
              {a.valueUsd ? `$${a.valueUsd.toFixed(2)}` : ""}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

