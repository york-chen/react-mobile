const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const getCommonConfig = require('./dll.base')

module.exports = (env) => {
    const commonConfig = getCommonConfig(env)
    return {
        ...commonConfig,
        entry: {
            'react_plugin': ['react-quill','react-quill/dist/quill.snow.css'],//react生态相关的插件或者工具
        },
        plugins: [
            ...commonConfig.plugins,
            new HtmlWebpackPlugin({
                title: '',
                filename: 'index.html',
                template: 'dist/static/index.html',
                inject: 'body'
            }),
            new webpack.DllReferencePlugin({
                manifest: require(path.join(__dirname, "..", "react_bucket-manifest.json"))
            }),
            // new BundleAnalyzerPlugin({ analyzerPort: 8091 })
        ]
    }
};