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
  theme: {
    extend: {
      backgroundOpacity: {
        '0': '0',
        '5': '0.05',
        '10': '0.1',
        '20': '0.2',
        '25': '0.25',
        '30': '0.3',
        '40': '0.4',
        '50': '0.5',
        '60': '0.6',
        '70': '0.7',
        '75': '0.75',
        '80': '0.8',
        '90': '0.9',
        '95': '0.95',
        '100': '1',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')
    , require('@tailwindcss/forms')
    // , require('@tailwindcss/line-clamp')
    , require('@tailwindcss/typography')
  ],
};
