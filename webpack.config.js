module.exports = {
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    entry: './src/index.js',
    module: {
        loaders: [
            { test : /\.js$/, loader : 'babel-loader', exclude : '/node_modules/'}
        ]
    }
}