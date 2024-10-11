import express from 'express'
// import { AuthHandler } from '../middleware/authMiddleware'
import { SendMessageController } from '../controllers/chatController/sendMessage.js'
import { GetMessageController } from '../controllers/chatController/getMessage.js'
import {dependencies} from '../../config/dependencies.js'

 const chatRouter = express.Router()

const controllers={
    sendMessageController: new SendMessageController(dependencies),
    getMessageController : new GetMessageController(dependencies)
}

chatRouter.post('/sendMessage',async(req,res,next)=>controllers.sendMessageController.sendMessage(req,res,next))
chatRouter.get('/messages/:userId',async(req,res,next)=>controllers.getMessageController.getMessage(req,res,next))


export default chatRouter