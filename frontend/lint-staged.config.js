module.exports = {
  // Run ESLint on changes to JavaScript/TypeScript files
  '**/*.(ts|js)?(x)': (filenames) => `npm run lint . ${filenames.join(' ')}`,
  '**/*.(ts|js)?(x)': 'npm run prettier:check',
};
