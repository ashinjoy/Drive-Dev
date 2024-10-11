export class AdminRefreshTokenController {
    constructor(dependencies) {
      this.adminRefreshTokenUseCase =
        new dependencies.useCase.AdminRefreshTokenUseCase(dependencies);
    }
    async refreshUserToken(req, res, next) {
      try {
          
        const { adminRefreshToken } = req.cookies;
        if (!adminRefreshToken) {
          const error = new Error();
          error.message = "No Token";
          error.status = 400;
          throw error
        }
      const newUserAceessToken =  await this.adminRefreshTokenUseCase.execute(adminRefreshToken)  
      res.status(201).json(newUserAceessToken)
      } catch (error) {
          console.error(error);
          next(error)
      }
    }
  }
  