const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require('path');

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "[name].[hash].js",
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'constants': path.join(__dirname,'./src/vue/constants/')
    }
  },
  devtool: "eval-cheap-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true,
    }),
    // new CleanWebpackPlugin()
  ],
};