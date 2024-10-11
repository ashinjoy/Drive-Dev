import express from 'express'
import {AuthHandler} from '../middleware/authMiddleware.js'
import { PaymentController } from '../controllers/userController/paymentController.js'

import { WalletController } from '../controllers/paymentController/walletController.js'
import { GetWalletHistoryController } from '../controllers/userController/getWalletHistoryController.js'
import { GetDriverWalletBalanceController } from '../controllers/driver/getDriverBalanceController.js'

import { GetDriverWalletDetailsController } from '../controllers/paymentController/getDriverWalletDetailsController.js'
import { GetCompanyWalletBalanceController } from '../controllers/admin/companyBalanceController.js'
import { TripReportController } from '../controllers/paymentController/TripReportController.js'
import { DownloadReportController } from '../controllers/paymentController/downloadReportController.js'
import { dependencies } from '../../config/dependencies.js'

const paymentRouter = express.Router()

const controllers = {

    walletController: new WalletController(dependencies),

    getDriverWalletBalanceController: new GetDriverWalletBalanceController(dependencies),
    getWalletHistoryController: new GetWalletHistoryController(dependencies),
    getDriverWalletDetailsController: new GetDriverWalletDetailsController(dependencies),
    paymentController:new PaymentController(dependencies),



}


paymentRouter.post('/wallet',AuthHandler.isUserLogin,async(req,res,next)=>controllers.walletController.walletPayment(req,res,next))
paymentRouter.get('/user/get-walletbalance/:userId',AuthHandler.isUserLogin,async(req,res,next)=>controllers.getWalletBalanceController.getWalletBalance(req,res,next))
paymentRouter.get('/driver/walletbalance/:driverId',AuthHandler.isDriverLogin,async(req,res,next)=>controllers.getDriverWalletBalanceController.getDriverBalance(req,res,next))

paymentRouter.get(`/driver/walletdetails`,AuthHandler.isDriverLogin,async(req,res,next)=>controllers.getDriverWalletDetailsController.getDriverWalletDetails(req,res,next))



paymentRouter.get('/user/wallethistory',AuthHandler.isUserLogin,async(req,res,next)=>controllers.getWalletHistoryController.getWalletHistory(req,res,next))
paymentRouter.post('/payment',AuthHandler.isUserLogin,async(req,res,next)=>controllers.paymentController.payment(req,res,next))
paymentRouter.get('/admin/balance', async(req,res,next)=>controllers.companyBalance.getComapanyWalletBalance(req,res,next))
paymentRouter.get('/admin/trip-report/:filter',async(req,res,next)=>controllers.tripReportController.tripReport(req,res,next))
paymentRouter.post('/admin/download-report',async(req,res,next)=>controllers.downloadReportController.downloadReport(req,res,next))




export default paymentRouter