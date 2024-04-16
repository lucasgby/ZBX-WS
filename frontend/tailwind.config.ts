import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "bg-login": "url('/background.jpg')"
      },

      screens: {
        sm: '640px',
        md: '768px',
        lg: '960px',
        xl: '1200px',
        '2xl': '1536px'
      },

      colors: {
        'bg': 'rgb(255, 255, 255)',
        'on_bg_tree': '#EEE',
        'on_bg': 'rgb(190, 190, 190)',
        'bg-secundary': 'rgb(12, 12, 12)',
        border: 'rgb(90, 90, 90)',
        'color-primary-gradient': 'rgba(51, 134, 142, 1)',
        'color-secundary-gradient': 'rgba(0, 166, 182, 1)',
        'primary_text': 'rgb(20, 184, 166)',
        'error': '#FF0000'
      }, 

      fontWeight: {
        contrast: '600'
      },

      fontSize: {

      }
    },
  },
  darkMode: "class",
  plugins: [require("tailwind-scrollbar")({ nocompatible: true }), nextui()],
};
export default config;
