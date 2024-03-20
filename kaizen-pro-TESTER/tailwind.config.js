module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // color choice for light mode
      colors: {
        'light-background': '#FFFFFF',
        'light-text': '#333333',
        
      },
      // colour choice dark mode
      dark: {
        'dark-background': '#1A1A2E',
        'dark-text': '#00DF9A',
        
      },
    },
    
    darkSelector: '.dark-mode',
    
    darkMode: 'class',
  },
  plugins: [],
};
