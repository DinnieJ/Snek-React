const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const env = require('dotenv-webpack')

const config = {
  entry: "./src/index.js",
  output: {
    filename: '[name].[chunkhash].bundle.js',
    path: path.resolve(__dirname, "build"),
  },
  devServer: {
    contentBase: path.resolve(__dirname, "build"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),

    new webpack.HotModuleReplacementPlugin(),

    new env()
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    runtimeChunk: {
      name: "manifest",
    },
  },
  
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: "style-loader",
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: "css-loader",
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer
                ]
              }
            },
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        resolve: {
          extensions: [".js", ".jsx"],
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        loader: "file-loader",
        options: {
          name: 'images/[name].[ext]',
        },
      },
    ],
  },
};

module.exports = config;
