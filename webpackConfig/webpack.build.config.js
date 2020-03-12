const merge = require('webpack-merge'),
      PrettierPlugin = require('prettier-webpack-plugin'),
      baseWebpackConfig = require('./webpack.base.config'),

  buildWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    plugins: [
        new PrettierPlugin({
            printWidth: 80,               // Specify the length of line that the printer will wrap on.
            tabWidth: 2,                  // Specify the number of spaces per indentation-level.
            useTabs: true,               // Indent lines with tabs instead of spaces.
            semi: true,                   // Print semicolons at the ends of statements.
            encoding: 'utf-8',            // Which encoding scheme to use on files
            extensions: [ ".js" ]  // Which file extensions to process
        }),
    ]
  });

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
});

