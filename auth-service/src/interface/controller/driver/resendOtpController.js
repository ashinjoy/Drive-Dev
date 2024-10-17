import { errorLogger } from "../../../config/winstonConfig.js";

export class ResendOtpController {
  constructor(dependencies) {
    this.resendOtpUserCase = new dependencies.useCase.DriverResendOtpUseCase(
      dependencies
    );
  }
  async resendOtp(req, res, next) {
    try {
      const { email } = req.body;
      const { userId, otp } = await this.resendOtpUserCase.execute(email);
      req.session.otpDetails = { userId, otp };
      res.status(200).json({ message: "otp resend sucessfully" });
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      next(error);
    }
  }
}
