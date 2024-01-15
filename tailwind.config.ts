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
          500: '#737A86',
          700: '#333E4F',
          800: '#19202D',
        },
        alert: '#FFAE00',
        primary: '#FFB800',
      },
      fontSize: {
        sm: [
          '0.875rem',
          {
            lineHeight: '1.3125rem',
            fontWeight: '500',
          },
        ],
        '2xl': [
          '1.5rem',
          {
            lineHeight: '1.875rem',
            fontWeight: '600',
          },
        ],
      },
    },
  },
  plugins: [],
}

export default config
