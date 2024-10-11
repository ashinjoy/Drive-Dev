import { createServer } from "./framework/express.js";

const app = createServer();

const PORT = process.env.PORT;

const startServer = () => {
  app.listen(PORT, () => console.log("Api-Gateway Started at PORT",PORT))
};
startServer();
