const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry:path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename:'bundle.js'
    },
    module: {
        rules: [
            { 
              test: /.jsx?$/, 
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                  presets: ['env','react']
              } 
            }
        ]
    },
    devtool: 'inline-source-map'
}
