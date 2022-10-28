// solve CORS error
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/cfsc",
    createProxyMiddleware({
      target:
        "https://3101102946.for-seoul.synctreengine.com/",
      changeOrigin: true,
      method: "POST",
    })
  );
};
