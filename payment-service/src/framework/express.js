import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "../interface/routes/userRoute.js";
import driverRouter from "../interface/routes/driverRoutes.js";
import adminRouter from '../interface/routes/adminRoutes.js'
import { ErrorHandling } from "../interface/middleware/errorHandlingMiddleware.js";




const createServer = () => {
  const app = express();
  
  app.use(cookieParser())
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());


    app.use('/payment/user',userRouter)
    app.use('/payment/driver',driverRouter)
    app.use('/payment/admin',adminRouter)
    app.use(ErrorHandling.errorHandler)

  return app
};

export { createServer };