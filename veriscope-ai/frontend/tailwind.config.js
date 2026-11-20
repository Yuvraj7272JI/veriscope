/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#08090D',
          secondary: '#10121A',
          card: '#131622',
          hover: '#191D2C',
        },
        brand: {
          blue: '#4385FF',
          purple: '#9065FF',
          cyan: '#48D8E8',
        },
        text: {
          primary: '#F5F6FA',
          secondary: '#9298A8',
          muted: '#5F667A',
        },
        verdict: {
          real: '#10B981',
          fake: '#F43F5E',
          unverified: '#F59E0B',
          neutral: '#6366F1'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 0%, rgba(67, 133, 255, 0.15) 0%, rgba(144, 101, 255, 0.08) 50%, transparent 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      boxShadow: {
        'glow-blue': '0 0 35px -5px rgba(67, 133, 255, 0.35)',
        'glow-purple': '0 0 35px -5px rgba(144, 101, 255, 0.35)',
        'glow-cyan': '0 0 35px -5px rgba(72, 216, 232, 0.35)',
        'glow-card': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan-line': 'scan 2.5s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(0%)', opacity: '0.2' },
          '50%': { transform: 'translateY(100%)', opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}
