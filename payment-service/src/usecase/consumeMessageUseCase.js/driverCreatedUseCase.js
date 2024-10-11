export class DriverCreatedConsumerUseCase{
    constructor(dependencies){
        this.driverRepository = new dependencies.repository.MongoDriverRepository()
    }
    async execute(data){
        try {
            await this.driverRepository.createDriver(data)
        } catch (error) {
            console.error(error);
            
        }
    }
}