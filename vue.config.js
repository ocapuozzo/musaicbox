module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "musaicbox" : "/",
  outputDir: 'docs', // ref github pages...
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined
};
