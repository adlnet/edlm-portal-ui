/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'node_modules/flowbite-react/lib/esm/**/*.js',
    "./node_modules/flowbite/**/*.js",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
      },
      colors: {
        'dark-blue': '#010E42',
        'purple': '#562990',
        'blue-custom':'#135F9B',
        'gray-custom': '#6B7280',
        'black-10': 'rgba(17, 24, 39, .1)',
        'red': '#902929',
        'accent-blue': '#65D4E9',
        'black-custom': '#1B1128',
        'navy-025': '#EDF5FF',
        'navy-200': '#1D62AD',
        'navy-700': '#17528E',
        'teal-custom-500': '#23717E',
        'teal-custom-50': '#E6F2F6',
        'gray-cool-700': '#545964',
        'teal-disabled': '#94bbbd',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
