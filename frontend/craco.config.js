const CracoEsbuildPlugin = require('craco-esbuild');

module.exports = {
  plugins: [
    {
      plugin: CracoEsbuildPlugin,
      options: {
        esbuildMinimizerOptions: {
          target: 'es2020',
          css: true,
          minify: true,
          minifyWhitespace: true,
          minifyIdentifiers: true,
          minifySyntax: true,
          sourcemap: false,
        },
      },
    },
  ],
  style: {
    postOptions: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
};
