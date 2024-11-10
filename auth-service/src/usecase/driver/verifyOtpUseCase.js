import { errorLogger } from "../../config/winstonConfig.js";
import { KafkaClient } from "../../events/KafkaClient.js";
import { TOPIC, DRIVER_UPDATED } from "../../events/config.js";
export class DriverVerifyOtpUseCase {
  constructor(dependencies) {
    this.driverRepository = new dependencies.repository.MongoDriverRepository();
    this.kafka = new KafkaClient();
  }
  async execute(otpDetails, enteredOtp) {
    try {
      const { userId, otp } = otpDetails;
      const user = await this.driverRepository.findDriverbyId(userId);
      if (!user?.isBlocked) {
        if (otp === enteredOtp) {
          const updateVerificationStatus = { isVerified: true };
          const verifyUser =
            await this.driverRepository.findDriverByIdAndUpdate(
              userId,
              updateVerificationStatus
            );

          const verifiedDriverData = {
            id: verifyUser?._id,
            name: verifyUser?.name,
            email: verifyUser?.email,
            phone: verifyUser?.phone,
            isVerified: true,
            isBlocked: verifyUser?.isBlocked,
            isProfileComplete: verifyUser?.isProfileComplete,
            isAccepted: verifyUser?.isAccepted,
            editRequest: verifyUser?.editRequest,
          };
          this.kafka.produceMessage(TOPIC, {
            type: DRIVER_UPDATED,
            value: JSON.stringify(verifiedDriverData),
          });
          return verifiedDriverData;
        } else {
          const error = new Error();
          error.message = "Otp Mismatch";
          error.status = 401;
          throw error;
        }
      } else {
        console.log("User is being Blocked by the Admin");

        const error = new Error();
        error.status = 403;
        error.message = "You are Blocked by the Admin";
        throw error;
      }
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }
}
