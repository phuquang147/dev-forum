const withMT = require('@material-tailwind/react/utils/withMT')

const config = withMT({
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          padding: '16px',
          '@media (min-width: 640px)': {
            maxWidth: '600px',
            padding: '16px',
          },
          '@media (min-width: 768px)': {
            maxWidth: '768px',
            padding: '16px',
          },
          '@media (min-width: 1024px)': {
            maxWidth: '1024px',
            padding: '16px',
          },
          '@media (min-width: 1280px)': {
            maxWidth: '1280px',
            padding: '20px',
          },
        },
      })
    },
  ],
})
export default config
