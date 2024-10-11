import {
  UserCreatedConsumerUseCase,
  UserUpdateUseCase,
  DriverCreatedConsumerUseCase,
  DriverUpdateConsumerUseCase,
  TripCreateUseCase,
  TripUpdateUseCase,
  SendMessageUseCase,
  GetMessageUseCase

} from "../usecase/index.js";
import { 
  MongoAdminRepository,
  MongoUserRepository,
  MongoDriverRepository,
  MongoTripRepository,
  MongoChatRepository
} from "../interface/repository/index.js";

const useCase = {
  UserCreatedConsumerUseCase,
  UserUpdateUseCase,
  DriverCreatedConsumerUseCase,
  DriverUpdateConsumerUseCase,
  TripCreateUseCase,
  TripUpdateUseCase ,
  SendMessageUseCase ,
  GetMessageUseCase
};

const repository = {
  MongoAdminRepository,
  MongoDriverRepository,
  MongoUserRepository,
  MongoTripRepository,
  MongoChatRepository
};

export const dependencies = {
  useCase,
  repository,
};
