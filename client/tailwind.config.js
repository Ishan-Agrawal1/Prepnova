/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "oklch(0.488 0.243 264.376)",
        input: "oklch(0.488 0.243 264.376)",
        ring: "#415a77",
        background: '#0d1b2a',
        foreground: '#e0e1dd',
        primary: {
          DEFAULT: '#778da9',
          foreground: '#0d1b2a',
        },
        secondary: {
          DEFAULT: '#415a77',
          foreground: '#e0e1dd',
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: '#1b2a3a',
          foreground: '#778da9',
        },
        accent: {
          DEFAULT: '#1b2a3a',
          foreground: '#e0e1dd',
        },
        popover: {
          DEFAULT: '#1b2a3a',
          foreground: '#e0e1dd',
        },
        card: {
          DEFAULT: '#1b2a3a',
          foreground: '#e0e1dd',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}