/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}', './helpers/*.{js,ts,jsx,tsx}'],

    theme: {
        extend: {
            colors: {
                primary: '#2B7BC2',
            },
            animation: {
                scroll: 'scroll 15s linear infinite',
                'slide-phrases-upward': 'slide-phrases-upward 20s',
            },
            keyframes: {
                scroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100%)' }, // Adjust the percentage based on the number of items
                },
                'slide-phrases-upward': {
                  '0%': { transform: 'translateY(0px)' },
                  '5%': { transform: 'translateY(-50px)' },
                  // Add more keyframes as needed
                },
            }
        },
    },
    plugins: [],
};
