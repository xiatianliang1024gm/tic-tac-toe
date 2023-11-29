const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        // main: './src/index.js',
        main: './src/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                use: 'ts-loader',

                // for .js
                // test: /\.js$/,
                // use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    // help webpack to recognize .ts/tsx
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    // help webpack to hanle html
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ],
    mode: 'development',
    devServer: {
        proxy: {
            '/api': 'http://localhost:8080',
        },
        client: {
            progress: true
        }
    }
}