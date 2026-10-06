module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'saffron': '#E85D04',
        'terracotta': '#C44536',
        'turmeric': '#F4B400',
        'leaf-green': '#588157',
        'cream': '#FFF8ED',
        'dark-brown': '#2B2118',
        'text': '#292524',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'devanagari': ['Noto Sans Devanagari', 'sans-serif'],
      },
      animation: {
        'float-up': 'floatUp 3s ease-in-out infinite',
        'float-down': 'floatDown 3s ease-in-out infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'heartbeat': 'heartbeat 1.2s ease-in-out',
      },
      keyframes: {
        floatUp: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
        heartbeat: {
          '0%': { transform: 'scale(1)' },
          '10%': { transform: 'scale(1.1)' },
          '20%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
