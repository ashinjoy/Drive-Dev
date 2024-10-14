export class ReviewRatingController{
    constructor(dependencies){
        this.reviewUseCase = new dependencies.useCase.ReviewRatingUseCase(dependencies)
    }
    async ReviewRatingController(req,res,next){
        try {
         await this.reviewUseCase.execute(req.body)
         res.status(200).json({success:true,message:'review sucess'})
        } catch (error) {
            console.error(error);
            next(error)
        }
    }
}