import sendMail from "../../utils/nodemailer.js";

export class DriverResendOtpUseCase {
  constructor(dependencies) {
    this.driverRepository = new dependencies.repository.MongoDriverRepository();
  }
  async execute(email) {
    try {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      console.log('RESEND OTP ====>',otp);
      
       await sendMail(otp, email);
      const driverDetails = await this.driverRepository.findDriverByEmail(
        email
      );
      return {
        userId:driverDetails._id,
        otp
      }
    } catch (error) {
      console.error(error);
      throw error
    }
  }
}
