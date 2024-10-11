import { paymentModel } from "../../database/schema/paymentSchema/paymentSchema.js";
export class PaymentRepository {
  constructor() {}
  async createPayment(data) {
    try {
      const payment = await paymentModel.create({
        tripId: data?.tripId,
        userId: data?.userId,
        fare: data?.fare,
        paymentMethod: data?.paymentMethod,
        paymentStatus: "paid",
      });
    } catch (error) {
      console.error(error);
      throw error
    }
  }
  async findTripAndUpdate(id, data) {
    try {
    return await paymentModel.findOneAndUpdate({ tripId: id }, { $set: data },{new:true}).lean()
    } catch (error) {
      console.error(error);
      throw error
      
    }
  }
}
