import { UserRepository} from "./userRepository/userRepository.js";
import { DriverRepository } from "./driverRepository/driverRepository.js";
import { AdminRepository } from "./adminRepository/adminRepository.js";

export { UserRepository as MongoUserRepository,
    DriverRepository as MongoDriverRepository,
    AdminRepository as MongoAdminRepository
 };
