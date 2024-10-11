import { UserRepository} from "./userRepository/userRepository.js";
import { DriverRepository } from "./driverRepository/driverRepository.js";
import { AdminRepository } from "./adminRepository/adminRepository.js";
import { TripRepository } from "./tripRepository/tripRepository.js";
import { PaymentRepository } from "./paymentRepository/paymentRepository.js";
import { WalletRepository } from "./walletRepository/walletRepository.js";
import { CompanyWalletRepository } from "./companyWalletRepository/companyWalletRepository.js";

export { UserRepository as MongoUserRepository,
    DriverRepository as MongoDriverRepository,
    AdminRepository as MongoAdminRepository,
    TripRepository as MongoTripRepository,
    PaymentRepository as MongoPaymentRepository,
    WalletRepository as MongoWalletRepository,
    CompanyWalletRepository as MongoCompanyWalletRepository
 };
