import express from "express";
import http from 'http'
import cookieParser from "cookie-parser";
import  chatRouter from '../interface/routes/chatRouter.js'

const createServer = () => {
  const app = express();
  const httpServer = http.createServer(app)
  app.use(cookieParser())
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('/chat',chatRouter)
  return httpServer;
};

export { createServer };