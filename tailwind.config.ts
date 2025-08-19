/** @type {import('tailwindcss').Config} */
import { withTV } from "tailwind-variants/transformer";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssReactAriaComponents from "tailwindcss-react-aria-components";

const config = withTV({
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light: "hsl(var(--light))",
        dark: "hsl(var(--dark))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        toggle: "hsl(var(--toggle))",
        bg: "hsl(var(--bg))",
        fg: "hsl(var(--fg))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          fg: "hsl(var(--primary-fg))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          fg: "hsl(var(--secondary-fg))",
        },
        tertiary: {
          DEFAULT: "hsl(var(--tertiary))",
          fg: "hsl(var(--tertiary-fg))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          fg: "hsl(var(--accent-fg))",
          subtle: "hsl(var(--accent-subtle))",
          "subtle-fg": "hsl(var(--accent-subtle-fg))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          fg: "hsl(var(--success-fg))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          fg: "hsl(var(--info-fg))",
        },
        danger: {
          DEFAULT: "hsl(var(--danger))",
          fg: "hsl(var(--danger-fg))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          fg: "hsl(var(--warning-fg))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          fg: "hsl(var(--muted-fg))",
        },
        overlay: {
          DEFAULT: "hsl(var(--overlay))",
          fg: "hsl(var(--overlay-fg))",
        },
        neutralGray: {
          50: "#f5f5f5",
          100: "#e1e1e1",
          200: "#d2d2d2",
          300: "#bebebe",
          400: "#b1b1b1",
          500: "#9e9e9e",
          600: "#909090",
          700: "#707070",
          800: "#575757",
          900: "#424242",
        },
        gold: {
          50: "#fbf7eb",
          100: "#f2e6c1",
          200: "#ebdaa3",
          300: "#d06276",
          400: "#ddbf5f",
          500: "#d4af37",
          600: "#c19f32",
          700: "#977c27",
          800: "#75601e",
          900: "#594a17",
        },
        blue: "hsl(var(--blue))",
        purple: "#6442c1",
        bgBlack: "hsl(var(--bg-black))",
        lightGreen: "#BFD5CD",
        lightBlack: "hsl(var(--light-black))",
        grayNeutralFg: "hsl(var(--gray-neutral-fg))",
        gray: "#252525",
        black: "#252525",
        lightgray: "#F5F5F5",
        lightgrayBorders: "#E1E1E1",
        "custom-red": "#A70000",
      },

      fontFamily: {
        inter: ["Inter", "sans-serif"],
        interBold: ["Inter-Bold", "sans-serif"],
        interSemiBold: ["Inter-semiBold", "sans-serif"],
        lora: ["Lora-Regular", "sans-serif"],
        loraBold: ["Lora-Bold", "sans-serif"],
        kaisei: ["KaiseiHarunoUmi-Regular", "sans-serif"],
        kaiseiBold: ["KaiseiHarunoUmi-Bold", "sans-serif"],
        playFairExtraBold: ["PlayFairDisplay-ExtraBold", "sans-serif"],
        arial: ["Arial-Regular", "sans-serif"],
        arialBold: ["Arial-Bold", "sans-serif"],
        kaiseiHarunoUmi: ['"KaiseiHarunoUmi-Bold"', "sans-serif"],
        cinzel: ["CinzelDecorative-Bold", "sans-serif"],
      },
      fontSize: {
        xxxs: "0.512rem",
        xxs: "0.625rem",
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem",
        "7xl": "4.5rem",
        "8xl": "6rem",
        "9xl": "8rem",
        large: "1.625rem",
        large1: "2rem",
      },
      screens: {
        xsm: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        recommend: "1440px",
        large: "1700px",
      },

      borderRadius: {
        "3xl": "calc(var(--radius) + 7.5px)",
        "2xl": "calc(var(--radius) + 5px)",
        xl: "calc(var(--radius) + 2.5px)",
        lg: "calc(var(--radius))",
        md: "calc(var(--radius) - 2.5px)",
        sm: "calc(var(--radius) - 5px)",
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    tailwindcssReactAriaComponents,
    require("tailwind-scrollbar-hide"),
  ],
});

export default config;
function hsla(arg0: number, arg1: number, arg2: number, arg3: number): any {
  throw new Error("Function not implemented.");
}
