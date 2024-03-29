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
        success: '#28a745',
        danger: '#dc3545',
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
      dropShadow: {
        yellow: [
          '0px 0px 0px rgba(255, 213, 104, 0.24)',
          '0px 1px 3px rgba(255, 213, 104, 0.24)',
          '0px 5px 5px rgba(255, 213, 104, 0.20)',
          '0px 1px 7px rgba(255, 213, 104, 0.12)',
          '0px 20px 8px rgba(255, 213, 104, 0.04)',
          '0px 31px 9px rgba(255, 213, 104, 0.00)',
        ],
        green: [
          '0px 0px 0px rgba(40, 167, 69, 0.24)',
          '0px 1px 3px rgba(40, 167, 69, 0.24)',
          '0px 5px 5px rgba(40, 167, 69, 0.20)',
          '0px 1px 7px rgba(40, 167, 69, 0.12)',
          '0px 20px 8px rgba(40, 167, 69, 0.04)',
          '0px 31px 9px rgba(40, 167, 69, 0.00)',
        ],
        red: [
          '0px 0px 0px rgba(220, 53, 69, 0.24)',
          '0px 1px 3px rgba(220, 53, 69, 0.24)',
          '0px 5px 5px rgba(220, 53, 69, 0.20)',
          '0px 1px 7px rgba(220, 53, 69, 0.12)',
          '0px 20px 8px rgba(220, 53, 69, 0.04)',
          '0px 31px 9px rgba(220, 53, 69, 0.00)',
        ],
        'dark-gray': [
          '0px 0px 0px rgba(25, 32, 45, 0.24)',
          '0px 1px 3px rgba(25, 32, 45, 0.24)',
          '0px 5px 5px rgba(25, 32, 45, 0.20)',
          '0px 1px 7px rgba(25, 32, 45, 0.12)',
          '0px 20px 8px rgba(25, 32, 45, 0.04)',
          '0px 31px 9px rgba(25, 32, 45, 0.00)',
        ],
      },
    },
  },
  plugins: [],
}

export default config
