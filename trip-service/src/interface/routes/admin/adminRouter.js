import express from 'express'
import { GetAllLatestTripsController } from '../../controllers/adminController/getAllLatestTripController.js'
import { DriverWithMaxTripsController } from '../../controllers/adminController/mostActiveDriversController.js'
import { TotalTripsCompleted } from '../../controllers/adminController/totalTripsCompleted.js'

import { dependencies } from '../../../config/dependencies.js'
import { AuthHandler } from '../../middleware/authMiddleware.js'
const adminRouter =  express.Router()


const controllers = {
getAllLatestTripsController: new GetAllLatestTripsController(dependencies),
driverWithMaxTrips: new DriverWithMaxTripsController(dependencies),
totalCompletedTrips: new TotalTripsCompleted(dependencies)
}
adminRouter.get('/latest-trips',AuthHandler.isAdminLogin,async(req,res,next)=>controllers.getAllLatestTripsController.latestTrips(req,res,next))
adminRouter.get('/most-active-drivers',async(req,res,next)=>controllers.driverWithMaxTrips.mostActiveDrivers(req,res,next))
adminRouter.get('/total-trips-completed',async(req,res,next)=>controllers.totalCompletedTrips.totalTrips(req,res,next))







export default adminRouter