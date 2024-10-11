export class GetUserWalletHistoryUseCase{
    constructor(dependencies){
        this.walletRepository = new dependencies.repository.MongoWalletRepository()
    }
    async execute(userId,page){
        try {
          const getAllTransactions =   await this.walletRepository.getUsersTransaction(userId,page)
          const getDocsCount = await this.walletRepository.TotalWalletTransactionCount(userId)
          return {
            getAllTransactions,
            getDocsCount
          }
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}