import { hash } from "../../utils/hash.js";
import sendMail from "../../utils/nodemailer.js";
import { KafkaClient } from "../../events/KafkaClient.js";
import { DRIVER_CREATED,TOPIC } from "../../events/config.js";


export class DriverRegisterUseCase {
  constructor(dependencies) {
    this.driverRepository = new dependencies.repository.MongoDriverRepository(
      dependencies
    );
    this.kafka = new KafkaClient()
  }
  async execute(registerDetails) {
    try {
      const { name, email, phone, password } = registerDetails;
      if (name && email && phone && password) {

        const findUserByEmail = await this.driverRepository.findDriverByEmail(email);

        const findUserByPhone = await this.driverRepository.findDriverByPhone(phone)

        if (!findUserByEmail && !findUserByPhone) {
        
          const hashedPassword = await hash(password);
          const otp = Math.floor(1000 + Math.random() * 9000).toString()
          console.log('Driver--OTP',otp);
          await sendMail(otp, email);
          const dataToInsert = {
            name,
            email,
            phone,
            password: hashedPassword,
            license_Number: "nill",
            license_Img: "nill",
            vehicleDetails: {
              vehicle_type: "nill",
              rc_Number: "nill",
              permit: "nill",
            },
            wallet: 0,
          };
          const createUser = await this.driverRepository.createDriver(dataToInsert);
          const dataToPublish = {
            _id:createUser._id,
            name:createUser.name,
            email:createUser.email,
            phone:createUser.phone,
            license_Number:createUser.license_Number,
            license_Img:createUser.license_Img,
            vehicleDetails:{
              vehicle_type:createUser?.vehicleDetails?.vehicle_type,
              rc_Number:createUser?.vehicleDetails?.rc_Number,
              permit:createUser?.vehicleDetails?.permit,
              _id:createUser?.vehicleDetails?._id
            },
            wallet:createUser.wallet,
            isBlocked:createUser.isBlocked,
            isVerified:createUser.isVerified,
            isProfileComplete:createUser.isProfileComplete,
            isAccepted:createUser.isAccepted,
            editRequest:createUser.editRequest
          }
          this.kafka.produceMessage(TOPIC,{
            type:DRIVER_CREATED,
            value:JSON.stringify(dataToPublish)
          })
          return {
            userId: createUser._id,
            otp
          };
        }
        
        else {
          const error = new Error();
          error.status = 409; 
          error.message = "Driver credentials  Already Exist";
          throw error;
        }
      } else {
        const error = new Error();
        error.status = 400;
        error.message = "Fill the Required Fields";
        throw error;
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
