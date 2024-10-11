export class DriverCreatedConsumeController{
    constructor(dependencies){
this.driverCreatedUseCase = new dependencies.useCase.DriverCreatedConsumerUseCase(dependencies)
    }
    async driverCreatedConsumer(data){
        try {
           const id = data?._id
           const dataToUpdate = {
            name:data?.name,
            email:data?.email,
            phone:data?.email,
           }
            await this.driverCreatedUseCase.execute(data)
        } catch (error) {
            console.error(error);
            
        }
    }
    
}