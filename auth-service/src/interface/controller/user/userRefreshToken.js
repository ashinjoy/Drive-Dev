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
      }
      const newUserAceessToken = await this.userRefreshTokenUseCase.execute(
        userRefreshToken
      );
      if (!newUserAceessToken) {
        const error = new Error();
        error.message = "No Token";
        error.status = 400;
      }

      res.status(201).json(newUserAceessToken);
    } catch (error) {
      next(error);
    }
  }
}
