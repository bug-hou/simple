module.exports = {
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      // 配置跨域
      "/sugrec": {
        target: "https://www.baidu.com/",
        changeOrigin: true,
        secure: false,
      },
      "/simpleWeather": {
        target: "http://apis.juhe.cn",
        secure: false,
        changeOrigin: true,
      },
    },
  },
};
