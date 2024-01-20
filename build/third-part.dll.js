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
            /**
             * @babel/runtime----polyfill文件
             */
            'third_part': ['viewport-units-buggyfill','axios'],//与react无关的第三方插件js
        },
        plugins: [
            ...commonConfig.plugins,
            new HtmlWebpackPlugin({
                title: '',
                filename: 'index.html',
                template: 'dist/static/index.html',
                inject: 'body'
            }),
            // new BundleAnalyzerPlugin({ analyzerPort: 8091 })
        ]
    }
};