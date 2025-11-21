import Link from "next/link";
import { Trophy } from "lucide-react";

interface LeaderboardEntry {
    rank: number;
    address: string;
    ens?: string;
    score: number;
    tokens: number;
    lps: number;
    lastActive: string;
}

interface LeaderboardTableProps {
    entries: LeaderboardEntry[];
}

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium text-muted-text uppercase tracking-wider">
                                Rank
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-medium text-muted-text uppercase tracking-wider">
                                User
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-medium text-muted-text uppercase tracking-wider">
                                Score
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-medium text-muted-text uppercase tracking-wider hidden md:table-cell">
                                Tokens
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-medium text-muted-text uppercase tracking-wider hidden md:table-cell">
                                LPs
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-medium text-muted-text uppercase tracking-wider hidden md:table-cell">
                                Last Active
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {entries.map((entry) => (
                            <tr
                                key={entry.address}
                                className="hover:bg-soft-blue/20 transition-colors cursor-pointer group"
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {entry.rank <= 3 ? (
                                            <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-white font-bold
                        ${entry.rank === 1 ? 'bg-yellow-400' : entry.rank === 2 ? 'bg-gray-400' : 'bg-orange-400'}
                      `}>
                                                {entry.rank}
                                            </div>
                                        ) : (
                                            <span className="text-muted-text font-medium ml-2">{entry.rank}</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link href={`/profile?address=${entry.address}`} className="flex items-center group-hover:text-base-blue">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-base-blue to-purple-500 mr-3" />
                                        <div>
                                            <div className="text-sm font-medium text-dark-text group-hover:text-base-blue transition-colors">
                                                {entry.ens || `${entry.address.slice(0, 6)}...${entry.address.slice(-4)}`}
                                            </div>
                                        </div>
                                    </Link>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="text-lg font-bold text-base-blue">{entry.score}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-muted-text hidden md:table-cell">
                                    {entry.tokens}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-muted-text hidden md:table-cell">
                                    {entry.lps}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-muted-text hidden md:table-cell">
                                    {entry.lastActive}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
