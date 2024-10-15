import {
  UserCreatedConsumerUseCase,
  UserUpdateUseCase,
  DriverCreatedConsumerUseCase,
  DriverUpdateConsumerUseCase,
  TripUpdateConsumerUseCase,
  UserCurrentLocationUseCase,
  LocationAutoCompleteUseCase,
  GetDriverOnlineUseCase,
  GetNearByDriverUseCase,
  RideRequestUseCase,
  GetAdditionalTripDataUseCase,
  AcceptRideUseCase,
  RejectRideUseCase,
  StartRideUseCase,
  GetDriverOfflineUseCase,
  CompleteRideUseCase,
  ReverseGeoCodeUseCase,
  ChangePaymentUseCase,
  EmergencyAlertUseCase,
  CancelRideUseCase,
  TripCountUseCase,
  GetTripHistoryUseCase,
  TopTripUseCase,
  CompletedTripCountUseCase,
  GetLatestTripsUseCase,
  GetAllLatestTripsUseCase,
  MostActiveDriverUseCase,
  TotalTripsCountUseCase,
  ReviewRatingUseCase,
  RideOngoingUseCase
  
} from "../usecase/index.js";
import { 
  MongoAdminRepository,
  MongoUserRepository,
  MongoDriverRepository,
  MongoTripRepository,
   MongoReviewRepository

} from "../interface/repository/index.js";

const useCase = {
  UserCreatedConsumerUseCase,
  UserUpdateUseCase,
  DriverCreatedConsumerUseCase,
  DriverUpdateConsumerUseCase,
  TripUpdateConsumerUseCase,
  UserCurrentLocationUseCase,
  LocationAutoCompleteUseCase,
  GetDriverOnlineUseCase,
  GetNearByDriverUseCase,
  RideRequestUseCase,
  GetAdditionalTripDataUseCase,
  AcceptRideUseCase,
  RejectRideUseCase,
  StartRideUseCase,
  GetDriverOfflineUseCase,
  CompleteRideUseCase,
  ReverseGeoCodeUseCase,
  ChangePaymentUseCase,
  EmergencyAlertUseCase,
  CancelRideUseCase,
  TripCountUseCase,
  GetTripHistoryUseCase,
  TopTripUseCase,
  CompletedTripCountUseCase,
  GetLatestTripsUseCase,
  GetAllLatestTripsUseCase,
  MostActiveDriverUseCase,
  TotalTripsCountUseCase,
  ReviewRatingUseCase,
  RideOngoingUseCase
};

const repository = {
  MongoAdminRepository,
  MongoDriverRepository,
  MongoUserRepository,
  MongoTripRepository,
  MongoReviewRepository
};

export const dependencies = {
  useCase,
  repository,
};
