"use client";

import { motion } from "framer-motion";

export function HeroSection() {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            <div className="absolute inset-0 bg-hero-gradient opacity-5" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-bold text-dark-text mb-6 tracking-tight"
                >
                    Your Onchain <br />
                    <span className="text-base-blue">Reputation Score</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-muted-text max-w-2xl mx-auto mb-10"
                >
                    Analyze your Base wallet activity, calculate your score, and prove your
                    onchain mastery.
                </motion.p>
            </div>
        </section>
    );
}
