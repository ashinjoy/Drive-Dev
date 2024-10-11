import { emitEvent } from "../../utils/socket.js";

export class TripUpdateConsumerUseCase{
    constructor(dependencies){
        this.tripRepository = new dependencies.repository.MongoTripRepository()
    }
    async execute(id,data,driverId){
        try {
            console.log('data',id,data,driverId);
            
            await this.tripRepository.findTripByIdAndUpdate(id,data)
            emitEvent('payment-update',data,driverId)
        } catch (error) {
            console.error(error);
        }
    }
}