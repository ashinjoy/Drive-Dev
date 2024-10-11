import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { TRIP_SERVICE } from "../../../config/constants/proxyTarget.js";

const paymentRouter = express.Router();

paymentRouter.use(createProxyMiddleware({
    target:'http://localhost:3005/payment/',
    changeOrigin: true,
  })
);

export { paymentRouter};