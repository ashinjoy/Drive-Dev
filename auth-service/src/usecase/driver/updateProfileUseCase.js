import { DRIVER_UPDATED, TOPIC } from "../../events/config.js";
import { KafkaClient } from "../../events/KafkaClient.js";
import { S3Config } from "../../utils/s3-bucketConfig.js";

export class DriverProfileUpdateUseCase {
  constructor(dependencies) {
    this.driverRepository = new dependencies.repository.MongoDriverRepository();
    this.kafka = new KafkaClient();
  }
  async execute(body, files) {
    try {
      const {
        name,
        email,
        phone,
        licenseNumber,
        vehicleType,
        vehicleRC,
        driverId,
      } = body;
      let dataToUpdate;
      if (files.length == 0) {
        dataToUpdate = {
          name,
          email,
          phone,
          licenseNumber,
          vehicleDetails: {
            vehicle_type: vehicleType,
            rc_Number: vehicleRC,
          },
          isVerified: false,
          editRequest: true,
        };
      } else {
        const imageDetails = {};
        const awsConfig = new S3Config();
        const uploadResults = await Promise.all(
          files.map((img) => {
            return awsConfig.uploadImage(img);
          })
        );
        console.log("uplooad", uploadResults);
        for (const img of uploadResults) {
          if (img.imgField == "profileImg") {
            imageDetails["profileImg"] = img.Key;
          } else if (img.imgField == "licenseImg") {
            imageDetails["licenseImg"] = img.Key;
          } else if (img.imgField == "permitImg") {
            imageDetails["permitImg"] = img.Key;
          }
        }

        dataToUpdate = {
          name,
          email,
          phone,
          licenseNumber,
          license_Img: imageDetails.licenseImg && imageDetails.licenseImg,
          vehicleDetails: {
            vehicle_type: vehicleType,
            rc_Number: vehicleRC,
            permit: imageDetails.permitImg && imageDetails.permitImg,
          },
          profileImg: imageDetails?.profileImg && imageDetails?.profileImg,
          isVerified: false,
          editRequest: true,
        };
      }

      const updatedDetails =
        await this.driverRepository.findDriverByIdAndUpdate(
          driverId,
          dataToUpdate
        );
      const dataToPublish = {
        _id: updatedDetails?._id,
        name: updatedDetails?.name,
        email: updatedDetails?.email,
        phone: updatedDetails?.phone,
        license_Number: updatedDetails?.license_Number,
        license_Img: updatedDetails?.license_Img,
        profileImg: updatedDetails?.profileImg,
        vehicleDetails: {
          vehicleType: updatedDetails?.vehicleDetails?.vehicleType,
          rc_Number: updatedDetails?.vehicleDetails?.rc_Number,
          permit: updatedDetails?.vehicleDetails?.permit,
        },
        wallet: updatedDetails?.wallet,
        isBlocked: updatedDetails?.isBlocked,
        isVerified: updatedDetails?.isVerified,
        isProfileComplete: updatedDetails?.isProfileComplete,
        isAccepted: updatedDetails?.isAccepted,
        editRequest: updatedDetails?.editRequest,
      };
      this.kafka.produceMessage(TOPIC, {
        type: DRIVER_UPDATED,
        value: JSON.stringify(dataToPublish),
      });

      const data = {
        isBlocked: updatedDetails?.isBlocked,
        isVerified: updatedDetails?.isVerified,
        isAccepted: updatedDetails?.isAccepted,
        editRequest: updatedDetails?.editRequest,
      };

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
