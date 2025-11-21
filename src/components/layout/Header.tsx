"use client";

import { appKit } from "@/lib/appkit";
import { useEffect, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

type FcUser = {
  fid: number;
  username?: string;
  displayName?: string;
};

export function Header() {
  const [fcUser, setFcUser] = useState<FcUser | null>(null);

  const handleFarcasterSignIn = async () => {
    try {
      const nonce = Math.random().toString(36).slice(2, 10);
      const result: any = await sdk.actions.signIn({
        nonce,
        acceptAuthAddress: true
      });
      setFcUser({
        fid: result.fid,
        username: result.username,
        displayName: result.displayName
      });
    } catch (e) {
      console.error("Farcaster sign-in failed", e);
    }
  };

  const openWalletModal = () => {
    appKit.open();
  };

  useEffect(() => {
    sdk.actions
      .ready()
      .catch((err: unknown) =>
        console.error("Failed to initialize Farcaster Mini App", err)
      );
  }, []);

  return (
    <header className="border-b border-baseSoftBlue/60 bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-hero-gradient" />
          <div>
            <div className="font-semibold text-base">Onchain Profile Tracker</div>
            <div className="text-xs text-baseMuted">Base · Farcaster Miniapp</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {fcUser && (
            <div className="hidden sm:flex flex-col text-right text-xs text-baseMuted">
              <span>Signed in as</span>
              <span className="font-medium text-baseText">
                {fcUser.username ?? `fid:${fcUser.fid}`}
              </span>
            </div>
          )}
          <button
            onClick={handleFarcasterSignIn}
            className="hidden sm:inline-flex px-3 py-1.5 text-xs rounded-xl border border-baseSoftBlue hover:bg-baseSoftBlue/40 transition"
          >
            {fcUser ? "Farcaster Connected" : "Sign in with Farcaster"}
          </button>
          <button
            onClick={openWalletModal}
            className="inline-flex px-4 py-2 rounded-2xl bg-baseBlue text-white text-sm font-medium shadow-card hover:opacity-90 transition"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  );
}
