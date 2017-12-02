var webpack = require('webpack');
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Visualizer = require('webpack-visualizer-plugin');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
  entry: [ // Set cJs source entry
    "./src/main.js",
  ],
  output: { // Set cJs.min output
    filename: "cLive2d.min.js",
    path: __dirname + "/dist"
  },

  plugins: [
    new webpack.DefinePlugin({ // Set the production environment
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    new webpack.BannerPlugin("https://github.com/EYHN/hexo-helper-live2d -The file is creted at " + new Date()),

    new Visualizer(), // https://github.com/chrisbateman/webpack-visualizer
                      // visualizer generator

    new webpack.optimize.UglifyJsPlugin({ // Compress cJs
      compress: true,
      warnings: true,
      sourceMap: false,
      mangle: true
    }),

    new HtmlWebpackPlugin({ // Generate html template only with hash
      filename: 'insert.noloadscript.html',
      template: "./src/tmplate/insert.noloadscript.tmpl.html",
      hash: true,
      showErrors: true,
      minify:{ // Compress the html file
        removeComments:false, // Remove note
        collapseWhitespace:false // Remove space and compress line
      }
    })

  ],

  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: path.resolve(__dirname, "node_modules"),
      use: [{
        loader: 'babel-loader',
          query: {
            presets: ["env"]
          }
      }],
    }]
  }
}
