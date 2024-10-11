export class GetWalletHistoryController{
    constructor(dependencies){
this.getUserWalletHistoryUseCase = new dependencies.useCase.GetUserWalletHistoryUseCase(dependencies)
    }
    async getWalletHistory(req,res,next){
        try {
            const {userId,page} = req.query
            if(!userId){
                const error = new Error()
                error.message = 'Bad Request'
                error.status = 400
                throw error
            }
         const getHistory = await this.getUserWalletHistoryUseCase.execute(userId,page)
         res.status(201).json({getHistory:getHistory?.getAllTransactions,totalDocs:getHistory?.getDocsCount})
        } catch (error) {
            console.error(error)
            next(error)
        }
    }
}