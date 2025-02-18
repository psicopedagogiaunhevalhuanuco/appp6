const path = require('path');
const webpack = require('webpack'); // Asegúrate de importar webpack
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './js/loginForm.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "buffer": require.resolve("buffer/"),
      "stream": require.resolve("stream-browserify"),
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "process": require.resolve("process/browser"),
      "vm": require.resolve("vm-browserify"),
    },
    extensions: ['.js', '.json'],
  },
  plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'js/config.prod.js', to: 'js/config.prod.js' }
            ]
    }),
  ],
  mode: 'development'
};