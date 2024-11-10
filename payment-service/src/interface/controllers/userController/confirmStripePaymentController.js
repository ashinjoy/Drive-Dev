import { retrieveSessionData } from "../../../utils/stripeSession.js";

export class ConfirmStripePaymentController{
    constructor(dependencies){
        this.confirmStripePaymentUseCase = new dependencies.useCase.ConfirmStripePaymentUseCase(dependencies)
        
    }
    async confirmPayment(req,res,next){
        try {
            console.log('request',req.body);
            
            const {userId,tripId,driverId, paymentMethod, fare,sessionId } = req.body
        if(!userId || !tripId || !driverId || !paymentMethod || !fare ||!sessionId){
            const error = new Error()
            error.status = 400
            error.message = "Bad Request"
            throw error
        }
      const stripeSession =   await retrieveSessionData(sessionId)
      if(stripeSession.payment_status === "paid"){
        await this.confirmStripePaymentUseCase.execute(userId,tripId,driverId,paymentMethod,fare)
        res.status(201).json({success:true,paymentStatus:"paid"})
      }else{
        // await this.cancelPaymentUseCase.execute(userId)
        console.log('canceled');
        
      }
      
        } catch (error) {
            console.error(error);
            next(error)
        }
        

    }
}