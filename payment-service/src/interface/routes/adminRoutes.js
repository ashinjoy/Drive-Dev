import express from 'express'
import {AuthHandler} from '../middleware/authMiddleware.js'

import { GetCompanyWalletBalanceController } from '../controllers/admin/companyBalanceController.js'
import { TripReportController } from '../controllers/admin/TripReportController.js'
import { DownloadReportController } from '../controllers/admin/downloadReportController.js'
import { dependencies } from '../../config/dependencies.js'

const adminRouter = express.Router()

const controllers = {
    companyBalance: new GetCompanyWalletBalanceController(dependencies),
    tripReportController : new TripReportController(dependencies),
    downloadReportController:new DownloadReportController(dependencies)


}

adminRouter.get('/balance', async(req,res,next)=>controllers.companyBalance.getComapanyWalletBalance(req,res,next))
adminRouter.get('/trip-report/:filter',AuthHandler.isAdminLogin,async(req,res,next)=>controllers.tripReportController.tripReport(req,res,next))
adminRouter.post('/download-report',async(req,res,next)=>controllers.downloadReportController.downloadReport(req,res,next))




export default adminRouter