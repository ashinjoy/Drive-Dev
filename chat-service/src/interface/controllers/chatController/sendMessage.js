// import { verifyAccessToken } from "../../../utils/jwt.js";

// export class SendMessageController {
//   constructor(dependencies) {
//     this.sendMessageUseCase = new dependencies.useCase.SendMessageUseCase(
//       dependencies
//     );
//   }
//   async sendMessage(req, res, next) {
//     try {
     
//       const sender = await verifyAccessToken(req.body.token);
      

//       const senderId = sender.role == "DRIVER" ? sender._id : sender.id;
      
//       const data = {
//         senderId,
//         receiverId: req.body.recieverId,
//         message: req.body?.message,
//         tripId: req.body.tripId,
//       };
//       await this.sendMessageUseCase.execute(data);
//       res.status(201).json({ message: "success" });
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }

export class SendMessageController {
  constructor(dependencies){
    this.sendMessageUseCase = new dependencies.useCase.SendMessageUseCase(dependencies)
  }
  async sendMessage(req,res,next){
    try {
    const postMessage =   await this.sendMessageUseCase.execute(req.body)
    res.status(201).json({status:"success"})
    } catch (error) {
      console.error(error);
      next(error)
    }
  }
}
