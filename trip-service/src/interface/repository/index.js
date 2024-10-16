import { UserRepository} from "./userRepository/userRepository.js";
import { DriverRepository } from "./driverRepository/driverRepository.js";
import { AdminRepository } from "./adminRepository/adminRepository.js";
import { TripRepository } from "./tripRepository/tripRepository.js";
import { ReviewRepository } from "./reviewRepository/reviewRepository.js";

export { UserRepository as MongoUserRepository,
    DriverRepository as MongoDriverRepository,
    AdminRepository as MongoAdminRepository,
    TripRepository as MongoTripRepository,
    ReviewRepository as MongoReviewRepository
 };
