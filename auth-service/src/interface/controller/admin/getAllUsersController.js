export class GetAllUserController {
  constructor(dependencies) {
    this.getAllUserUseCase = new dependencies.useCase.GetAllUserUseCase(
      dependencies
    );
  }
  async getAllUsers(req, res, next) {
    try {
      const { search, page } = req.query;
      const searchInp = search ? search : ''
      const currentPageNumber = page ? page : 1
   const getDrivers  =   await this.getAllUserUseCase.execute(searchInp,currentPageNumber)
        res.status(200).json({
          userDetails: getDrivers.allUsers,
          totalPages: getDrivers.totalPages,
        });
    } catch (error) {
      console.error(error); 
      next(error)
    }
  }
}
