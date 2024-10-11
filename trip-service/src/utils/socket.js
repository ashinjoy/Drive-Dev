import { Server } from "socket.io";
const driverAndSocketId = new Map();
const userAndSocketId = new Map();
let io;

export const socketConnection = async (httpServer) => {
  try {
    io = new Server(httpServer, {
      path:"/socket.io/trip",
      cors: {
        origin:"http://localhost:3000",
      },
    });
    io.on("connection", (socket) => {
      socket.on("driver-connected", (driverId) => {
        driverAndSocketId.set(driverId, socket.id)
        socket.join(driverId)        
      });
      socket.on("user-connected", (userId) => {
        userAndSocketId.set(userId, socket.id);
        socket.join(userId)
      });
      socket.on("location-update", (data) => {
        const userIdToString = data?.userId.toString();
        socket.to(userAndSocketId.get(userIdToString)).emit("live-location", data);
      });
        socket.on('nearbyPickup',(data)=>{
        socket.to(data?.userId).emit('nearbyRide',data)
      })

      socket.on('start-ride',(data)=>{
        socket.to(data.userId).emit('ride-start','started')
      })

      socket.on('ride-complete',(data)=>{
        const userId = data?.userId
        socket.to(userAndSocketId.get(userId)).emit('ride-complete',data)
      })

      socket.on('ride-start',(data)=>{
        socket.to('userID')
      })

    });
  } catch (error) {
    console.error(error);
  }
};

export const notifyDriver = (event, notification, driverId) => {
  
    const driverIdToString = driverId.toString();
    io.to(driverIdToString).emit(event,notification)
    return;
};

export const userNotify = (event, data, userId) => {

  
  // const usereIdtoString = userId.toString();
  


  // io.to(userAndSocketId.get(usereIdtoString)).emit(event, data);
  console.log('usersID',userId);
  
  io.to(userId.toString()).emit(event,data)
  return;
};

export const emitEvent = (event,data,userId)=>{
  io.to(userId).emit(event,data)
}
