const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin');

module.exports = {
  context: path.resolve(__dirname, './src/pages'),
  mode: 'development',
  entry: {
    main: './main/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'docs'),
  },
  resolve: {
    extensions: ['.js', '.json', '.png', '.scss'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: './main/index.html'
    }),
    new HTMLWebpackPlugin({
      filename: "indexd.html",
      template: './donate/indexd.html'
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
      output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'docs'),
      },
    }),

    new MiniCss({
      filename: '[name].[contenthash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCss.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss/,
        use: [MiniCss.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.html$/,
        use: [
          'html-loader'
        ]
      },
    ]
  }
}