module.exports = {
  purge: {
    content: [
    './app/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/javascript/**/*.vue'
    // Add any other JS files here (i.e. .jsx, .ts, etc...)
    ],
    // Below are classes we explicitly want to keep no matter what
    safelist: [
      'hidden',
      'animated',
      'fadeIn',
      'fixed',
      'inset-0',
      'overflow-y-auto',
      'flex',
      'items-center',
      'justify-center'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
