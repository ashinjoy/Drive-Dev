import { errorLogger } from "../../../config/winstonConfig.js";

export class UserLogoutController {
  constructor(dependencies) {
    this.userLogoutUseCase = new dependencies.useCase.UserLogoutUseCase(
      dependencies
    );
  }
  async userLogout(req, res, next) {
    try {
      await this.userLogoutUseCase.execute(req, res);
      res.status(200).json({ message: "logout success" });
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      next(error);
    }
  }
}
