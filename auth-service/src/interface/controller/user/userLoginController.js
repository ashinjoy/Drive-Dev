import { errorLogger } from "../../../config/winstonConfig.js";

export class UserLoginController {
  constructor(dependencies) {
    this.googleAuthUseCase = new dependencies.useCase.GoogleAuthUseCase(
      dependencies
    );
    this.emailAuthUseCase = new dependencies.useCase.EmailAuthUseCase(
      dependencies
    );
  }
  async userLogin(req, res, next) {
    try {
      const { type } = req.params;
      if (type === "google") {
        const { token } = req.body;
        if (!token) {
          const error = new Error();
          error.status = 400;
          error.message = "Authentication Token is Missing";
          throw error;
        }
        const { data, accessToken, refreshToken } =
          await this.googleAuthUseCase.execute(token);
        res.cookie("userRefreshToken", refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        res.status(201).json({
          data,
          accessToken,
          message: "Google Authentication SuccessFull",
        });
      } else if (type === "email") {
        const { email } = req.body;
        if (!email) {
          const error = new Error();
          error.status = 400;
          error.message = "Provide Valid Email";
          throw error;
        }
        const { userId, otp } = await this.emailAuthUseCase.execute(email);
        req.session.userId = userId;
        req.session.otp = otp;
        res.status(200).json({ message: "Otp Send Sucessfully" });
      }
    } catch (error) {
      errorLogger.error(error);
      next(error);
    }
  }
}
