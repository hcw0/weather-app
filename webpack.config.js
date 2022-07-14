const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main.[contenthash].js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
          {
            test: /\.html$/i,
            loader: "html-loader",
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
            generator: {
                filename: "imgs/[name].[hash][ext]"
            }
          }, 
          {
            test: /\.css$/i,
            generator: {
                filename: "main.css"
            }
          },
        ],
      },
}