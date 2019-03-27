var HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/_animations.scss";
          @import "@/assets/scss/_global.scss";
          @import "@/assets/scss/_variables.scss";
          @import "@/assets/scss/_buttons.scss";
          @import "@/assets/scss/_tags.scss";
          @import "@/assets/scss/_inputs.scss";
          @import "@/assets/scss/_content.scss";
        `
      }
    }
  },
  lintOnSave: true,
  configureWebpack: {
    mode: "production",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/")
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "public/index.html",
        minify: {
          collapseWhitespace: false,
          removeComments: true,
          removeRedundantAttributes: false,
          removeScriptTypeAttributes: false,
          useShortDoctype: false,
          removeStyleLinkTypeAttributes: false,
          removeAttributeQuotes: false
        }
      })
    ]
  }
};
