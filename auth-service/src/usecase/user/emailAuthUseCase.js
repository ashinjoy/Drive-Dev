import sendMail from "../../utils/nodemailer.js";
import generateOTP from "../../utils/generateOtp.js";
import { KafkaClient } from "../../events/KafkaClient.js";
import { TOPIC, USER_CREATED } from "../../events/config.js";
export class EmailAuthUseCase {
  constructor(dependencies) {
    this.userRepository = new dependencies.repository.MongoUserRepository();
    this.kafka = new KafkaClient();
  }
  async execute(email) {
    try {
      const findUserByEmailId = await this.userRepository.findUserByEmail(
        email
      );
      let userId;
      if (!findUserByEmailId) {
        const detailsToStore = {
          name: email.split("@")[0],
          email: email,
          phone: 0,
        };
        const createUserByEmailAuth = await this.userRepository.createUser(
          detailsToStore
        );
        userId = createUserByEmailAuth._id;
        const userDataToPublish = {
          _id: createUserByEmailAuth._id,
          name: createUserByEmailAuth.name,
          email: createUserByEmailAuth.email,
          phone: createUserByEmailAuth.phone,
          authType: createUserByEmailAuth.authType,
          isBlocked: createUserByEmailAuth.isBlocked,
          isVerified: createUserByEmailAuth.isVerified,
          isProfileComplete: createUserByEmailAuth.isProfileComplete,
          createdAt: createUserByEmailAuth.createdAt,
          profileImg: createUserByEmailAuth.profileImg,
        };
        this.kafka.produceMessage(TOPIC, {
          type: USER_CREATED,
          value: JSON.stringify(userDataToPublish),
        });
      } else {
        userId = findUserByEmailId._id;
      }

      const otp = generateOTP();
      await sendMail(otp, email);
      console.log("otp=====", otp);
      return {
        userId,
        otp,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
