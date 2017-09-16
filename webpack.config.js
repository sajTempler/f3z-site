const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'prod';
// const isProd = true;
console.log('webpack isProd', isProd);
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [{
        loader: 'css-loader',
        options: {
            minimize: isProd
        }
    }, 'sass-loader']
});

const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/'
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        stats: 'errors-only',
        open: true,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: isProd
            },
            template: './src/index.html'
        }),
        new ExtractTextPlugin({
            filename: 'styles.css',
            disable: !isProd,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};