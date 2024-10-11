
export class adminLogincontroller {
  constructor(dependencies) {
    this.adminLoginUseCase = new dependencies.useCase.adminLoginUseCase(dependencies);
  }
  async login(req, res, next) {
    try {
      const adminDetails = await this.adminLoginUseCase.execute(req.body);
      const data = {
        id:adminDetails?.id,
        name: adminDetails?.name,
        email: adminDetails?.email,
      };
      res.cookie("adminRefreshToken", adminDetails?.adminRefreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res
        .status(200)
        .json({
          data,
          accessToken: adminDetails?.adminAccessToken,
          message: "Login sucessfull",
        });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
