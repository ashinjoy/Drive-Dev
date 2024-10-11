export class NewlyEnrolledUserController{
    constructor(dependencies){
        this.newlyEnrolledUserUseCase = new dependencies.useCase.NewlyEnrolledUserUseCase(dependencies)
    }
    async newlyEnrolledUsers(req,res,next){
        try {
            const {filter} = req.params
            if(!filter){
                const error = new Error() 
                error.message = "Bad Request"
                error.status = 400
            }
          const getNewUsersReport = await this.newlyEnrolledUserUseCase.execute(filter)
          res.status(201).json({usersData:getNewUsersReport})
        } catch (error) {
            console.error(error);
            next(error)
            
        }
    }
}