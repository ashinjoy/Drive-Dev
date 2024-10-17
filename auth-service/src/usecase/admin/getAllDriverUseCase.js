import { errorLogger } from "../../config/winstonConfig.js";

export class GetAllDriverUseCase {
  constructor(dependencies) {
    this.driverRepository = new dependencies.repository.MongoDriverRepository();
  }
  async execute(search, page) {
    try {
      const allDrivers = await this.driverRepository.getAllDrivers(
        search,
        page
      );
      const totalPages = await this.driverRepository.getTotalDocs(search);
      return {
        allDrivers,
        totalPages,
      };
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      throw error;
    }
  }
}
