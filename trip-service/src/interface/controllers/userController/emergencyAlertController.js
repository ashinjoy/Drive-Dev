export class EmergencyAlertController{
    constructor(dependencies){
        this.emergencyAlertUseCase = new dependencies.useCase.EmergencyAlertUseCase(dependencies)
        console.log("depdendencies",this.emergencyAlertUseCase);
        
    }
    async sendAlert(req,res,next){
        try {
            console.log(req.body);
            
          const sendEmergencyAlertSMS  =  await this.emergencyAlertUseCase.execute(req.body)
          res.status(200).json({message:"Alert Send SuccessFully"})
        } catch (error) {
            console.error(error);
        }
    }
}