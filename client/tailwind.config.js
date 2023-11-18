/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: "pink-600",
        bgSecondary: "#212130",
        bgTertiary: "#282D42",
        bgQuaternary: 'fuchsia-600',
        textPrimary: 'white',
        textSecondary: 'pink-600',
        textTertiary: 'slate-400',
      },
      screens: {
        xs: "480px",
        ss: "700px",
        sm: "780px",
        md: "1024px",
        lg: "1186px",
        xl: "1260px",
        "2xl": "1536px",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      keyframes: {
        'slide-in': {
          '0%': {
            transform: 'translateX(-200px)',
          },
          '100%': {
            transform: 'translateX(0px)',
          },
        },
        'slide-fwd': {
          '0%': {
            transform: 'translateX(200px)',
          },
          '100%': {
            transform: 'translateX(0px)',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-out': {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
        'fade-out-up': {
          '0%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
        },
        'shimmer': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.5',
          },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-out',
        'slide-fwd': 'slide-fwd 0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'fade-out': 'fade-out 0.5s ease-out',
        'fade-out-up': 'fade-out-up 0.5s ease-out',
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};