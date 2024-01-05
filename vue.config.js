const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  chainWebpack: (config) => {
    //生产去除console.log
    if (process.env.NODE_ENV === "production")
      config.optimization.minimizer("terser").tap((args) => {
        Object.assign(args[0].terserOptions.compress, {
          // 生产模式 console.log 去除
          // warnings: false , // 默认 false
          // drop_console:  ,
          // drop_debugger: true, // 默认也是true
          pure_funcs: ["console.log", "console.time", "console.timeEnd"],
        });
        return args;
      });
  },
  configureWebpack: {
    devtool: process.env.NODE_ENV === "development" ? "source-map" : undefined,
    module: {
      // rules: [{ loader: "workerize-loader", publicPath: "./" }],
    },
  },
  devServer: {
    compress: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
    proxy: {},
  },
});
