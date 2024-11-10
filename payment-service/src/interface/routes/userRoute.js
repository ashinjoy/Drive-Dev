import express from 'express'
import {AuthHandler} from '../middleware/authMiddleware.js'
import { PaymentController } from '../controllers/userController/paymentController.js'
import { GetTripDetailByIdController } from '../controllers/userController/getTripDetailByIdController.js'
import { GetWalletBalanceController } from '../controllers/userController/getWalletBalanceController.js'
import { AddMoneyToWalletController } from '../controllers/userController/addMoneyToWalletController.js'
import { GetWalletHistoryController } from '../controllers/userController/getWalletHistoryController.js'
import { ConfirmStripePaymentController } from '../controllers/userController/confirmStripePaymentController.js'
import { StripeWebHookController } from '../controllers/userController/stripeWebHookController.js'
import { dependencies } from '../../config/dependencies.js'

const userRouter = express.Router()

const controllers = {
    getTripDetailByIdController: new GetTripDetailByIdController(dependencies),
    addMoneytoWalletController: new AddMoneyToWalletController(dependencies),
    getWalletBalanceController : new GetWalletBalanceController(dependencies),
    getWalletHistoryController: new GetWalletHistoryController(dependencies),
    paymentController:new PaymentController(dependencies),
    confirmStripePayment: new ConfirmStripePaymentController(dependencies),
    stripePaymentController: new StripeWebHookController(dependencies)
}

userRouter.get('/trip-details/:tripId',AuthHandler.isUserLogin,async(req,res,next)=>controllers.getTripDetailByIdController.getTripDetailById(req,res,next))
userRouter.get('/walletbalance/:userId',AuthHandler.isUserLogin,async(req,res,next)=>controllers.getWalletBalanceController.getWalletBalance(req,res,next))
userRouter.post('/wallet-addmoney',AuthHandler.isUserLogin,async(req,res,next)=>controllers.addMoneytoWalletController.addMoney(req,res,next))
userRouter.get('/wallethistory',AuthHandler.isUserLogin,async(req,res,next)=>controllers.getWalletHistoryController.getWalletHistory(req,res,next))
userRouter.post('/payment',AuthHandler.isUserLogin,async(req,res,next)=>controllers.paymentController.payment(req,res,next))
userRouter.post('/stripe/confirmpayment',AuthHandler.isUserLogin,async(req,res,next)=>controllers.confirmStripePayment.confirmPayment(req,res,next))
// userRouter.post('/webhook',async(req,res,next)=>controllers.stripePaymentController.managePaymentEvents(req,res,next))



export default userRouter