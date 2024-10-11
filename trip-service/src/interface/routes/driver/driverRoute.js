import express from 'express'

import { GetDriverOnlineController } from '../../controllers/driverController/getOnlineController.js'
import { AcceptRideController } from '../../controllers/driverController/acceptRideController.js'
import { RejectRideController } from '../../controllers/driverController/rejectRideController.js'
import { StartRideController } from '../../controllers/driverController/startRideController.js'
import { RideCompleteController } from '../../controllers/driverController/rideCompleteController.js'
import { GetDriverOfflineController } from '../../controllers/driverController/getOfflineController.js'
import { TripCountController } from '../../controllers/driverController/tripCountController.js'
import { TopTripsController } from '../../controllers/driverController/topTripsController.js'
import { CompletedTripsCountController } from '../../controllers/driverController/getCompletedTripsCount.js'
import { GetLatestTripsController  } from '../../controllers/driverController/getLatestTripsController.js'
import { dependencies } from '../../../config/dependencies.js'
import { AuthHandler } from '../../middleware/authMiddleware.js'

const driverRouter =  express.Router()


const controllers = {
   getOnlineController: new GetDriverOnlineController(dependencies),
   getOfflineController: new GetDriverOfflineController(dependencies),
   rideAcceptController: new AcceptRideController(dependencies),
   rideRejectController: new RejectRideController(dependencies),
   startRideController:new StartRideController(dependencies),
   rideCompleteController : new RideCompleteController(dependencies),
   tripCountController : new TripCountController(dependencies),
   topTripsController:new TopTripsController(dependencies),
   getCompletedTripsCount : new CompletedTripsCountController(dependencies) ,
   getLatestTripsController: new GetLatestTripsController(dependencies)
}

driverRouter.put('/online',AuthHandler.isDriverLogin,async(req,res,next)=>{controllers.getOnlineController.getOnline(req,res,next)})
driverRouter.put('/offline',AuthHandler.isDriverLogin,async(req,res,next)=>{controllers.getOfflineController.getOffline(req,res,next)})
driverRouter.post('/accept-ride',AuthHandler.isDriverLogin,async(req,res,next)=>{controllers.rideAcceptController.acceptRide(req,res,next)})
driverRouter.post('/reject-ride',AuthHandler.isDriverLogin,async(req,res,next)=>{controllers.rideRejectController.rejectRide(req,res,next)})
driverRouter.post('/start-ride',AuthHandler.isDriverLogin,async(req,res,next)=>{controllers.startRideController.startRide(req,res,next)})
driverRouter.post('/complete-ride',AuthHandler.isDriverLogin,async(req,res,next)=>{controllers.rideCompleteController.completeRide(req,res,next)})
driverRouter.get('/tripcount',AuthHandler.isDriverLogin,async(req,res,next)=>controllers.tripCountController.tripCount(req,res,next))
driverRouter.get('/top-trips/:driverId',AuthHandler.isDriverLogin,async(req,res,next)=>controllers.topTripsController.topTrips(req,res,next))
driverRouter.get('/completedtrip-count/:driverId',AuthHandler.isDriverLogin,async(req,res,next)=>controllers.getCompletedTripsCount.getCompletedTripsCount(req,res,next))
driverRouter.get('/latest-trips/:driverId',AuthHandler.isDriverLogin,async(req,res,next)=>controllers.getLatestTripsController.latestTrips(req,res,next))


export default driverRouter