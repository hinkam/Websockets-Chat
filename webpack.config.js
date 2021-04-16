const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const backendConfig = {
    target: 'node',
    entry: './src/server/index.ts',
    module: {
        rules: [{
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }, ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    node: {
        __dirname: true
    },
    externals: [nodeExternals()],
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    mode: 'development'
};

const frontendConfig = {
    entry: './src/app/index.tsx',
    module: {
        rules: [{
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/app/index.html',
            base:'/'
        })
    ],
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist/static'),
    },
    mode: 'development'
}

module.exports = [backendConfig, frontendConfig];