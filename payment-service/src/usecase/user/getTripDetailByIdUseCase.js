export class GetTripDetailByIdUseCase{
    constructor(dependencies){
    this.tripRepository = new dependencies.repository.MongoTripRepository()
    }
    async execute(id){
        try {
        return  await this.tripRepository.findTripById(id)
        } catch (error) {
            console.error(error);
            throw error
            
        }
    }
}