export class DriverProfileUpdateController{
    constructor(dependencies){
        this.driverProfileUpdateUseCase = new dependencies.useCase.DriverProfileUpdateUseCase(dependencies)
    }
    async updateProfile(req,res,next){
        try {
       const profileUpdate = await this.driverProfileUpdateUseCase.execute(req.body,req.files)
       console.log('profileupdatdede',profileUpdate);
       res.status(200).json({driverData:profileUpdate,message:'Profile request send'})
        } catch (error) {
            console.error(error);
            next(error)
        }
    }
}