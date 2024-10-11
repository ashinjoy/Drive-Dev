import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import userRouter from "../interface/routes/user/userRoute.js";
import driverRouter from "../interface/routes/driver/driverRoute.js";
import adminRouter from "../interface/routes/admin/adminRoute.js";
import { ErrorHandling } from "../interface/middleware/errorHandlingMiddleware.js";

const createServer = () => {
  const app = express();
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60,
      },
    })
  );
  app.use("/auth/user", userRouter);
  app.use("/auth/driver", driverRouter);
  app.use("/auth/admin", adminRouter);
  app.use(ErrorHandling.errorHandler);
  return app;
};

export default createServer;
