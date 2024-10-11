import { tripModel } from "../../database/schema/tripSchema/tripSchema.js";
export class TripRepository {
  constructor() {}
  async createTrip(data) {
    return await tripModel.create(data);
  }
  async findTripById(id) {
    try {
    return await tripModel.findById({ _id: id }).populate('userId').populate('driverId')
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  async findTripByIdAndUpdate(id, data) {
    return await tripModel.findByIdAndUpdate({ _id: id }, { $set: data },{new:true}).populate('driverId')
    
  }
  async findTripByIdAndReject(tripId, status) { 
    return await tripModel.findByIdAndUpdate(
      { _id:tripId  },
      { $set: { requestStatus: status }, $push: { rejectedDrivers: driverId } }
    );
  }

  async findAllTrips(userID){
    return await tripModel.find({userId:userID}).populate('driverId').populate('userId')
  }

  async tripSalesReport(dateRanges){
    const facetObj = {}
    dateRanges.forEach((element)=>{
      const key = element.label;
      facetObj[key] = [
        {
          $match: {
            tripStatus: "completed",
            createdAt: {
              $gte: element.startTime,
              $lte: element.endTime,
            },
          },
        },
        {
          $group:{
            _id:null,
            totalAmountFromTrips:{$sum:'$fare'}
          }
        },
      ];
    })
    return await tripModel.aggregate([{
      $facet:facetObj
    }])
   
  }
  async getTripReport(startDate,endDate){
    console.log(startDate,endDate);
    
    const data= await tripModel.aggregate([{
      $match: {
        tripStatus: "completed",
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      $group:{
        _id:{$dateToString:{format:"%Y-%m-%d",date:'$createdAt'}},
        totalAmount:{$sum:'$fare'}
      }
    }
  ])
  return data
  
  
  
  }
}
