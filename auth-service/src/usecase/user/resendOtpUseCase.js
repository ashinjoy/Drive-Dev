import sendMail from "../../utils/nodemailer.js";
import generateOTP from "../../utils/generateOtp.js";
import { errorLogger, infologger } from "../../config/winstonConfig.js";

export class ResendOtpUseCase {
  constructor(dependencies) {
    this.userRepository = new dependencies.repository.MongoUserRepository();
  }
  async execute(email) {
    try {
      const otp = generateOTP();
      console.log("RESEND OTP", otp);

      infologger.info("RESEND OTP", otp);
      await sendMail(otp, email);
      const getUserByEmail = await this.userRepository.findUserByEmail(email);
      const userId = getUserByEmail._id;
      return {
        userId,
        otp,
      };
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }
}
