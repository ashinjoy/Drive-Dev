import { Kafka } from "kafkajs";
import { errorLogger } from "../config/winstonConfig.js";
export class KafkaClient {
  constructor() {
    this.kafka = new Kafka({
      clientId: "auth-service",
      brokers: [
        // "kafka-0.kafka-service.kafka.svc.cluster.local:9092",
        // "kafka-1.kafka-service.kafka.svc.cluster.local:9092",
        // "kafka-2.kafka-service.kafka.svc.cluster.local:9092"
        "127.0.0.1:9092",
      ],
    });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: "auth-service" });
  }
  async produceMessage(topic, messages) {
    try {
      await this.producer.connect();
      await this.producer.send({
        topic: topic,
        messages: [
          {
            value: JSON.stringify(messages),
          },
        ],
      });
      await this.producer.disconnect();
    } catch (error) {
      // console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }

  async consumeMessages(topic) {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe({ topic: topic, fromBeginning: true });
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          // console.log({
          //   value: message.value.toString(),
          //   topic: topic,
          //   partition: partition,
          // });
        },
      });
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }
}
