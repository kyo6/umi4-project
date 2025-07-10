module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
    './src/layouts/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {},

      padding: {
        layoutHeader: 'var(--layout-header-height)',
        main: 'var(--p-main)',
        tabContent: 'var(--p-tab-content)',
      },

      margin: {
        tabContent: 'var(--p-tab-content)',
      },
    },
  },

  corePlugins: {
    preflight: false,
  },
};
