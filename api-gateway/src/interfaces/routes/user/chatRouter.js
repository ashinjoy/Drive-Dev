import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { TRIP_SERVICE } from "../../../config/constants/proxyTarget.js";

const chatRouter = express.Router();

chatRouter.use(createProxyMiddleware({
    target:'http://localhost:3004/chat/',
    changeOrigin: true,
  })
);

export { chatRouter};