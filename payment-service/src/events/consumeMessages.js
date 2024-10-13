import { dependencies } from "../config/dependencies.js"
import { UserCreatedConsumeController } from "../interface/controllers/consumeController/userCreatedController.js"
import { UserUpdateController } from "../interface/controllers/consumeController/userUpdateController.js"
import { DriverCreatedConsumeController } from "../interface/controllers/consumeController/driverCreatedController.js"
import { DriverUpdatedConsumeController } from "../interface/controllers/consumeController/driveUpdatedController.js"
import {TripCreateConsumerController} from '../interface/controllers/consumeController/tripCreatedController.js'
import { TripUpdateConsumerController } from "../interface/controllers/consumeController/tripUpdateController.js"
import { CreatePaymentController } from "../interface/controllers/consumeController/createPaymentController.js"
// import { UpdatePaymentModecontroller } from "../interface/controllers/paymentController/updatePaymentController.js"


export class consumeManager{
    constructor(){
        this.consumeUserCreatedController = new UserCreatedConsumeController(dependencies)
        this.consumeUpdateUserController = new UserUpdateController(dependencies)
        this.consumeDriverCreatedController = new DriverCreatedConsumeController(dependencies)
        this.consumeDriverUpdatedController = new DriverUpdatedConsumeController(dependencies)
        this.consumeTripCreateController = new TripCreateConsumerController(dependencies)
        this.consumeTripUpdateController = new TripUpdateConsumerController(dependencies)
        this.createPaymentController = new CreatePaymentController(dependencies)
        // this.updatePaymentModecontroller = new UpdatePaymentModecontroller(dependencies)

    }
    async consumer({type,value}){
        try {
            console.log('entry');
            const data = JSON.parse(value)
            console.log('value',data);
            
            switch(type){
                case 'USER_CREATED' : 
                await this.consumeUserCreatedController.createUser(data)
                break
                case 'USER_UPDATED' :
                    await this.consumeUpdateUserController.updateUser(data)
                    break
                case 'DRIVER_CREATED':
                    await this.consumeDriverCreatedController.driverCreatedConsumer(data)
                    break
                case 'DRIVER_UPDATED':
                        await this.consumeDriverUpdatedController.driverUpdatedConsumer(data)
                        break
                case 'TRIP_CREATED':
                         await this.consumeTripCreateController.createTrip(data)    
                          break   
                case 'TRIP_UPDATED':
                       await this.consumeTripUpdateController.updateTrip(data)
                         break        
                case 'PAYMENT_MODE_UPDATED':
                 const tripUpated = await this.consumeTripUpdateController.updateTrip(data)
                 
            
                 break
                                      
                default:
                    const error = new Error('No Type mentioned')
            }
        } catch (error) {
            console.error(error);
            
        }
    }
}