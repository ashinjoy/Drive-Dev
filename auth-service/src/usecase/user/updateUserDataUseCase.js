import { S3Config } from "../../utils/s3-bucketConfig.js";
import { KafkaClient } from "../../events/KafkaClient.js";
import { TOPIC ,USER_UPDATED } from "../../events/config.js";

export class UpdateUserDataUseCase {
  constructor(dependencies) {
    this.userRepository = new dependencies.repository.MongoUserRepository();
    this.kafka = new KafkaClient()
  }
  async execute(body, file) {
    const awsS3Config = new S3Config();
    let dataToUpdate;
    console.log('userId',body.userId,body);
    
    if (file == undefined) {
      dataToUpdate = {
        name: body?.name,
        email: body?.email,
        phone: body?.phone,
      };
      const userProfileUpdate = await this.userRepository.findByIdUpdate(
        body.userId,
        dataToUpdate
      )

      const userDataToPublish = {
        _id:userProfileUpdate?._id,
        name:userProfileUpdate?.name,
        email:userProfileUpdate?.email,
        phone:userProfileUpdate?.phone,
        authType:userProfileUpdate?.authType,
        isBlocked:userProfileUpdate?.isBlocked,
        isVerified:userProfileUpdate?.isVerified,
        isProfileComplete:userProfileUpdate?.isProfileComplete,
        createdAt:userProfileUpdate?.createdAt,
        profileImg:userProfileUpdate?.profileImg
      }
      console.log('userData',userDataToPublish);
    
      this.kafka.produceMessage(TOPIC,{
        type:USER_UPDATED,
        value:JSON.stringify(userDataToPublish)
      })

      let imgUrlFromS3
      if(userProfileUpdate?.profileImg){
         imgUrlFromS3 = await awsS3Config.getImageUrl({
          imgField: "profileImg",
          Key: userProfileUpdate?.profileImg,
        });
        console.log("url", imgUrlFromS3);
      }

     
      return {
        id: userProfileUpdate?._id,
        name: userProfileUpdate?.name,
        email: userProfileUpdate?.email,
        phone: userProfileUpdate?.phone,
        isBlocked: userProfileUpdate?.isBlocked,
        profileUrl:imgUrlFromS3?.url
      };
    } else {
      const uploadedImg = await awsS3Config.uploadImage(file);
      const s3UploadedImg = uploadedImg.Key;
      console.log(uploadedImg);
      dataToUpdate = {
        name: body?.name,
        email: body?.email,
        phone: body?.phone,
        profileImg: s3UploadedImg,
      };
      const userProfileUpdate = await this.userRepository.findByIdUpdate(
        body.userId,
        dataToUpdate
      );

      const userDataToPublish = {
        _id:userProfileUpdate._id,
        name:userProfileUpdate.name,
        email:userProfileUpdate.email,
        phone:userProfileUpdate.phone,
        authType:userProfileUpdate.authType,
        isBlocked:userProfileUpdate.isBlocked,
        isVerified:userProfileUpdate.isVerified,
        isProfileComplete:userProfileUpdate.isProfileComplete,
        createdAt:userProfileUpdate.createdAt,
        profileImg:userProfileUpdate.profileImg
      }
      console.log('userDataToPublish',userDataToPublish);
      
      this.kafka.produceMessage(TOPIC,{
        type:USER_UPDATED,
        value:JSON.stringify(userDataToPublish)
      })

      const imgUrlFromS3 = await awsS3Config.getImageUrl({
        imgField: "profileImg",
        Key: userProfileUpdate?.profileImg,
      });
      console.log("url", imgUrlFromS3);
      return {
        id: userProfileUpdate?._id,
        name: userProfileUpdate?.name,
        email: userProfileUpdate?.email,
        phone: userProfileUpdate?.phone,
        isBlocked: userProfileUpdate?.isBlocked,
        profileUrl: imgUrlFromS3?.url ? imgUrlFromS3?.url:"",
      };
    }
  }
}
