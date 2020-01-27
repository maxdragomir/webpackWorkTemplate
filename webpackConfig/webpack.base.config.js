const path = require('path'),
      fs = require("fs"),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../myBuild'),
  assets: 'assets/',
  phpFiles: 'phpFiles/',
};

const PAGES_DIR = `${PATHS.src}/pug/pages/`,
      PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

module.exports = {

  externals: {
    paths: PATHS
  },

  entry: {
    app: PATHS.src,
    // test: `${PATHS.src}/test.js`
  },

  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    publicPath: ''
    // publicPath: '/'
  },

  optimization: {
    minimize: false,
    // splitChunks: {
    //   cacheGroups: {
    //     vendor: {
    //       name: 'vendors',
    //       test: /node_modules/,
    //       chunks: 'all',
    //       enforce: true
    //     }
    //   }
    // }
  },

  module: {
    rules: [{
      test: /\.pug$/,
      loader: 'pug-loader',
    },{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }, {
      test: /\.(img|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    }, {
      test: /\.(sa|sc|c)ss$/,
      use: [
        'style-loader',
        {
          loader: MiniCssExtractPlugin.loader,
          options: {hmr: process.env.NODE_ENV === 'development'}
        }, {
          loader: 'css-loader',
          options: {sourceMap: true}
        }, {
          loader: 'postcss-loader',
          options: {sourceMap: true, config: {path: `./webpackConfig/postcss.config.js`}}
        }, {
          loader: 'sass-loader',
          options: {sourceMap: true}
        }
      ]
    }]
  },
  resolve: {
    alias: {
      '~': 'src'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}styles/[name].css`
    }),
    // new HtmlWebpackPlugin({
    //   template: `${PATHS.src}/index.html`,
    //   filename: './index.html'
    // }),
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug/,'.html')}`
    })),
    // ...PAGES.map(page => new HtmlWebpackPlugin({
    //   template: `${PAGES_DIR}/${page}`,
    //   filename: `./${page.replace(/\.pug/,'.php')}`
    // })),
    new CopyWebpackPlugin([
      {from: `${PATHS.src}/img`, to: `${PATHS.assets}img`},
      {from: `${PATHS.src}/fonts`, to: `${PATHS.assets}fonts`},

      {from: `${PATHS.src}/styles/libs`, to: `${PATHS.assets}styles/libs`},
      {from: `${PATHS.src}/js/libs`, to: `${PATHS.assets}js/libs`},
    ])
  ]
};























