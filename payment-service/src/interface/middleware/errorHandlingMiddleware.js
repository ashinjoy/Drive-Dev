export class ErrorHandling {
    static async errorHandler(err, req, res, next) {
      res
        .status(err.status ? err.status : 500)
        .json({ error: err.message ? err.message : "Internal Server Error" });
    }
  }
  