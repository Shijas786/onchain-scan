import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/lib/**/*.{js,ts,jsx,tsx,mdx}", // Added lib
    ],
    theme: {
        extend: {
            colors: {
                "base-blue": "#0052FF",
                "soft-blue": "#E7EEFF",
                "dark-text": "#0A0A0A",
                "muted-text": "#6F7C8A",
            },
            backgroundImage: {
                "hero-gradient": "linear-gradient(135deg, #0052FF, #4A8BFF)",
            },
        },
    },
    plugins: [],
};
export default config;
