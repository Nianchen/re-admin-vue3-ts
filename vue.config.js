const { defineConfig } = require("@vue/cli-service");

console.log(process.env.VUE_APP_BASE_URL);
console.log(process.env.ENV)
module.exports = defineConfig({
  publicPath:process.env.ENV == 'development'?'/':"./",
  transpileDependencies: true,
  devServer:{
    proxy:{
         "/api":{
       target:"http://101.35.231.221:8010",
       changeOrigin:true
    }
    }
 
  }
});
