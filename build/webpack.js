module.exports = {
  entry: require('path').resolve(__dirname, '../src/index.js'),
  output: {
    path: require('path').resolve(__dirname, '../dist/js'),
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        stage: 0
      }
    }]
  }
};
