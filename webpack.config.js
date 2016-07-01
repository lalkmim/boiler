var path = require('path');

module.exports = {
    entry: './webpack.entry.js',
    output: { 
        path: path.join(__dirname, 'public', 'javascript'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            },
            {
                test:   /\.scss/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    }
};