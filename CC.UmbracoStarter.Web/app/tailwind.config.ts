module.exports = {
  safelist: ['pt-nav', 'py-s', 'py-m', 'py-l'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      spacing: {
        s: '16px',
        m: '32px',
        l: '64px',
        nav: '64px'
      },
      textColor: {
        foreground: 'var(--foreground)'
      }
    }
  },
  plugins: []
}
