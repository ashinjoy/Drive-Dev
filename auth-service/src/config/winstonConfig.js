import { createLogger, transports, format } from "winston";

export const infologger = createLogger({
    
  transports: [
    new transports.File({
      filename: "infoLog.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

export const errorLogger = createLogger({
  transports: [
    new transports.File({
      filename: "errorLog.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});
