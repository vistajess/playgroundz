var webpack = require('webpack');
var config = require('./config');
var parse = JSON.stringify; // shortcut
var path = require('path');
var bootstrapPath = path.join(
    __dirname,
    'node_modules/bootstrap/css'
);

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, '../public/dist/')
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx|es6)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.css$/, // Only .css files
        loader: 'style!css' // Run both loaders
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx', '.es6', '.css']
  },
  plugins: [
     new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
  }),
    new webpack.ProvidePlugin({
           bootstrap: "bootstrap.css",
    }),
    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      _API_: parse(config._API_),
      _ROOT_URI_: parse(config._ROOT_URI_),
      _ENV_: parse(config._ENV_),
      _DEV_: parse(config._DEV_),
      _PRODUCTION_: parse(config._PRODUCTION_),
      _CDN_: parse(config._CDN_),
      _IMG_: parse(config._IMG_),
      // Server-side rendering option is explicitly set to false.
      // This is set only to true for the server.
      _SSR_: false
    })
  ]
};
