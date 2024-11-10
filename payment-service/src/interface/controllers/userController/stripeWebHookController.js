export class StripeWebHookController{
    constructor(dependencies){
        this.confirmPaymentUseCase = new dependencies.useCase.ConfirmStripePaymentUseCase(dependencies)
    }
    async managePaymentEvents(req,res,next){
        try {
            const event = req.body
            console.log(event);
            
            switch(event.type){
                case 'payment_intent.succeeded':
                    const paymentIntent = event.data.object;
                    console.log('paymet sucess');
                default:
                    console.log('error in payment'); 
            }
            res.status(200).json({received: true})
        } catch (error) {
            console.error(error);
            next(error)
            
        }
    }
}