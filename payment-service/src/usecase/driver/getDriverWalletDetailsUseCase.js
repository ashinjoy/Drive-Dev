export class GetDriverWalletDetailsUseCase{
    constructor(dependencies){
        this.walletRepository = new dependencies.repository.MongoWalletRepository()
        this.driverRepository = new dependencies.repository.MongoDriverRepository()
    }
    async execute(driverId,page){
        try {

            const getDriverPromise =  this.driverRepository.findDriverbyId(driverId)
            const getDriverWalletHistoryPromie = this.walletRepository.getAllWalletsByDriverId(driverId,page)
            const [getDriver,getDriverWalletHistory] = await Promise.all([getDriverPromise,getDriverWalletHistoryPromie])
            const getTotalDocs = await this.walletRepository.TotalWalletTransactionCountDriver(driverId)
            return {
                driverWalletBalance:getDriver?.walletBalance,
                getDriverWalletHistory,
                getTotalDocs
            }
            
        } catch (error) {
            console.error(error);
            throw error
        }
    }
}