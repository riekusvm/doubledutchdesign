var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') },
    ]
  },

  postcss: [
    require('autoprefixer-core')
  ],

  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true })
  ]
};
