const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const getCommonConfig = require('./dll.base')

module.exports = (env) => {
    const commonConfig = getCommonConfig(env)
    return {
        ...commonConfig,
        entry: {
            //打包react/jsx-runtime文件的解释 在 react16之前，写jsx代码 都需要写代码 import react from 'react',会编译成 React.createElement()
            //react17之后 出了自己的runtime.js库，会编译成import {jsx} from 'react，不依赖bebel也可以
            "react_bucket": ['react', 'react-router-dom', 'react-dom','react/jsx-runtime'], //全家桶
        },
        plugins: [
            ...commonConfig.plugins,
            new HtmlWebpackPlugin({
                title: '',
                filename: 'index.html',
                template: 'public/index.html',
                inject: 'body'
            }),
            // new BundleAnalyzerPlugin({ analyzerPort: 8092 })
        ]
    }
};