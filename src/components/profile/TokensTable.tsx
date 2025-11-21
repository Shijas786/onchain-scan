import { TokenBalance } from "@/lib/covalent";

interface TokensTableProps {
    tokens: TokenBalance[];
}

export function TokensTable({ tokens }: TokensTableProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-dark-text">Top Tokens</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-text uppercase tracking-wider">
                                Asset
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-muted-text uppercase tracking-wider">
                                Balance
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-muted-text uppercase tracking-wider">
                                Value
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {tokens.slice(0, 10).map((token, i) => (
                            <tr key={i} className="hover:bg-soft-blue/20 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {token.logo_url ? (
                                            <img
                                                src={token.logo_url}
                                                alt={token.contract_ticker_symbol}
                                                className="w-8 h-8 rounded-full mr-3"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src =
                                                        "https://via.placeholder.com/32";
                                                }}
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center text-xs font-bold text-gray-500">
                                                {token.contract_ticker_symbol?.[0]}
                                            </div>
                                        )}
                                        <div>
                                            <div className="text-sm font-medium text-dark-text">
                                                {token.contract_name}
                                            </div>
                                            <div className="text-xs text-muted-text">
                                                {token.contract_ticker_symbol}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-dark-text">
                                    {(
                                        Number(token.balance) /
                                        Math.pow(10, token.contract_decimals)
                                    ).toLocaleString(undefined, { maximumFractionDigits: 4 })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-dark-text">
                                    ${token.pretty_quote}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
