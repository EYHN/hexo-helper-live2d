var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var HtmlWebpackConfig = {
    title: 'live2d',
    filename: 'index.html',
    template: "./src/index.html",
    hash: true,
    showErrors: true
};

module.exports = {
    entry: [
        "./src/main.js"
    ],
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    plugins: [
        new HtmlWebpackPlugin(HtmlWebpackConfig)
    ],

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    query: {
                        presets: ["env"]
                    }
                }],
            },
            {
                test: /\.js$/,
                enforce: "pre",
                use: [{ loader: 'source-map-loader' }]
            }
        ]
    }
}