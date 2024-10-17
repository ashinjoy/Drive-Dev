import { errorLogger } from "../../../config/winstonConfig.js";

export class SaveContactsController {
  constructor(dependencies) {
    this.saveContactsUseCase = new dependencies.useCase.SaveContactsUseCase(
      dependencies
    );
  }
  async saveContacts(req, res, next) {
    try {
      const saveEmergencyContacts = await this.saveContactsUseCase.execute(
        req.body
      );
      res.status(201).json({ userDetail: saveEmergencyContacts });
    } catch (error) {
      console.error(error);
      errorLogger.error(error);
      next(error);
    }
  }
}
