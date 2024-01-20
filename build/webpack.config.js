const path = require("path");
const fs = require('fs');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);
const mode = process.env.PROJECT_MODE;
// 读取环境变量配置
const dotenvFiles = [
  `${pathResolve(`../.env.${mode}.local`)}`,
  `${pathResolve(`../.env.${mode}`)}`,
  `${pathResolve(`../.env`)}`,
];
dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    const config = dotenv.config({
      path: dotenvFile,
    });
    dotenvExpand.expand(config);
  }
});
console.log(process.env.PROJECT_NAME)
module.exports = (env) => {
  return {
    mode: env.mode,
    devtool: env.mode === "development" ? "source-map" : false,
    entry: "./src/index.tsx",
    output: {
      filename: "[name]-[contenthash:8].js",
      path: path.resolve(__dirname, "../dist"),
      pathinfo: false, //webpack 会在输出的 bundle 中生成路径信息。然而，在打包数千个模块的项目中，这会带来垃圾回收性能的压力
      publicPath: "/", //前端开发环境使用history路由的时候，这个publich很有用
    },
    resolve: {
      modules: [path.resolve(__dirname, "../src"), "node_modules"],
      extensions: [".ts", ".tsx", ".js"],
      alias: {
        "@": path.resolve(__dirname, "../src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.less$/,
          // exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                //自己业务中的代码用到的样式表才开启模块化
                modules: {
                  localIdentName: "[local]_[hash:8]",
                },
              },
            },
            "postcss-loader",
            "less-loader",
          ],
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              //第三方的css样式表不开启模块化，否则会样式出问题
              loader: "css-loader",
            },
            "postcss-loader",
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.resolve(__dirname, "../dist/static/index.html"),
        inject: 'body'
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash:8].css",
        ignoreOrder: true
      }),
      new webpack.DefinePlugin({
        "process.env": Object.keys(process.env).reduce((env,key)=>{
          env[key] = JSON.stringify(process.env[key])
          return env
        },{})
      }),
      new webpack.DllReferencePlugin({
        manifest: require(path.join(
          __dirname,
          "..",
          "react_bucket-manifest.json"
        )),
      }),
      new webpack.DllReferencePlugin({
        manifest: require(path.join(
          __dirname,
          "..",
          "react_plugin-manifest.json"
        )),
      }),
      new webpack.DllReferencePlugin({
        manifest: require(path.join(
          __dirname,
          "..",
          "third_part-manifest.json"
        )),
      }),
      // new BundleAnalyzerPlugin({ analyzerPort: 8091 }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, "../dist"),
      },
      host: "0.0.0.0",
      historyApiFallback: true, //是否启用html5历史记录模式，
      open: true,
      hot: true,
      compress: false,
      port: 3003,
      proxy: {
        // "/api": {
        //   target: "http://process.hcytech.io/form/",
        //   pathRewrite: { "^/api": "" },
        //   changeOrigin: true,
        // },
        "/api": {
          target: "http://172.16.10.239:9527",
          // pathRewrite: { "^/api": "" },
          changeOrigin: true
        },
      },
      client: {
        overlay: true,
        progress: true,
      },
    },
  };
};
