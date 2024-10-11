export class UserBlockUnblockController {
  constructor(dependencies) {
    this.userBlockUnblockUseCase =
      new dependencies.useCase.UserBlockUnblockUseCase(dependencies);
  }
  async userBlockUnblock(req, res, next) {
    try {
      const { userId } = req.params;
      if (!userId) {
        const error = new Error();
        error.message = "Bad Request";
        error.status = 400;
        throw error;
      }
      const manageUser = await this.userBlockUnblockUseCase.execute(userId);
      const data = {
        id: manageUser._id,
        isBlocked: manageUser?.isBlocked,
      };
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
