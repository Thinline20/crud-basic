/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,js,jsx,ts,tsx}"],
  darkMode: ["class"],
  plugins: [
    require("@tailwindcss/typography"),
    require("@kobalte/tailwindcss"),
  ],
  presets: [require("./ui.preset.js")],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.foreground"),
            "--tw-prose-bold": theme("colors.foreground"),
            "--tw-prose-bullets": theme("colors.foreground"),
            // "--tw-prose-captions": theme("colors.pink[700]"),
            "--tw-prose-code": theme("colors.foreground"),
            "--tw-prose-counters": theme("colors.foreground"),
            "--tw-prose-headings": theme("colors.foreground"),
            "--tw-prose-hr": theme("colors.muted.foreground"),
            // "--tw-prose-invert-body": theme("colors.pink[200]"),
            // "--tw-prose-invert-bold": theme("colors.white"),
            // "--tw-prose-invert-bullets": theme("colors.pink[600]"),
            // "--tw-prose-invert-captions": theme("colors.pink[400]"),
            // "--tw-prose-invert-code": theme("colors.white"),
            // "--tw-prose-invert-counters": theme("colors.pink[400]"),
            // "--tw-prose-invert-headings": theme("colors.white"),
            // "--tw-prose-invert-hr": theme("colors.pink[700]"),
            // "--tw-prose-invert-lead": theme("colors.pink[300]"),
            // "--tw-prose-invert-links": theme("colors.white"),
            // "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
            // "--tw-prose-invert-pre-code": theme("colors.pink[300]"),
            // "--tw-prose-invert-quote-borders": theme("colors.pink[700]"),
            // "--tw-prose-invert-quotes": theme("colors.pink[100]"),
            // "--tw-prose-invert-td-borders": theme("colors.pink[700]"),
            // "--tw-prose-invert-th-borders": theme("colors.pink[600]"),
            // "--tw-prose-lead": theme("colors.pink[700]"),
            // "--tw-prose-links": theme("colors.pink[900]"),
            // "--tw-prose-pre-bg": theme("colors.pink[900]"),
            // "--tw-prose-pre-code": theme("colors.pink[100]"),
            "--tw-prose-quote-borders": theme("colors.accent.DEFAULT"),
            "--tw-prose-quotes": theme("colors.foreground"),
            // "--tw-prose-td-borders": theme("colors.pink[200]"),
            // "--tw-prose-th-borders": theme("colors.pink[300]"),
            li: {
              margin: "0",
              p: {
                margin: 0,
              },
            },
          },
        },
      }),
    },
  },
};
