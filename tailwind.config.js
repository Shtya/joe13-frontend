/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}', './helpers/*.{js,ts,jsx,tsx}'],

    theme: {
        extend: {
            fontFamily: {
                montserrat: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
                cairo: ['var(--font-cairo)', 'system-ui', 'sans-serif'],
                orbitron: ['var(--font-orbitron)', 'sans-serif'],
                inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
            },
            colors: {
                primary: '#2B7BC2',
            },
            animation: {
                scroll: 'scroll 15s linear infinite',
                'slide-phrases-upward': 'slide-phrases-upward 20s',
                'hero-scroll-wheel': 'hero-scroll-wheel 1.8s ease-in-out infinite',
                'partners-marquee-ltr': 'partners-marquee 34s linear infinite',
                'partners-marquee-rtl': 'partners-marquee 34s linear infinite reverse',
                'partners-marquee-ltr-fast': 'partners-marquee 25s linear infinite',
                'partners-marquee-rtl-fast': 'partners-marquee 25s linear infinite reverse',
                'partners-marquee': 'partners-marquee 34s linear infinite',
                'partners-marquee-fast': 'partners-marquee 25s linear infinite',
                'services-modal-enter': 'services-modal-enter 0.42s cubic-bezier(0.16,1,0.3,1)',
            },
            keyframes: {
                scroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                'slide-phrases-upward': {
                  '0%': { transform: 'translateY(0px)' },
                  '5%': { transform: 'translateY(-50px)' },
                },
                'hero-scroll-wheel': {
                    '0%': { opacity: '0', transform: 'translateY(-2px)' },
                    '25%': { opacity: '1' },
                    '70%': { opacity: '1', transform: 'translateY(9px)' },
                    '100%': { opacity: '0', transform: 'translateY(12px)' },
                },
                'partners-marquee': {
                    from: { transform: 'translate3d(0, 0, 0)' },
                    to: { transform: 'translate3d(-50%, 0, 0)' },
                },
                'services-modal-enter': {
                    from: { opacity: '0', transform: 'translateY(18px) scale(0.97)' },
                    to: { opacity: '1', transform: 'translateY(0) scale(1)' },
                },
            }
        },
    },
    plugins: [],
};
