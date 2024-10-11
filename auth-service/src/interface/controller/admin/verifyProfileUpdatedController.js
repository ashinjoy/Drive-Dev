export class verifyProfileUpdateController {
  constructor(dependencies) {
    this.approveProfileUpdate =
      new dependencies.useCase.ApproveProfileUpdateUseCase(dependencies);
  }
  async profileUpdateManage(req, res, next) {
    try {
      const { driverId, status } = req.params;
      if (!driverId) {
        const error = new Error();
        error.message = "Bad Request";
        error.status = 400;
        throw error;
      }
      if (status == "approval") {
        await this.approveProfileUpdate.execute(driverId);
        res.status(200).json({ message: "Approve Profile Update request" });
      } else if (status == "reject") {
        await this.approveProfileUpdate.execute(driverId);
        res.status(200).json({ message: "Reject Profile Update request" });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
