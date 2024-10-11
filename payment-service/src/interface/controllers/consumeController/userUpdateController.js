export class UserUpdateController{
    constructor(dependencies){
        this.userUpdateUseCase = new dependencies.useCase.UserUpdateUseCase(dependencies)
    }
    async updateUser(data){
        try {
           const {_id,...rest} = data
            await this.userUpdateUseCase.execute(_id,rest)
        } catch (error) {
            console.log(error);
            
        }
    }
}