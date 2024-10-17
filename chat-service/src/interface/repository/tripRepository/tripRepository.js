import { tripModel } from "../../database/schema/tripSchema/tripSchema.js";
export class TripRepository {
  constructor() {}
  async createTrip(data) {
    return await tripModel.create(data);
  }
  async findTrip(id) {
    return await tripModel.findById({ _id: id }).populate('userId')
  }
  async findTripByIdAndUpdate(id, data) {
    // console.log('inside repo',id,data);
    
    const upadateddata =  await tripModel.findByIdAndUpdate({ _id: id }, { $set: data },{new:true}).populate('driverId')
    // console.log("dataaaaaaaaaaaaaa",upadateddata);
    
    return upadateddata
  }
  async findTripByIdAndReject(tripId, status) { 
    return await tripModel.findByIdAndUpdate(
      { _id:tripId  },
      { $set: { requestStatus: status }, $push: { rejectedDrivers: driverId } }
    );
  }

  async getChatNames(tripId){
    try {
    return  await tripModel.findById(tripId).populate({path:'userId',select:'name'}).populate({path:'driverId',select:'name'})
    } catch (error) {
      console.error(error);
      
    }
    
  }


}
