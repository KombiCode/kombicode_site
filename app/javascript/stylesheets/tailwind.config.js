module.exports = {
  purge: {
    content: [
    './app/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/javascript/**/*.vue'
    // Add any other JS files here (i.e. .jsx, .ts, etc...)
    ],
    options: {
      safelist: [
        'inset-x-0',
        'top-0',
        'left-0',
        'h-full'
      ]
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
      },
    },
    variants: {},
    plugins: [
      require('tailwindcss-debug-screens'),
      ]
    },
}
