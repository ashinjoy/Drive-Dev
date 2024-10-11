import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { AUTH_SERVICE } from "../../../config/constants/proxyTarget.js";

const authRouter = express.Router();

authRouter.use(createProxyMiddleware({
    target: 'http://localhost:3002/auth/',
    changeOrigin: true,
  })
);

export { authRouter };
