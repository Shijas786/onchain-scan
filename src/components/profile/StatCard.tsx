import { LucideIcon } from "lucide-react";

interface StatCardProps {
    label: string;
    value: string | number;
    icon: LucideIcon;
    subtext?: string;
}

export function StatCard({ label, value, icon: Icon, subtext }: StatCardProps) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-soft-blue rounded-lg text-base-blue">
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            <div>
                <p className="text-sm text-muted-text font-medium mb-1">{label}</p>
                <h4 className="text-2xl font-bold text-dark-text">{value}</h4>
                {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
            </div>
        </div>
    );
}
