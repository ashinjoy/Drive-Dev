import {
  GoogleAuthUseCase,
  EmailAuthUseCase,
  VerifyOtpUseCase,
  ResendOtpUseCase,
  userRefreshTokenUseCase,
  UpdateUserDataUseCase,
  SaveContactsUseCase,
  UserLogoutUseCase,
  DriverRegisterUseCase,
  DriverLoginUseCase,
  DriverVerifyOtpUseCase,
  DriverCompleteProfileUseCase,
  DriverProfileUpdateUseCase,
  DriverRefreshTokenUseCase,
  DriverResendOtpUseCase,
  adminLoginUseCase,
  GetAllDriverUseCase,
  GetDriverDetailsUseCase,
  DriverApprovalUseCase,
  ApproveProfileUpdateUseCase,
  DriverBlockUnblockUseCase,
  UserBlockUnblockUseCase,
  GetAllUserUseCase,
  AdminRefreshTokenUseCase,
  NewlyEnrolledUserUseCase,
} from "../usecase/index.js";

import {
  MongoUserRepository,
  MongoDriverRepository,
  MongoAdminRepository,
} from "../interface/repository/index.js";

const useCase = {
  GoogleAuthUseCase,
  EmailAuthUseCase,    // Users UseCases
  VerifyOtpUseCase,
  userRefreshTokenUseCase,
  ResendOtpUseCase,
  UserLogoutUseCase,
  UpdateUserDataUseCase,
  SaveContactsUseCase,

  DriverRegisterUseCase,
  DriverLoginUseCase,
  DriverCompleteProfileUseCase,   // Drivers UseCases
  DriverVerifyOtpUseCase,
  DriverProfileUpdateUseCase,
  DriverRefreshTokenUseCase,
  DriverResendOtpUseCase,

  adminLoginUseCase,
  AdminRefreshTokenUseCase,
  GetAllDriverUseCase,
  GetDriverDetailsUseCase,
  DriverApprovalUseCase,          // Admin UseCases
  ApproveProfileUpdateUseCase,
  DriverBlockUnblockUseCase,
  UserBlockUnblockUseCase,
  GetAllUserUseCase,
  NewlyEnrolledUserUseCase,
};

const repository = {
  MongoUserRepository,
  MongoDriverRepository,
  MongoAdminRepository,
};

export const dependencies = {
  useCase,
  repository,
};
