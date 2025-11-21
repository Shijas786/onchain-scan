"use client";

import Link from "next/link";
import { useAppKit } from "@reown/appkit/react";
import { useEffect, useState } from "react";
import sdk from "@farcaster/frame-sdk";
import { Button } from "@/components/ui/button"; // We'll create a generic button later or use standard HTML for now
import { cn } from "@/lib/utils";

export function Header() {
    const { open } = useAppKit();
    const [farcasterUser, setFarcasterUser] = useState<any>(null);

    useEffect(() => {
        const init = async () => {
            try {
                const context = await sdk.context;
                if (context?.user) {
                    setFarcasterUser(context.user);
                }
            } catch (e) {
                console.error("Farcaster SDK init error", e);
            }
        };
        init();
    }, []);

    const signIn = async () => {
        try {
            const result = await sdk.actions.signIn({ nonce: "test-nonce" });
            setFarcasterUser(result.user);
        } catch (e) {
            console.error("Sign in failed", e);
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-base-blue rounded-lg flex items-center justify-center text-white font-bold">
                        B
                    </div>
                    <span className="font-bold text-xl text-dark-text">OnchainScan</span>
                </Link>

                <div className="flex items-center gap-4">
                    {farcasterUser ? (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-soft-blue rounded-full">
                            {farcasterUser.pfpUrl && (
                                <img
                                    src={farcasterUser.pfpUrl}
                                    alt={farcasterUser.username}
                                    className="w-6 h-6 rounded-full"
                                />
                            )}
                            <span className="text-sm font-medium text-base-blue">
                                @{farcasterUser.username}
                            </span>
                        </div>
                    ) : (
                        <button
                            onClick={signIn}
                            className="text-sm font-medium text-muted-text hover:text-base-blue transition-colors"
                        >
                            Farcaster Sign In
                        </button>
                    )}

                    <button
                        onClick={() => open()}
                        className="px-4 py-2 bg-base-blue text-white rounded-full font-medium hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
                    >
                        Connect Wallet
                    </button>
                </div>
            </div>
        </header>
    );
}
