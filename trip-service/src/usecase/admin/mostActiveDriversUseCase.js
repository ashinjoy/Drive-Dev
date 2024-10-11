export class MostActiveDriverUseCase{
    constructor(dependencies){
        this.tripRepository = new dependencies.repository.MongoTripRepository()
    }
    async execute(){
        try {
            return  await this.tripRepository.highActiveDrivers()
         } catch (error) {
             console.error(error)
         }
             }
    }
    