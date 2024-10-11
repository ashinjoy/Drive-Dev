import { compare } from "../../utils/hash.js";
import { createAccessToken, createRefreshToken } from "../../utils/jwt.js";
import { S3Config } from "../../utils/s3-bucketConfig.js";
export class DriverLoginUseCase {
  constructor(dependencies) {
    this.driverRepository = new dependencies.repository.MongoDriverRepository();
  }
  async execute(loginData) {
    try {
      const { email, password } = loginData;
      const existingUser = await this.driverRepository.findDriverByEmail(email);
      if (existingUser) {
        if (existingUser.isVerified) {
          if (!existingUser.isBlocked) {
            const verifyPassword = await compare(
              password,
              existingUser.password
            );
            if (verifyPassword) {
              const accessToken = await createAccessToken({
                ...existingUser,
                role: "DRIVER",
              });
              const refreshToken = await createRefreshToken({
                ...existingUser,
                role: "DRIVER",
              });
              const awsS3Config = new S3Config()
 
              const uploadedImgArr = [{imgField:'profileImg',Key:existingUser?.profileImg},{imgField:'licenseImg',Key:existingUser?.license_Img},{imgField:'permitImg',Key:existingUser?.permit}]
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
              const data = {
                id: existingUser?._id,
                name: existingUser?.name,
                email: existingUser?.email,
                phone: existingUser?.phone,
                licenseNumber:existingUser?.license_Number,
                vehicleType: existingUser?.vehicleDetails?.vehicle_type,
                rc_Number: existingUser?.vehicleDetails?.rc_Number,
                licenseUrl:imgUrlsFromS3?.licenseImg,
                profileUrl:imgUrlsFromS3?.profileImg,
                permitUrl:imgUrlsFromS3?.permitImg,
                isBlocked:existingUser?.isBlocked,
                isVerified:existingUser?.isVerified,
                isProfileCompleted:existingUser?.isProfileComplete,
                isAccepted:existingUser?.isAccepted,
                editRequest:existingUser?.editRequest,
              };
              return {
                data,
                accessToken,
                refreshToken,
              };
            } else {
              const error = new Error();
              error.message = "Invalid Password";
              error.status = 403;
              throw error;
            }
          } else {
            const error = new Error();
            error.message = "Your Accoount has Been Blocked Temporarily";
            error.status = 401;
            throw error;
          }
        } else {
          const error = new Error();
          error.message = "UnAuthorized";
          error.status = 403;
          throw error;
        }
      } else {
        const error = new Error();
        error.message = "UnAuthorized";
        error.status = 401;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
