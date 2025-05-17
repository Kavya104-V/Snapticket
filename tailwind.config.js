/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',  // Ensure dark mode is enabled via class
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",  // Make sure this path matches your project structure
    ],
    theme: {
      extend: {
        colors: {
          primary: '#00FF00',   // Bright green for primary elements
          lightBg: '#F0F4F8',   // Light background color
          darkBg: '#121212',    // Dark background color
          textLight: '#333333', // Dark text for light mode
          textDark: '#FFFFFF',  // Light text for dark mode
        },
      },
    },
    plugins: [],
  };
  