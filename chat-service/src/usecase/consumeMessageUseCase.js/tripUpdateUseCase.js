export class TripUpdateUseCase{
    constructor(dependencies){
        this.tripRepository = new dependencies.repository.MongoTripRepository()
    }
    async execute(id,data){
        try {
            // console.log('user Updated UseCase');
            // console.log('userid',id,data);
       const result =   await  this.tripRepository.findTripByIdAndUpdate(id,data)
        } catch (error) {
            console.log(error);
            
        }
    
    }
}