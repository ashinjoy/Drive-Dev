import { companyWalletModel } from "../../database/schema/CompanySchema/CompanyWalletSchema.js"
export class CompanyWalletRepository{
    constructor(){}
    async findCompanyWalletUpdate(balance,transactions){
        console.log("updateeouhhibb",balance,transactions);
        
        return await companyWalletModel.findByIdAndUpdate({_id:'company_wallet'},{$inc:balance,$push:transactions})
    }
    async createComapnyWallet(){
        return await companyWalletModel.create({
            _id:'company_wallet'
        })
    }
    async getCompanyBalance(){
        return await companyWalletModel.findById({_id:'company_wallet'},{balance:1})
    }
}