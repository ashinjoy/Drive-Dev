export class GetMessageController{
    constructor(dependencies){
        this.getMessageUseCase = new dependencies.useCase.GetMessageUseCase(dependencies)
    }
    async getMessage(req,res,next){
        try {
            const {userId} = req.params
            if(!userId){
                const error = new Error()
                error.message = 'Bad Request'
                error.status = 400
                throw error
            }
          const messages =   await this.getMessageUseCase.execute(userId)
          res.status(201).json({messages})
        } catch (error) {
            console.error(error)
            next(error)
        }
    }
}