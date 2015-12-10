// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'dir/script.js'       
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react', 'stage-0']
      },
      exclude: /(node_modules)/,
    }]
  },
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.jsx'] 
  }
};