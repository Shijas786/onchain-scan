"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ScanInput() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) return;
    setLoading(true);
    router.push(`/profile?address=${encodeURIComponent(value)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:flex-row">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value.trim())}
        placeholder="vitalik.eth or 0x1234..."
        className="flex-1 rounded-2xl border border-baseSoftBlue px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-baseBlue/60"
      />
      <button
        type="submit"
        disabled={loading || !value}
        className="inline-flex items-center justify-center rounded-2xl bg-baseBlue text-white text-sm font-medium px-5 py-2.5 shadow-card disabled:opacity-60"
      >
        {loading ? "Scanning..." : "Scan wallet"}
      </button>
    </form>
  );
}
