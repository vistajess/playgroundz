// webpack.config.js
module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'dist/script.js'       
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-0']
      },
      exclude: /(node_modules)/,
    }]
  },
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.jsx'] 
  }
};