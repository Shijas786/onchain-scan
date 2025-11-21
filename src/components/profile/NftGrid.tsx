import { NftBalance } from "@/lib/covalent";

interface NftGridProps {
    nfts: NftBalance[];
}

export function NftGrid({ nfts }: NftGridProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {nfts.slice(0, 8).map((nft, i) => (
                <div
                    key={i}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group"
                >
                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                        {nft.external_data?.image ? (
                            <img
                                src={nft.external_data.image}
                                alt={nft.external_data.name || "NFT"}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                        "https://via.placeholder.com/300?text=No+Image";
                                }}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                No Image
                            </div>
                        )}
                    </div>
                    <div className="p-3">
                        <h4 className="text-sm font-medium text-dark-text truncate">
                            {nft.external_data?.name || `#${nft.token_id}`}
                        </h4>
                        <p className="text-xs text-muted-text truncate">
                            {nft.contract_name}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
