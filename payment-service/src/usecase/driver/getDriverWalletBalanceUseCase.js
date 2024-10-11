export class GetDriverWalletBalanceUseCase{
    constructor(dependencies){
        this.driverRepository =  new dependencies.repository.MongoDriverRepository()
    }
    async execute(driverId){
        try {
            const getDriver =   await this.driverRepository.findDriverbyId(driverId)
            return  getDriver.walletBalance
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}