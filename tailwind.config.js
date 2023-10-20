/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    backgroundOpacity: ['active'],
  },
  content: ['./src/**/*.{html,ts}'],
  safelist: [
    'bg-opacity-0',
    'bg-opacity-10',
    'bg-opacity-20',
    'bg-opacity-30',
    'bg-opacity-40',
    'bg-opacity-50',
    'bg-opacity-60',
    'bg-opacity-70',
    'bg-opacity-80',
    'bg-opacity-90',
    'bg-opacity-100',

  ],

  plugins: [
    require('@tailwindcss/aspect-ratio')
    , require('@tailwindcss/forms')
    , require('@tailwindcss/line-clamp')
    , require('@tailwindcss/typography')
  ],
};
