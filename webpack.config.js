const path = require('path')
module.exports = {
    mode: 'production',
    entry: {
        main: './src/Main.ts'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
        　　     test: /\.fs$/,
        　　     use: 'raw-loader',
            },
            {
        　　     test: /\.vs$/,
        　　     use: 'raw-loader',
            } 
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'bin'),
    },
    resolve: {
        extensions: ['.ts']
    }
}