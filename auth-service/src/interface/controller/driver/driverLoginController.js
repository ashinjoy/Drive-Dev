export class DriverLoginController {
  constructor(dependencies) {
    this.driverLoginUseCase = new dependencies.useCase.DriverLoginUseCase(
      dependencies
    );
  }
  async login(req, res, next) {
    try {
      const { accessToken, refreshToken, data } =
        await this.driverLoginUseCase.execute(req.body);
      res.cookie("driverRefreshToken", refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res
        .status(200)
        .json({ data, accessToken, message: "Logged In Successfully" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
