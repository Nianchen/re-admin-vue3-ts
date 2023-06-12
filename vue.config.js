const { defineConfig } = require("@vue/cli-service");

console.log(process.env.VUE_APP_SERVER_URL);
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/api':{
        target:process.env.VUE_APP_SERVER_URL,
        pathRewrite:{
          '^/api':" "
        },
        changeOrigin:true
      }
    }
  }
});
