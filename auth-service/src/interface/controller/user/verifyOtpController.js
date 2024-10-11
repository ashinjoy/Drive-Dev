export class VerifyOtpController {
  constructor(dependencies) {
    this.verifyAuthUseCase = new dependencies.useCase.VerifyOtpUseCase(
      dependencies
    );
  }
  async verifyOtp(req, res, next) {
    try {
      const { otp } = req.body;
      if (!otp) {
        const error = new Error();
        error.status = 400;
        error.message = "Otp Error";
        throw error;
      }
      const { data, accessToken, refreshToken } =
        await this.verifyAuthUseCase.execute(req.session, otp);
      res.cookie("userRefreshToken", refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res
        .status(200)
        .json({ data, accessToken, message: "Otp Verification SucessFull" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
