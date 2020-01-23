const webpack = require('webpack'),
      merge = require('webpack-merge'),
      baseWebpackConfig = require('./webpack.base.config'),

  devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',

    devtool: 'cheap-module-eval-source-map',

    devServer: {
      contentBase: baseWebpackConfig.externals.paths.dist,
      port: 8081,
      overlay: {
        warnings: true,
        errors: true
      }
    },

    plugins: [
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map'
      })
    ]
  });

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
});

