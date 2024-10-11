export class DriverUpdateConsumerUseCase{
    constructor(dependencies){
        this.driverRepository = new dependencies.repository.MongoDriverRepository()
    }
    async execute(id,data){
        try {
            await this.driverRepository.findDriverByIdAndUpdate(id,data)
        } catch (error) {
            console.error(error);
            
        }
    }
}