const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function getCommonConfig(env) {
    return {
        mode: env.mode,
        devtool: false,
        output: {
            path: path.resolve(__dirname, '../dist/static'),
            filename: "js/[name].[contenthash:8].js",
            library: "[name]",
            publicPath: '/static'
        },
        module: {
            rules: [{
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "../node_modules")
                ],
                use: "babel-loader"
                // options for the loader
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ],
                include: [
                    path.resolve(__dirname, "../node_modules")
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                // flags to apply these rules, even if they are overridden (advanced option)
                loader: "url-loader",
                // options for the loader
                options: {
                    limit: 10000,
                    name: 'images/[name].[contenthash:8].[ext]'
                },
                include: [
                    path.resolve(__dirname, "../node_modules")
                ]
            },
            {
                test: /\.(ttf|woff|eot)$/,
                // flags to apply these rules, even if they are overridden (advanced option)
                loader: "url-loader",
                // options for the loader
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[contenthash:8].[ext]'
                },
                include: [
                    path.resolve(__dirname, "../node_modules")
                ]
            }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(env.mode)
            }),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css'
            }),
            new webpack.DllPlugin({
                path: path.join(__dirname, '..', "[name]-manifest.json"),
                name: "[name]"
            }),
            // new BundleAnalyzerPlugin({ analyzerPort: 8092 })
        ]
    }
}