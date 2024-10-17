import app from "./app.js";
import { errorLogger } from "./config/winstonConfig.js";

const PORT = process.env.PORT;

const startServer = () => {
  try {
    app.listen(PORT, () => console.log("Auth server started at PORT ", PORT));
  } catch (error) {
    console.error(error);
    errorLogger.error(error);
    throw error;
  }
};
startServer();
