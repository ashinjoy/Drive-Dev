import express from "express";
import { configDotenv } from "dotenv";
import cors from 'cors'
import { authRouter } from "../interfaces/routes/user/userRouter.js";
import { tripRouter } from "../interfaces/routes/user/tripRouter.js";
import { chatRouter } from "../interfaces/routes/user/chatRouter.js";
import { paymentRouter } from "../interfaces/routes/user/paymentRouter.js";

configDotenv();

export const createServer = () => {
  const app = express();
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
  app.use("/api/auth",(req,res,next)=>{console.log('hee');next()
  },authRouter)
  app.use('/api/trip',(req,res,next)=>{console.log("hi");next()},tripRouter)
  app.use('/api/chat',chatRouter)
  app.use('/api/payment',(req,res,next)=>{console.log("hi");next()
  },paymentRouter)

  return app;
};
