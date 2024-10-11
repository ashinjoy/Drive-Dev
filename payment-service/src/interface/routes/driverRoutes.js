import express from 'express'
import {AuthHandler} from '../middleware/authMiddleware.js'

import { GetDriverWalletBalanceController } from '../controllers/driver/getDriverBalanceController.js'

import { GetDriverWalletDetailsController } from '../controllers/driver/getDriverWalletDetailsController.js'

import { dependencies } from '../../config/dependencies.js'

const driverRouter = express.Router()

const controllers = {

    getDriverWalletBalanceController: new GetDriverWalletBalanceController(dependencies),
    getDriverWalletDetailsController: new GetDriverWalletDetailsController(dependencies),

}

driverRouter.get('/walletbalance/:driverId',AuthHandler.isDriverLogin,async(req,res,next)=>controllers.getDriverWalletBalanceController.getDriverBalance(req,res,next))
driverRouter.get(`/walletdetails`,AuthHandler.isDriverLogin,async(req,res,next)=>controllers.getDriverWalletDetailsController.getDriverWalletDetails(req,res,next))




export default driverRouter