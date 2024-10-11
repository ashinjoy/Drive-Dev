export class DriverRefreshTokenController {
    constructor(dependencies) {
      this.driverRefreshTokenUseCase =
        new dependencies.useCase.DriverRefreshTokenUseCase(dependencies);
    }
    async refreshUserToken(req, res, next) {
      try {
          
        const { driverRefreshToken } = req.cookies;
        if (!driverRefreshToken) {
          const error = new Error();
          error.message = "No Token";
          error.status = 400;
        }
      const newUserAceessToken =  await this.driverRefreshTokenUseCase.execute(driverRefreshToken)
      if(!newUserAceessToken){
          const error = new Error(); 
          error.message = "No Token";
          error.status = 400;
      } 
      
      res.status(200).json(newUserAceessToken)
        
      } catch (error) {
          console.error(error);
          next(error)
      }
    }
  }
  