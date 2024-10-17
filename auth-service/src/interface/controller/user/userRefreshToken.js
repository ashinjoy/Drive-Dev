import { errorLogger } from "../../../config/winstonConfig.js";

export class UserRefreshTokenController {
  constructor(dependencies) {
    this.userRefreshTokenUseCase =
      new dependencies.useCase.userRefreshTokenUseCase(dependencies);
  }
  async refreshUserToken(req, res, next) {
    try {
      const { userRefreshToken } = req.cookies;

      if (!userRefreshToken) {
        const error = new Error();
        error.message = "No Token";
        error.status = 400;
        throw error;
      }
      const newUserAceessToken = await this.userRefreshTokenUseCase.execute(
        userRefreshToken
      );
      if (!newUserAceessToken) {
        const error = new Error();
        error.message = "No Token";
        error.status = 400;
        throw error;
      }

      res.status(201).json(newUserAceessToken);
    } catch (error) {
      errorLogger.error(error);
      next(error);
    }
  }
}
