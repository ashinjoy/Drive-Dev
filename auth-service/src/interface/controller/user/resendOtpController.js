export class ResendOtpController {
  constructor(dependencies) {
    this.resendOtpUserCase = new dependencies.useCase.ResendOtpUseCase(
      dependencies
    );
  }
  async resendOtp(req, res, next) {
    try {
      const { email } = req.body;
      if (!email) {
        const error = new Error();
        error.status = 400;
        error.message = "Bad Request";
      }
      const { userId, otp } = await this.resendOtpUserCase.execute(email);
      req.session.userId = userId;
      req.session.otp = otp;
      res.status(200).json({ message: "OTP send Sucessfully" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
