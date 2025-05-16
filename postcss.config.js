/** @type {import('postcss').Config} */
module.exports = {
  plugins: [
    'postcss-import',
    'tailwindcss/nesting',
    'tailwindcss',
    'autoprefixer',
    ['postcss-preset-env', {
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3,
      features: {
        'custom-properties': false
      }
    }],
    'postcss-flexbugs-fixes'
  ]
} 