/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#e6f1ff',
            100: '#cce3ff',
            200: '#99c7ff',
            300: '#66abff',
            400: '#338fff',
            500: '#3B82F6',
            600: '#2563EB',
            700: '#0044b3',
            800: '#002d8c',
            900: '#001766',
          },
          secondary: {
            50: '#e6fbfa',
            100: '#ccf7f5',
            200: '#99efeb',
            300: '#66e7e1',
            400: '#33dfd7',
            500: '#10B981',
            600: '#059669',
            700: '#00978f',
            800: '#007770',
            900: '#005751',
          },
          accent: {
            50: '#fff3e6',
            100: '#ffe7cc',
            200: '#ffcf99',
            300: '#ffb766',
            400: '#ff9f33',
            500: '#8B5CF6',
            600: '#7C3AED',
            700: '#b35f00',
            800: '#8c4b00',
            900: '#663700',
          },
          success: '#10b981',
          warning: '#f59e0b',
          error: '#EF4444',
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
        },
        spacing: {
          '72': '18rem',
          '84': '21rem',
          '96': '24rem',
        },
        borderRadius: {
          'xl': '1rem',
          '2xl': '1.5rem',
        },
        boxShadow: {
          'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    plugins: [],
  }