import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Background */
        'grid-bg': 'var(--color-grid-bg)',
        'card-surface': 'var(--color-card-surface)',
        'surface-popup': 'var(--color-surface-popup)',
        'surface-action-button': 'var(--color-surface-action-button)',

        /* Text */
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',

        /* Accent */
        'accent-primary': 'var(--color-accent-primary)',
        'accent-secondary': 'var(--color-accent-secondary)',
        'accent-primary-15': 'var(--color-accent-primary-15)',
        'accent-secondary-15': 'var(--color-accent-secondary-15)',

        /* Tooltip */
        'tooltip-bg': 'var(--color-tooltip-bg)',
        'tooltip-text': 'var(--color-tooltip-text)',

        /* Swatch */
        'swatch-teal-base': 'var(--color-swatch-teal-base)',
        'swatch-teal-accent': 'var(--color-swatch-teal-accent)',
        'swatch-midnight-base': 'var(--color-swatch-midnight-base)',
        'swatch-midnight-accent': 'var(--color-swatch-midnight-accent)',
      },
    },
  },
  plugins: [],
}
export default config
