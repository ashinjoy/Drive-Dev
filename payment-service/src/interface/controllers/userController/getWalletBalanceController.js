export class GetWalletBalanceController{
    constructor(dependencies){
        this.getWalletBalanceUseCase = new dependencies.useCase.GetWalletBalanceUseCase(dependencies)
    }
    async getWalletBalance(req,res,next){
        try {
            const {userId} = req.params
            if(!userId){
                const error = new Error()
                error.message = 'Bad request'
                error.status = 400
                throw error
            }
            const getBalance = await this.getWalletBalanceUseCase.execute(userId)
            res.status(201).json({balance:getBalance})
        } catch (error) {
            console.error(error)
            next(error)
        }
    }
}