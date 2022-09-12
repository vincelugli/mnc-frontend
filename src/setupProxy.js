const { createProxyMiddleware } = require("http-proxy-middleware");
const proxy = {
  target: "https://toxic-api-production.gggrunt16.workers.dev",
  changeOrigin: true,
};
module.exports = function (app) {
  app.use("/placement", createProxyMiddleware(proxy));
};
