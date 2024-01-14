import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#F2F4F8',
          400: '#ACB1BA',
          700: '#333E4F',
          800: '#19202D',
        },
        alert: '#FFAE00',
        primary: '#FFB800',
      },
    },
  },
  plugins: [],
}

export default config
