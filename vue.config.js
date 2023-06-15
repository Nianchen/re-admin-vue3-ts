const { defineConfig } = require("@vue/cli-service");

console.log(process.env.VUE_APP_BASE_URL);
module.exports = defineConfig({
  publicPath:"/",
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/api':{
        target:process.env.VUE_APP_BASE_URL,
        changeOrigin:true,
        pathRewrite:{
          '^/api':" "
        },
      }
    }
  }
});
