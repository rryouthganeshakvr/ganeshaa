/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#FFF8F0', 100: '#FFEFD9', 200: '#FFD9A8', 300: '#FFBF6B',
          400: '#FF9F3A', 500: '#FF7F00', 600: '#E8640A', 700: '#C44D06',
          800: '#9A3A04', 900: '#7A2D03',
        },
        gold: {
          50: '#FFFEF0', 100: '#FFFBD6', 200: '#FFF5A3', 300: '#FFEC6B',
          400: '#FFD700', 500: '#D4AF37', 600: '#B8920A', 700: '#9A7408',
          800: '#7A5A06', 900: '#5A4204',
        },
        ivory: {
          50: '#FFFFFF', 100: '#FFFFF8', 200: '#FFFEF0', 300: '#FAF3E0',
          400: '#F5E9D0', 500: '#EDD9B5', 600: '#D4BA8A', 700: '#B8976A',
          800: '#9A7550', 900: '#7A5A38',
        },
        dark: {
          50: '#3D1A00', 100: '#2D1200', 200: '#200D00', 300: '#170A00',
          400: '#100700', 500: '#0A0500', 600: '#070300', 700: '#050200',
          800: '#030100', 900: '#010000',
        },
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'spin-slow': 'spin 30s linear infinite',
        'spin-slower': 'spin 60s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      boxShadow: {
        'gold-sm': '0 0 10px rgba(212,175,55,0.3)',
        'gold': '0 0 20px rgba(212,175,55,0.4)',
        'gold-lg': '0 0 40px rgba(212,175,55,0.5)',
        'gold-xl': '0 0 60px rgba(212,175,55,0.6)',
        'saffron': '0 0 20px rgba(232,100,10,0.4)',
        'glass': '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
        'glass-hover': '0 16px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)',
      },
    },
  },
  plugins: [],
}

