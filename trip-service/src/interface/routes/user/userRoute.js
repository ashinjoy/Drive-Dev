import express from 'express'

import {UserCurrentLocationController} from '../../controllers/userController/userCurrentLocationController.js'
import { LocationAutoCompleteController } from '../../controllers/userController/autoCompleteController.js'
import { GetNearByDriversController } from '../../controllers/userController/getNearByDriverController.js'
import { RideRequestController } from '../../controllers/userController/driveRequestController.js'
import { ChangePaymentModeController } from '../../controllers/userController/changePaymentModeController.js'
import { EmergencyAlertController } from '../../controllers/userController/emergencyAlertController.js'
import { CancelRideController } from '../../controllers/userController/cancelRideController.js'
import { ReverseGeoCodeController } from '../../controllers/userController/reverseGeocodeController.js'
import { GetTripHistoryController } from '../../controllers/userController/getTripHistoryController.js'

import { dependencies } from '../../../config/dependencies.js'
import { AuthHandler } from '../../middleware/authMiddleware.js'
const userRouter =  express.Router()


const controllers = {
    getUserCurrentLocationController : new UserCurrentLocationController(dependencies),
    autoCompleteLocationController : new LocationAutoCompleteController(dependencies),
    getNearByDriversController: new GetNearByDriversController(dependencies),
    rideRequestController: new RideRequestController(dependencies),
    changePaymentController: new ChangePaymentModeController(dependencies),
    emergencyAlertController: new EmergencyAlertController(dependencies),
    cancelRideController:new CancelRideController(dependencies),
    reverseGeocodeController: new ReverseGeoCodeController(dependencies),
    getAllTripDetailsController: new GetTripHistoryController (dependencies),


}
userRouter.get('/pickup-location-autocomplete',AuthHandler.isUserLogin,async(req,res,next)=>{controllers.autoCompleteLocationController.autoComplete(req,res,next)})
userRouter.get('/reverse-geocode',async(req,res,next)=>controllers.reverseGeocodeController.reverseGeocode(req,res,next))
userRouter.get('/nearby-drivers',AuthHandler.isUserLogin,async(req,res,next)=>{controllers.getNearByDriversController.getNearByDrivers(req,res,next)})
userRouter.post('/request-ride',AuthHandler.isUserLogin,async(req,res,next)=>{controllers.rideRequestController.requestRide(req,res,next)})
userRouter.post('/location',AuthHandler.isUserLogin,async(req,res,next)=>controllers.getUserCurrentLocationController.getCurrentLocation(req,res,next))
userRouter.post('/cancel-ride',AuthHandler.isUserLogin,async(req,res,next)=>{controllers.cancelRideController.cancelRide(req,res,next)})
userRouter.put('/change-paymentmode',AuthHandler.isUserLogin,async(req,res,next)=>{controllers.changePaymentController.changePaymentMode(req,res,next)})
userRouter.post('/emergency-alert',async(req,res,next)=>{controllers.emergencyAlertController.sendAlert(req,res,next)})
userRouter.get('/trip-details',AuthHandler.isUserLogin,async(req,res,next)=>controllers.getAllTripDetailsController.getTripHistory(req,res,next))


export default userRouter