export class CompleteProfileController{
    constructor(dependencies){
        this.completeProfileUseCase = new dependencies.useCase.DriverCompleteProfileUseCase(dependencies)
    }
    async completeProfile(req,res,next){
      try {
      const userDetails =   await this.completeProfileUseCase.execute(req.body,req.files)
      res.status(200).json({data:userDetails,message:'You have completed your profile successfully'})
      } catch (error) {
        next(error)
      }
      
    }
}