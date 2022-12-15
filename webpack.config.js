const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyWebPackPlugin = require('copy-webpack-plugin');
const MiniCss = require('mini-css-extract-plugin'); // Позволяет выносить стили из тега head

module.exports = {
  context: path.resolve(__dirname, './src/pages'), // Указывает на папку с исходниками
  mode: 'development',
  entry: {
    main: './main/index.js',
    // donate: './donate/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.json', '.png', '.scss'], // Расширения по умолчанию, которые не нужно указывать
    // alias: {
    //   '@models': path.resolve(__dirname, 'src/models'), // псевдоним для пути
    //   '@': path.resolve(__dirname, 'src'),
    // }
  },
  optimization: {
    splitChunks: {
      chunks: 'all' // Позволяет выносить библиотеки отдельно из файлов
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
      cleanStaleWebpackAssets: false, // Этот параметр не даёт Cleaner выпиливать ресурсы без изменений из html-builder
      output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
      },
    }),

    // new CopyWebPackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, 'src/assets/favicon.ico'),
    //       to: path.resolve(__dirname, 'dist')
    //     },
    //   ]
    // }),
    new MiniCss({
      // filename: '[name].[contenthash].css'
      filename: '[name].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCss.loader, 'css-loader'], // Справа налево
      },
      {
        test: /\.s[ac]ss/,
        use: [MiniCss.loader, 'css-loader', 'sass-loader'], // Справа налево
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.html$/, // Позволяет цеплять изображения из тега img
        use: [
          'html-loader'
        ]
      },
    ]
  }
}