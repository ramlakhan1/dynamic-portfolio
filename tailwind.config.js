export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'blink': 'blink 1s infinite',
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'slideUp': 'slideUp 0.6s ease-out',
        'gradient': 'gradient 8s ease infinite',
        'floatFlower': 'floatFlower 6s ease-in-out infinite',
        'rotateFlower': 'rotateFlower 4s linear infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'popupScale': 'popupScale 0.5s ease-out',
        'fadeIn': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        floatFlower: {
          '0%': { 
            transform: 'translateY(0) rotate(0deg)',
            opacity: '0.8'
          },
          '50%': { 
            transform: 'translateY(-100vh) rotate(180deg)',
            opacity: '1'
          },
          '100%': { 
            transform: 'translateY(-200vh) rotate(360deg)',
            opacity: '0'
          },
        },
        rotateFlower: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.1)' },
          '50%': { transform: 'scale(1)' },
          '75%': { transform: 'scale(1.05)' },
        },
        popupScale: {
          '0%': { 
            transform: 'scale(0.8) translateY(20px)',
            opacity: '0'
          },
          '100%': { 
            transform: 'scale(1) translateY(0)',
            opacity: '1'
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}