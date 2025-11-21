"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScanInput() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleScan = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input) return;

        setLoading(true);
        try {
            let address = input;
            if (input.endsWith(".eth")) {
                const res = await fetch(`/api/ens?name=${input}`);
                const data = await res.json();
                if (data.address) {
                    address = data.address;
                } else {
                    alert("ENS not found");
                    setLoading(false);
                    return;
                }
            }

            router.push(`/profile?address=${address}`);
        } catch (error) {
            console.error("Scan error", error);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleScan} className="max-w-xl mx-auto px-4 relative">
            <div className="relative group">
                <div className="absolute inset-0 bg-base-blue/20 rounded-2xl blur-xl group-hover:bg-base-blue/30 transition-all" />
                <div className="relative bg-white rounded-2xl shadow-xl p-2 flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter ENS or Wallet Address..."
                        className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-lg text-dark-text placeholder:text-gray-400"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-base-blue text-white p-3 rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50"
                    >
                        {loading ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            <Search className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
}
