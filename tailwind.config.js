/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0b0f17",
        foreground: "#f8fafc",
        border: "rgba(255, 255, 255, 0.08)",
        card: {
          DEFAULT: "rgba(15, 23, 42, 0.65)",
          foreground: "#f8fafc",
        },
        slate: {
          850: "#131b2e",
          900: "#0f172a",
          950: "#0b0f17",
        },
        emerald: {
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          900: "#064e3b",
          950: "#022c22",
        },
        teal: {
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          900: "#134e4a",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      animation: {
        "aurora": "aurora 25s ease-in-out infinite alternate",
        "aurora-slow": "aurora 35s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        aurora: {
          "0%": {
            transform: "translate3d(0, 0, 0) scale(1)",
            opacity: "0.45",
          },
          "50%": {
            transform: "translate3d(8%, 12%, 0) scale(1.15)",
            opacity: "0.65",
          },
          "100%": {
            transform: "translate3d(-6%, -8%, 0) scale(0.95)",
            opacity: "0.5",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "0.6",
            filter: "drop-shadow(0 0 15px rgba(16, 185, 129, 0.4))",
          },
          "50%": {
            opacity: "1",
            filter: "drop-shadow(0 0 30px rgba(16, 185, 129, 0.8))",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        }
      },
      borderRadius: {
        "card": "20px",
        "pill": "9999px",
      },
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  plugins: [],
}
