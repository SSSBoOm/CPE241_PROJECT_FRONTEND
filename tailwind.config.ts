import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'primary-blue-700': '#042330',
        'primary-blue-600': '#0E4459',
        'primary-blue-500': '#1A6886',
        'primary-b2': '#FDF4E8',
        'primary-orange': '#F89200',
        'primary-yellow': '#FFD234'
      }
    }
  },
  plugins: []
}

export default config
