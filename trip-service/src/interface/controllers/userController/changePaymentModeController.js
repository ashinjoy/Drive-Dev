export class ChangePaymentModeController{
    constructor(dependencies){
this.changePaymentUseCase = new dependencies.useCase.ChangePaymentUseCase(dependencies)
    }
    async changePaymentMode(req,res,next){
        try {
            const {tripId,paymentMethod} = req.body
            console.log("paymentMethid",paymentMethod);
            
          const changePaymentMode = await this.changePaymentUseCase.execute(tripId,paymentMethod)
          res.status(200).json({message:"payment Mode Changed"})
        } catch (error) {
            console.error(error)
        }
    }
}