export class GetCompanyWalletUseCase{
    constructor(dependencies){
        this.companywallet =  new dependencies.repository.MongoCompanyWalletRepository()
    }
    async execute(){
        try {
            
         return await this.companywallet.getCompanyBalance()
            
        } catch (error) {
            console.error(error)
        }
    }
}