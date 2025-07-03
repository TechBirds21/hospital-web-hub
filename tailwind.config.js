/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          dark: 'hsl(var(--primary-dark))',
          light: 'hsl(var(--primary-light))',
        },
        secondary: 'hsl(var(--secondary))',
        accent: 'hsl(var(--accent))',
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        error: 'hsl(var(--error))',
        background: 'hsl(var(--background))',
        surface: 'hsl(var(--surface))',
        'surface-variant': 'hsl(var(--surface-variant))',
        text: 'hsl(var(--text))',
        'text-muted': 'hsl(var(--text-muted))',
        'text-light': 'hsl(var(--text-light))',
        border: 'hsl(var(--border))',
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-card': 'var(--gradient-card)',
        'gradient-glass': 'var(--gradient-glass)',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'glow': 'var(--shadow-glow)',
        'glow-hover': 'var(--shadow-glow-hover)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s ease-out',
        'slideInRight': 'slideInRight 0.6s ease-out',
        'slideInLeft': 'slideInLeft 0.6s ease-out',
        'slideInUp': 'slideInUp 0.6s ease-out',
        'scaleIn': 'scaleIn 0.5s ease-out',
        'float': 'floatAnimation 3s ease-in-out infinite',
        'pulseGlow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 0.8s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        floatAnimation: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' },
          '50%': { boxShadow: '0 0 40px hsl(var(--primary) / 0.6)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};
