const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['airbnb'] },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'],
      },
      {
        test: /\.(mp3)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules/tone/', 'node_modules'],
  },
};
