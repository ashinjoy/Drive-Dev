import { Kafka } from "kafkajs";
import { consumeManager } from "./consumeMessages.js";
export class KafkaClient {
  constructor() {
    this.kafka = new Kafka({
      clientId: "chat-service",
      brokers: [
        // "kafka-0.kafka-service.kafka.svc.cluster.local:9092",
        // "kafka-1.kafka-service.kafka.svc.cluster.local:9092",
        // "kafka-2.kafka-service.kafka.svc.cluster.local:9092"
        "127.0.0.1:9092"
      ],
    });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: "chat-service" });
    this.manager = new consumeManager()
  }
  async produceMessage(topic,messages) {
    try {
      await this.producer.connect();
      console.log('connected to cluster');
      
      await this.producer.send({
        topic: topic,
        messages: [ 
            {
                value: JSON.stringify(messages)
            }
        ],
      });
      await this.producer.disconnect()
    } catch (error) {
      console.error(error);
    }
  }

  async consumeMessages(topics){
    try {
      console.log('entry');
      
      console.log(topics);
      if(!topics || !topics?.length > 0 ){
        throw new Error('Cannot Connect To Topic')
      }
        await this.consumer.connect()
        // console.log('connected to kafka cluster succe======================>')
        await this.consumer.subscribe({ topics: topics, fromBeginning: true })
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
              const data = JSON.parse(message?.value?.toString())
              // console.log(data); 
              await this.manager.consumer(data)
            }, 
          })
    } catch (error) {
      console.log('In error');
      console.error(error);
    }
  }
}
