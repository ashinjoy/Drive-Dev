import { errorLogger, infologger } from "../../config/winstonConfig.js";
import { KafkaClient } from "../../events/KafkaClient.js";
import { TOPIC, DRIVER_UPDATED } from "../../events/config.js";
export class DriverApprovalUseCase {
  constructor(dependencies) {
    this.driverRepository = new dependencies.repository.MongoDriverRepository();
    this.kafka = new KafkaClient();
  }
  async execute(driverId) {
    try {
      const approveDriver =
        await this.driverRepository.findDriverByIdAndApprove(driverId);
      const dataToPublish = {
        _id: approveDriver._id,
        isAccepted: approveDriver.isAccepted,
      };
      console.log("dataToPublish", dataToPublish);
      infologger.info("dataToPublish", dataToPublish);
      this.kafka.produceMessage(TOPIC, {
        type: DRIVER_UPDATED,
        value: JSON.stringify(dataToPublish),
      });
      return approveDriver;
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }
}
