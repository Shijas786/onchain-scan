import { NftHolding } from "@/lib/types";

export function NftGrid({ nfts }: { nfts: NftHolding[] }) {
  if (!nfts.length) return null;

  return (
    <section className="card p-5">
      <h2 className="text-sm font-semibold mb-3">NFTs</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {nfts.slice(0, 12).map((n) => (
          <div key={`${n.contractAddress}-${n.tokenId}`} className="text-xs">
            <div className="aspect-square rounded-2xl bg-baseSoftBlue/50 mb-1 overflow-hidden">
              {n.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={n.image}
                  alt={n.name ?? "NFT"}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            <div className="font-medium truncate">{n.name ?? "NFT"}</div>
            <div className="text-[11px] text-baseMuted truncate">
              {n.collectionName}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
