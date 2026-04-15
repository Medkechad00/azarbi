import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand tokens (public site)
        clay:    '#8C4A30',
        saffron: '#C17A2C',
        linen:   '#F4EFE5',
        night:   '#1C1815',
        smoke:   '#9B8F85',
        argane:  '#3C5D4E',
        bone:    '#E6DDD1',
        bone2:   '#D9CFBF',

        // Admin-specific tokens
        'sidebar-bg':          '#1C1815',
        'sidebar-hover':       '#2A2320',
        'sidebar-active':      '#332C28',
        'sidebar-border':      '#2E2926',
        'sidebar-text':        '#9B8F85',
        'sidebar-text-active': '#F4EFE5',

        'admin-bg':     '#F8F6F2',
        'admin-card':   '#FFFFFF',
        'admin-border': '#E6DDD1',
        'admin-hover':  '#FAF8F4',

        // Status colours
        'status-available':      '#D1FAE5',
        'status-available-text': '#065F46',
        'status-reserved':       '#FEF3C7',
        'status-reserved-text':  '#92400E',
        'status-sold':           '#F3F4F6',
        'status-sold-text':      '#374151',
        'status-coming':         '#EDE9FE',
        'status-coming-text':    '#5B21B6',

        // Order status
        'order-pending':    '#FEF3C7',
        'order-confirmed':  '#DBEAFE',
        'order-processing': '#E0E7FF',
        'order-shipped':    '#D1FAE5',
        'order-delivered':  '#F0FDF4',
        'order-cancelled':  '#FEE2E2',

        // Chart colours
        'chart-1': '#8C4A30',
        'chart-2': '#C17A2C',
        'chart-3': '#3C5D4E',
        'chart-4': '#9B8F85',
        'chart-5': '#D9CFBF',

        // shadcn/ui semantic tokens
        border:      'hsl(var(--border))',
        input:       'hsl(var(--input))',
        ring:        'hsl(var(--ring))',
        background:  'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',
        primary:     { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary:   { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        muted:       { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent:      { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        popover:     { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        card:        { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        sidebar:     {
          DEFAULT:    'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary:    'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent:     'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border:     'hsl(var(--sidebar-border))',
          ring:       'hsl(var(--sidebar-ring))',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans:    ['Josefin Sans', 'system-ui', 'sans-serif'],
        mono:    ['DM Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '0.005em' }],
        'display-lg': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.05', letterSpacing: '0.01em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.1', letterSpacing: '0.015em' }],
        'label':      ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em' }],
        'label-sm':   ['0.5625rem', { lineHeight: '1', letterSpacing: '0.2em' }],
      },
      borderRadius: {
        'brand': '1px',
        'brand-sm': '2px',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      spacing: {
        'section': '80px',
        'section-sm': '48px',
        'sidebar-w': '240px',
        'sidebar-collapsed': '64px',
      },
      aspectRatio: {
        'rug': '3 / 4',
        'hero': '16 / 7',
        'story': '4 / 5',
      },
      boxShadow: {
        'none': 'none',
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease forwards',
        'slide-up': 'slideUp 0.6s ease forwards',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(1.03)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
