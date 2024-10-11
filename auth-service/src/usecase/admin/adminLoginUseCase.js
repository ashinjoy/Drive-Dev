import { compare } from "../../utils/hash.js";
import { createAccessToken, createRefreshToken } from "../../utils/jwt.js";
export class adminLoginUseCase {
  constructor(dependencies) {
    this.adminRepository = new dependencies.repository.MongoAdminRepository();
  }
  async execute(loginData) {
    try {
      const { name, email, password } = loginData;
      console.log("==============>", name, email, password);
      const isAdminExist = await this.adminRepository.findAdminByEmailandName(
        name,
        email
      );
      if (isAdminExist) {
        console.log("user exist");
        console.log(isAdminExist?.password,password);
        const isValidPassword = await compare(password, isAdminExist?.password);
        if (isValidPassword) {
          const adminAccessToken = await createAccessToken({
            id:isAdminExist?._id,
            name: isAdminExist?.name,
            email: isAdminExist?.email,
            role: "ADMIN",
          });
          console.log('isAdmin',isAdminExist);
          const adminRefreshToken = await createRefreshToken({
            id:isAdminExist?._id,
            name: isAdminExist?.name,
            email: isAdminExist?.email,
            role: "ADMIN",
          });
          return {
            id:isAdminExist._id,
            name: isAdminExist?.name,
            email: isAdminExist?.email,
            adminAccessToken,
            adminRefreshToken,
          };
        } else {
          const error = new Error();
          error.status = 401;
          error.message = "Password is Not Matching";
          throw error;
        }
      } else {
        const error = new Error();
        error.status = 401;
        error.message = "You are Unauthorized to this page";
        throw error;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
