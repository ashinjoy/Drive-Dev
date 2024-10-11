export class UpdateUserDataController {
    constructor(dependencies){
        this.updateUserProfile = new dependencies.useCase.UpdateUserDataUseCase(dependencies)
    }
    async updateUserDetails(req,res,next){
        try {
            console.log(req.body,req.file)
         const updateUserProfile = await this.updateUserProfile.execute(req.body,req.file)
         res.status(201).json({data:updateUserProfile,message:'User Profile updated SuccessFully'})
        } catch (error) {
            console.error(error)
            next(error)
        }
    }
}