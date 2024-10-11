import { S3Config } from "../../utils/s3-bucketConfig.js";
export class GetDriverDetailsUseCase{
constructor(dependencies){
    this.driverRepository = new dependencies.repository.MongoDriverRepository()
}
async execute(id){
    try {
 const driverDetails = await this.driverRepository.findDriverbyId(id)
 const awsS3Config = new S3Config()
 console.log('drievrProfileImg',driverDetails?.profileImg)
 console.log('license',driverDetails?.license_Img)

 const uploadedImgArr = [{imgField:'profileImg',Key:driverDetails?.profileImg},{imgField:'licenseImg',Key:driverDetails?.license_Img},{imgField:'permitImg',Key:driverDetails?.permit}]
 const filteredUploadedImg = uploadedImgArr.filter((img)=>img.Key != undefined)
 console.log(filteredUploadedImg);
 const imgUploads = await Promise.all(filteredUploadedImg.map((img)=>{
   return awsS3Config.getImageUrl(img)
 }))
 
 const imgUrlsFromS3 = {}
 for(const img of imgUploads){
    if(img.key == 'profileImg'){
imgUrlsFromS3['profileImg'] = img.url
    }else if(img.key == 'licenseImg'){
        imgUrlsFromS3['licenseImg'] = img.url
    }else if(img.key == 'permitImg'){
        imgUrlsFromS3['permitImg'] = img.url
    }
 }
return {
    id:driverDetails?._id,
    name:driverDetails?.name,
    email:driverDetails?.email,
    phone:driverDetails?.phone,
    license_Number:driverDetails?.license_Number,
    licenseUrl:imgUrlsFromS3?.licenseImg,
    vehicleDetails:{
        vehicle_type:driverDetails?.vehicleDetails?.vehicle_type,
        rc_Number:driverDetails?.vehicleDetails?.rc_Number,
        permitUrl:driverDetails?.vehicleDetails?.permit
    },
    isBlocked:driverDetails?.isBlocked,
    isVerified:driverDetails?.isVerified,
    isProfileCompleted:driverDetails?.isProfileComplete     ,
    isAccepted:driverDetails?.isAccepted,
    editRequest:driverDetails?.editRequest,
    profileUrl:imgUrlsFromS3?.profileImg  
}

    } catch (error) {
        console.error(error);
    }
}
}