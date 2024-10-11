export class DriverUpdatedConsumeController{
    constructor(dependencies){
        console.log(dependencies.useCase.DriverUpdateConsumerUseCase);
this.driverUpdatedUseCase = new dependencies.useCase.DriverUpdateConsumerUseCase(dependencies)
    }
    async driverUpdatedConsumer(data){
        try {
            const {_id,...rest} = data
            await this.driverUpdatedUseCase.execute(_id,rest)
        } catch (error) {
            console.error(error);
            
        }
    }
    
}