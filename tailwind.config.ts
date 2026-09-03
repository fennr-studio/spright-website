import type { Config } from "tailwindcss";

/**
 * Spright design system — rebuilt against the Copora reference.
 *
 * The numbers here are measured from the reference's computed styles, not
 * estimated: a 1500px container on a 30px gutter, 110px of section padding,
 * a 1.3 line-height across the whole display scale, and headings set at
 * weight 500 with NORMAL letter-spacing.
 *
 * That last point is the single biggest departure from the previous Spright
 * system, which ran display type at weight 600-700 with -0.045em tracking and
 * a 0.94 line-height. The two are opposite philosophies: the old one shouts,
 * the reference is calm and lets whitespace carry the emphasis. Tightening
 * the tracking or shrinking the leading here undoes the redesign.
 *
 * Colour keeps Spright's cobalt rather than adopting the reference's green —
 * the accent is brand identity, so we borrow how it is *used* (sparingly, on
 * interaction and small marks) rather than the hue itself.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: "class",
  corePlugins: { container: false },
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#121512",
          900: "#0C0E0C",
          800: "#121512",
          700: "#1F231F",
          600: "#333833",
          500: "#5A5A5A",
          400: "#767A76",
          300: "#9CA09C",
          200: "#C7CAC7",
        },
        paper: {
          DEFAULT: "#FFFFFF",
          raised: "#FFFFFF",
        },
        mist: {
          DEFAULT: "#F5F5F5",
          deep: "#EDEDED",
          line: "#E4E4E4",
        },
        cobalt: {
          DEFAULT: "#1E3FCC",
          dark: "#1732A6",
          soft: "#5C7BF0",
          bright: "#8AA3FF",
          wash: "#EDF0FE",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Reference: h1 56/72.8, h2 48/62.4, h3 36/46.8 — a flat 1.3 ratio,
        // letter-spacing normal throughout.
        "display-xl": ["clamp(2.5rem, 4.6vw, 3.5rem)", { lineHeight: "1.3", letterSpacing: "normal" }],
        "display-lg": ["clamp(2rem, 3.7vw, 3rem)", { lineHeight: "1.3", letterSpacing: "normal" }],
        "display-md": ["clamp(1.625rem, 2.7vw, 2.25rem)", { lineHeight: "1.3", letterSpacing: "normal" }],
        "display-sm": ["clamp(1.25rem, 1.7vw, 1.5rem)", { lineHeight: "1.35" }],
        lede: ["clamp(1.0625rem, 1.2vw, 1.125rem)", { lineHeight: "1.6" }],
        body: ["1rem", { lineHeight: "1.5" }],
        meta: ["0.875rem", { lineHeight: "1.45" }],
        eyebrow: ["0.8125rem", { lineHeight: "1.3", letterSpacing: "0.02em" }],
      },
      spacing: {
        // Reference runs a flat 110px. Scaled down on small screens only.
        section: "clamp(4.5rem, 7.6vw, 6.875rem)",
        "section-sm": "clamp(3.5rem, 5vw, 4.5rem)",
      },
      borderRadius: {
        card: "8px",
        thumb: "4px",
        pill: "999px",
      },
      maxWidth: {
        shell: "1500px",
        measure: "62ch",
        "measure-sm": "46ch",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "marker-pulse": {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "70%": { transform: "scale(2.6)", opacity: "0" },
          "100%": { transform: "scale(2.6)", opacity: "0" },
        },
      },
      animation: {
        "marker-pulse": "marker-pulse 2.8s cubic-bezier(0.22, 1, 0.36, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
