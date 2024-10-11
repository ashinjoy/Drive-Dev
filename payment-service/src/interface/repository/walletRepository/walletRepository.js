import {walletModel} from '../../database/schema/walletSchema/walletSchema.js'
export class WalletRepository{
    constructor(){}
    async createWallet(data){
        try {
       return await walletModel.create(data)
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async getUsersTransaction(id,page){
        return await walletModel.find({userId:id}).skip((page-1)*10).limit(10).sort({createdAt:-1})
    }
    async TotalWalletTransactionCount(id){
        return await walletModel.countDocuments({userId:id})
    }
    async getAllWalletsByDriverId(id,page){
        return await walletModel.find({driverId:id}).skip((page-1)*10).limit(10).sort({createdAt:-1})
    }

    async TotalWalletTransactionCountDriver(id){
        return await walletModel.countDocuments({driverId:id})

    }
}