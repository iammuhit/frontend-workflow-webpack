module.exports = {
    purge: {
        enabled: process.env.APP_MODE === process.env.ENV_PRODUCTION,
        content: ['./public/**/*.{html,js]'],
    },
    content: ['./src/**/*.{twig,html,js}'],
    darkMode: false, // media, class, false
    theme: {
        extend: {}
    },
    variants: {},
    plugins: [],
};