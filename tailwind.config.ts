import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#042330',
        'primary-orange': '#F89200',
        'primary-yellow': '#FFD234',
      },
    },
  },
  plugins: [],
}

export default config
