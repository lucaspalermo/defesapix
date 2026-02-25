import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#EEEEF2',
          100: '#D2D3DE',
          200: '#A6A8BC',
          300: '#7B7D9B',
          400: '#565880',
          500: '#373963',
          600: '#282A4E',
          700: '#1A1C3A',
          800: '#111228',
          900: '#09090F',
          950: '#050508',
        },
        green: {
          50:  '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        ember: {
          50:  '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        gold: {
          300: '#FDE68A',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
      },
      fontFamily: {
        sans:    ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['var(--font-syne)', 'Syne', 'system-ui', 'sans-serif'],
        mono:    ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
      },
      animation: {
        'fade-in':     'fadeIn 0.5s ease-in-out',
        'slide-up':    'slideUp 0.6s ease-out',
        'pulse-slow':  'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow':   'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'ticker':      'ticker 35s linear infinite',
        // NEW
        'float':       'float 5s ease-in-out infinite',
        'float-slow':  'float 7s ease-in-out infinite',
        'shimmer-btn': 'shimmerBtn 2.8s ease-in-out infinite',
        'glow-pulse':  'glowPulse 2s ease-in-out infinite alternate',
        'spin-slow':   'spin 10s linear infinite',
        'orbit':       'orbit 6s linear infinite',
        'bounce-icon': 'bounceIcon 2.2s ease-in-out infinite',
        'draw':        'draw 1.5s ease forwards',
        'scale-in':    'scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'count-up':    'countUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        ticker: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-10px) rotate(0.3deg)' },
          '66%':      { transform: 'translateY(-5px) rotate(-0.3deg)' },
        },
        shimmerBtn: {
          '0%':       { transform: 'translateX(-150%) skewX(-12deg)', opacity: '0' },
          '20%':      { opacity: '1' },
          '60%, 100%':{ transform: 'translateX(300%) skewX(-12deg)', opacity: '0' },
        },
        glowPulse: {
          '0%':   { boxShadow: '0 0 15px rgba(249,115,22,0.2), 0 4px 12px rgba(249,115,22,0.1)' },
          '100%': { boxShadow: '0 0 50px rgba(249,115,22,0.55), 0 4px 25px rgba(249,115,22,0.25)' },
        },
        bounceIcon: {
          '0%, 100%': { transform: 'translateY(0)' },
          '40%':      { transform: 'translateY(-5px)' },
          '60%':      { transform: 'translateY(-2px)' },
        },
        orbit: {
          '0%':   { transform: 'rotate(0deg) translateX(22px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(22px) rotate(-360deg)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.8)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        countUp: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        draw: {
          from: { strokeDashoffset: '100' },
          to:   { strokeDashoffset: '0' },
        },
      },
      backgroundImage: {
        'hero-gradient':    'linear-gradient(135deg, #09090F 0%, #111228 100%)',
        'card-gradient':    'linear-gradient(145deg, #111228 0%, #161830 100%)',
        'ember-gradient':   'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
        'green-gradient':   'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        'danger-gradient':  'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)',
        'gold-gradient':    'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        'diagonal-pattern': 'repeating-linear-gradient(45deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 22px)',
        'bg-grid-pattern':  'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
      },
      boxShadow: {
        'ember-glow':  '0 0 40px rgba(249, 115, 22, 0.35), 0 4px 20px rgba(249, 115, 22, 0.15)',
        'green-glow':  '0 0 30px rgba(16, 185, 129, 0.3)',
        'gold-glow':   '0 0 30px rgba(245, 158, 11, 0.3)',
        'navy-glow':   '0 0 30px rgba(9, 9, 15, 0.5)',
        'card':        '0 1px 3px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.25)',
        'card-hover':  '0 4px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(249,115,22,0.2)',
        'inner-top':   'inset 0 1px 0 rgba(255,255,255,0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
