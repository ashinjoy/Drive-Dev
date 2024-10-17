// import { Server } from "socket.io";

// const userAndSocketId = new Map();
// let io;

// export const socketConnection = async (httpServer) => {
//   try {
//     io = new Server(httpServer, {
//       path:'/socket.io/chat',
//       cors: {
//         origin:"http://localhost:3000",
//       },
//     });
//     io.on("connection", (socket) => {
//       console.log("connectded to chatSocket Server");
      
//       socket.on("driver-chat-connect", (data) => {
//         const {driverId} = data
//         console.log("driver-chat-connected",driverId);
//         userAndSocketId.set(driverId, socket.id);
//         console.log("userAndSOcket",userAndSocketId);
//       });
//       socket.on("user-chat-connect", (data) => {
//         const {userId} = data
//        console.log("user-chat connected",userId);
//         userAndSocketId.set(userId, socket.id);
//         console.log("userAndSOcketin usr",userAndSocketId);

//       });

//     });
//   } catch (error) {
//     console.error(error);
//   }
// };



// export const sendMessage = (event, data, userId) => {

//   const usereIdtoString = userId.toString();
//   console.log("in socket helper functio================",event,data,userId);
  
// console.log('userandSocket',userAndSocketId.get(usereIdtoString),event,data);
// console.log(event,data);

//   io.to(userAndSocketId.get(usereIdtoString)).emit(event, data);
//   return;
// };

import {Server} from 'socket.io'

let io
export const socketConnection = async(httpServer)=>{
  try {
    io = new Server(httpServer, {
             path:'/socket.io/chat',
             cors: {
               origin:"http://localhost:3000",
             },
           });
    io.on('connection',(socket)=>{
      // console.log('socker server connected',socket);
    socket.on('driver-chat-connect',(tripId)=>{
      socket.join(tripId)
      console.log(' driver connecected room',tripId);


    })
    socket.on('user-chat-connect',(tripId)=>{
      socket.join(tripId)
      console.log(' user connected room',tripId)
    })
    })       
    
  } catch (error) {
    console.error(error);
    
  }
}

export const sendMessage = (event,data,roomId)=>{
  console.log('roomId',roomId);
  console.log(event ,data);
io.to(roomId).emit(event,data)
return
}