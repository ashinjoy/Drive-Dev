
//Users Usecases

import { GoogleAuthUseCase} from "./user/googleAuthUseCase.js";
import { EmailAuthUseCase } from "./user/emailAuthUseCase.js";
import { VerifyOtpUseCase } from "./user/verifyOtpUseCase.js";
import { userRefreshTokenUseCase } from "./user/userRefreshTokenUseCase.js";
import {ResendOtpUseCase} from './user/resendOtpUseCase.js'
import { UserLogoutUseCase } from "./user/userLogoutUseCase.js";


import { DriverRegisterUseCase } from "./driver/registrationUseCase.js";
import { DriverVerifyOtpUseCase } from "./driver/verifyOtpUseCase.js";
import { DriverLoginUseCase } from "./driver/loginUseCase.js";
import { CompleteProfileUseCase } from "./driver/completeProfileUseCase.js";
import { DriverProfileUpdateUseCase } from "./driver/updateProfileUseCase.js";
import { adminLoginUseCase } from "./admin/adminLoginUseCase.js";
import { GetAllDriverUseCase } from "./admin/getAllDriverUseCase.js";
import { GetDriverDetailsUseCase } from "./admin/getDriverDetailsUseCase.js";
import { DriverResendOtpUseCase } from "./driver/resendOtpUseCase.js";

import { DriverApprovalUseCase } from "./admin/driverApprovalUseCase.js";
import { ApproveProfileUpdateUseCase } from "./admin/approveProfileUpdateUseCase.js";
import { DriverBlockUnblockUseCase } from "./admin/driverBlockUnblockUseCase.js";
import { UserBlockUnblockUseCase } from "./admin/userBlockUnblockUseCase.js";
import { GetAllUserUseCase } from "./admin/getAllUserUseCase.js";
import { UpdateUserDataUseCase } from "./user/updateUserDataUseCase.js";
import {DriverRefreshTokenUseCase} from './driver/driverRefreshTokenUseCase.js'
import {AdminRefreshTokenUseCase} from './admin/adminRefreshTokenUseCase.js'
import { SaveContactsUseCase } from "./user/saveContactsUseCase.js";
import { NewlyEnrolledUserUseCase } from "./admin/newlyEnrolledUserUseCase.js";


export {
  GoogleAuthUseCase,
  EmailAuthUseCase,
  VerifyOtpUseCase,
  userRefreshTokenUseCase,
  ResendOtpUseCase,
  UserLogoutUseCase,

  DriverRegisterUseCase,
  CompleteProfileUseCase as DriverCompleteProfileUseCase,
  DriverVerifyOtpUseCase ,
  DriverProfileUpdateUseCase,
  DriverLoginUseCase,
  DriverRefreshTokenUseCase,
  DriverResendOtpUseCase,
  


  adminLoginUseCase,
  AdminRefreshTokenUseCase,
  GetAllDriverUseCase,
  GetDriverDetailsUseCase,
  DriverApprovalUseCase,
  ApproveProfileUpdateUseCase,
  DriverBlockUnblockUseCase,
  UserBlockUnblockUseCase,
  GetAllUserUseCase,
  UpdateUserDataUseCase,
  SaveContactsUseCase,
  NewlyEnrolledUserUseCase
}


