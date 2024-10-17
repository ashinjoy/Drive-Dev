import { createAccessToken, createRefreshToken } from "../../utils/jwt.js";
import { S3Config } from "../../utils/s3-bucketConfig.js";
import { KafkaClient } from "../../events/KafkaClient.js";
import { TOPIC, USER_UPDATED } from "../../events/config.js";
import { errorLogger } from "../../config/winstonConfig.js";

export class VerifyOtpUseCase {
  constructor(dependencies) {
    this.userRepository = new dependencies.repository.MongoUserRepository();
    this.kafka = new KafkaClient();
  }
  async execute(session, otpEntered) {
    try {
      const awsS3Config = new S3Config();
      console.log("session", session);

      // if (!session) {
      //   const error = new Error();
      //   error.status = 400;
      //   error.message = "Otp Session has Expired";
      //   throw error;
      // }
      const { userId, otp } = session;
      if (!userId || !otp) {
        const error = new Error();
        error.status = 400;
        error.message = "Otp Session has Expired";
        throw error;
      }
      const user = await this.userRepository.findUserById(userId);
      if (user?.isBlocked) {
        const error = new Error();
        error.status = 403;
        error.message = "You are Blocked by the Admin";
        throw error;
      }
      if (otp !== otpEntered) {
        const error = new Error();
        error.status = 400;
        error.message = "OTP is not Matching";
        throw error;
      }
      const updateVerificationStatus = { isVerified: true };
      const verifyUser = await this.userRepository.findByIdUpdate(
        userId,
        updateVerificationStatus
      );
      const userDataToPublish = {
        _id: verifyUser._id,
        isVerified: verifyUser.isVerified,
      };

      this.kafka.produceMessage(TOPIC, {
        type: USER_UPDATED,
        value: JSON.stringify(userDataToPublish),
      });

      let getImageUrl;
      if (verifyUser.profileImg) {
        const getImageFromS3 = await awsS3Config.getImageUrl({
          imgField: "ProfileImg",
          Key: verifyUser?.profileImg,
        });
        getImageUrl = getImageFromS3?.url;
      }

      const data = {
        id: verifyUser._id,
        name: verifyUser.name,
        email: verifyUser.email,
        phone: verifyUser.phone,
        isVerified: true,
        isBlocked: verifyUser.isBlocked,
        profileUrl: getImageUrl ? getImageUrl : "",
      };
      const accessToken = await createAccessToken({
        ...data,
        role: "USER",
      });
      const refreshToken = await createRefreshToken({
        ...data,
        role: "USER",
      });
      return {
        data,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }
}
