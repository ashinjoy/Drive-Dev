import {
  UserCreatedConsumerUseCase,
  UserUpdateUseCase,
  DriverCreatedConsumerUseCase,
  DriverUpdateConsumerUseCase,
  TripCreateUseCase,
  TripUpdateUseCase,
  StripePaymentUseCase,
  // CashOnDeliveryUseCase,
  // GetTripDetailsUseCase,
  GetTripDetailByIdUseCase,
  CreatePaymentUseCase,
  ConfirmStripePaymentUseCase,
  // UpdatePaymentUseCase,
  WalletPaymentUseCase,
  AddMoneyToWalletUseCase,
  GetWalletBalanceUseCase,
  GetUserWalletHistoryUseCase,
  GetDriverWalletDetailsUseCase,
  GetDriverWalletBalanceUseCase,
  GetCompanyWalletUseCase,
  TripReportUseCase,
  DownloadTripReportUseCase
  // GetDriverWalletHistoryUseCase
} from "../usecase/index.js";
import { 
  MongoAdminRepository,
  MongoUserRepository,
  MongoDriverRepository,
  MongoTripRepository,
  MongoPaymentRepository,
  MongoWalletRepository,
  MongoCompanyWalletRepository

} from "../interface/repository/index.js";

const useCase = {
  UserCreatedConsumerUseCase,
  UserUpdateUseCase,
  DriverCreatedConsumerUseCase,
  DriverUpdateConsumerUseCase,
  TripCreateUseCase,
  TripUpdateUseCase  ,
  StripePaymentUseCase,
  ConfirmStripePaymentUseCase,
  // CashOnDeliveryUseCase,
  // GetTripDetailsUseCase,
  GetTripDetailByIdUseCase,
  CreatePaymentUseCase,
  // UpdatePaymentUseCase,
  WalletPaymentUseCase,
  AddMoneyToWalletUseCase,
  GetWalletBalanceUseCase,
  GetUserWalletHistoryUseCase,
  GetDriverWalletDetailsUseCase,
  GetDriverWalletBalanceUseCase,
  GetCompanyWalletUseCase,
  TripReportUseCase,
  DownloadTripReportUseCase
  // GetDriverWalletHistoryUseCase
};

const repository = {
  MongoAdminRepository,
  MongoDriverRepository,
  MongoUserRepository,
  MongoTripRepository,
  MongoPaymentRepository,
  MongoWalletRepository,
  MongoCompanyWalletRepository

};

export const dependencies = {
  useCase,
  repository,
};
