import { errorLogger } from "../../config/winstonConfig.js";
import { TOPIC, USER_UPDATED } from "../../events/config.js";
import { KafkaClient } from "../../events/KafkaClient.js";

export class UserBlockUnblockUseCase {
  constructor(dependencies) {
    this.userRepository = new dependencies.repository.MongoUserRepository();
    this.kafka = new KafkaClient();
  }
  async execute(userId) {
    try {
      const getuser = await this.userRepository.findUserById(userId);
      const updateUser = await this.userRepository.findByIdUpdate(userId, {
        isBlocked: !getuser.isBlocked,
      });
      const dataToPublish = {
        _id: updateUser._id,
        isBlocked: updateUser.isBlocked,
      };
      this.kafka.produceMessage(TOPIC, {
        type: USER_UPDATED,
        value: JSON.stringify(dataToPublish),
      });

      return updateUser;
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }
}
