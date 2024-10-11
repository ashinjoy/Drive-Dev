export class VerifyOtpController {
  constructor(dependencies) {
    this.verifyAuthUseCase = new dependencies.useCase.DriverVerifyOtpUseCase(
      dependencies
    );
  }
  async verifyOtp(req, res, next) {
    try {
      const { otp } = req.body;
      if (!otp) {
        const error = new Error();
        error.status = 400;
        error.message = "Provide Valid OTP";
        throw error;
      } 
      const {otpDetails} = req.session
      if(!otpDetails){
        const error = new Error()
        error.message = "OTP has been expired"
        error.status = 400
        throw error
      }
      const verifiedDriverData  =
          await this.verifyAuthUseCase.execute(
          otpDetails,
          otp
        )
      res
        .status(200)
        .json({ data:verifiedDriverData, message: "Otp Verification SucessFull" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
