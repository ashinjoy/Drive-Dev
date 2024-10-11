import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { TRIP_SERVICE } from "../../../config/constants/proxyTarget.js";

const tripRouter = express.Router();

tripRouter.use(createProxyMiddleware({
    target:'http://localhost:3003/trip/',
    changeOrigin: true,
  })
);

export { tripRouter };
