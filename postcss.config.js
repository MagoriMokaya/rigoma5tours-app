/**
 * PostCSS configuration for optimal Tailwind CSS and Autoprefixer usage.
 * Includes additional plugins for better CSS optimization and compatibility.
 */

export default {
    plugins: {
        'postcss-import': {},        // Enables @import in CSS
        'tailwindcss/nesting': {},   // Enables nesting with Tailwind CSS
        tailwindcss: {},
        autoprefixer: {},
        'postcss-preset-env': {      // Adds modern CSS features and polyfills
            stage: 1,
            features: {
                'nesting-rules': true,
            },
            autoprefixer: { grid: true },
        },
        'cssnano': process.env.NODE_ENV === 'production' ? {} : false, // Minifies CSS in production
    },
}