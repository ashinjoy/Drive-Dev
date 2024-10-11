export class UserCreatedConsumeController{
      constructor(dependencies){
        
        
        this.userUseCase = new dependencies.useCase.UserCreatedConsumerUseCase(dependencies)
    }
    async createUser(data){
        try {
            console.log('cretaeUsesr');
           await this.userUseCase.execute(data)
        } catch (error) {
            console.error(error);
        }
    }
}