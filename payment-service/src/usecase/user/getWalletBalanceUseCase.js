export class GetWalletBalanceUseCase{
    constructor(dependencies){
        this.userRepository = new dependencies.repository.MongoUserRepository()
    }
    async execute(userId){
        try {
        const getUserDetails =   await this.userRepository.findUserById(userId)
        return getUserDetails?.walletBalance
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}