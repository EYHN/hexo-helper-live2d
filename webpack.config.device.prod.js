var webpack = require('webpack');
var path = require('path')
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    entry: [
        "./node_modules/current-device/lib/index.js"
    ],
    output: {
        filename: "device.min.js",
        path: __dirname + "/dist"
    },

    plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: '"production"'
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: true,
          warnings: true,
          sourceMap: false,
          mangle: true
        })
    ],

    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, "node_modules"),
                use: [{
                    loader: 'babel-loader',
                    query: {
                        presets: ["env"]
                    }
                }],
            }
        ]
    }
}
