export class GetMessageController{
    constructor(dependencies){
        this.getMessageUseCase = new dependencies.useCase.GetMessageUseCase(dependencies)
    }
    async getMessage(req,res,next){
        try {
            const {tripId} = req.params
            if(!tripId){
                const error = new Error()
                error.message = 'Bad Request'
                error.status = 400
                throw error
            }
          const messageData =   await this.getMessageUseCase.execute(tripId)
          console.log('messsageData',messageData);
          res.status(201).json({messages:messageData?.messages,userName:messageData?.userName,driverName:messageData?.driverName})
        } catch (error) {
            console.error(error)
            next(error)
        }
    }
}