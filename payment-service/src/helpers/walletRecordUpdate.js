import {
  MongoCompanyWalletRepository,
  MongoWalletRepository,
  MongoUserRepository,
  MongoDriverRepository,
} from "../interface/repository/index.js";
export class WalletRecordUpates {
  constructor() {
    this.walletRepository = new MongoWalletRepository();
    this.companyWalletRepository = new MongoCompanyWalletRepository();
    this.userRepository = new MongoUserRepository();
    this.driverRepository = new MongoDriverRepository();
  }
  async UpdateWallets(fare, driverId,tripId,paymentMethod,userId='') {
    try {
      const driversCommisionRate = 0.8;
      const companyCommisonRate = 0.2;
      const parsedFare = parseInt(fare)
      const driversCommision = parseFloat(fare) * driversCommisionRate;
      const companyCommision = parseFloat(fare) * companyCommisonRate;
      const driverWalletHistoryPromise = this.walletRepository.createWallet({
        driverId: driverId,
        tripId: tripId,
        amount: driversCommision,
        description: "Earnings credited for completing Trip ",
        type: "credit",
      });

      const driverBalanceUpdatePromise =
        this.driverRepository.updateWalletBalance(driverId, {
          walletBalance: driversCommision,
        });

      const companyWalletUpdatePromise =
        this.companyWalletRepository.findCompanyWalletUpdate(
          { balance: companyCommision },
          {
            transactions: {
              tripId: tripId,
              transactionType: "credit",
              description: "Commission earned from Trip",
            },
          }
        );
        
        let deductUserWalletBalance,userWalletHistory
        if(paymentMethod == 'Wallet'){
           const deductUserWalletPromise =  this.userRepository.deductWalletBalance(userId,{walletBalance:-parsedFare})
           console.log('de',deductUserWalletPromise);
           
           const userWalletHistoryPromise =  this.walletRepository.createWallet({
                userId:userId,
                tripId:tripId,
                amount:fare,
                description:"Money Paid for trip",
                type:"debit"
            })

             
             const result = await Promise.all([deductUserWalletPromise,userWalletHistoryPromise])


        }

      const [driverWalletHistory, driverBalanceUpdate, companyWalletUpdate] =
        await Promise.all([
          driverWalletHistoryPromise,
          driverBalanceUpdatePromise,
          companyWalletUpdatePromise,
        ]);

      return {
        driverWalletHistory,
        driverBalanceUpdate,
        companyWalletUpdate,
        deductUserWalletBalance,
        userWalletHistory 
      };
    } catch (error) {
      console.error(error);
      throw error
    }
  }
}
