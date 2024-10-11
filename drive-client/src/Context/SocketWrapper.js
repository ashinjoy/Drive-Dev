import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
export const SocketProvider = createContext(null);

function SocketWrapper({ children }) {
  const [socket, setSocket] = useState(null);
  const [chatSocket,setChatSocket] = useState(null)

  useEffect(() => {
    const socketInstance = io(`http://localhost:3003`,{
      path:'/socket.io/trip',
    });
    setSocket(socketInstance);
    socketInstance.on("connect", () => {
      console.log(" client connected successFully to trip-srv");
    });
    socketInstance.on("connect_error", (err) => {
      console.error(err);
    });
    return () => {
      console.log("inside the return");
      
      if (socketInstance) {
        console.log("socket discoonnect");
        socketInstance.disconnect();
      } 
    };
  }, []);

  useEffect(()=>{
    const chatSocketInstance = io(`http://localhost:3004`,{
      path:'/socket.io/chat'
    })
    setChatSocket(chatSocketInstance)
    chatSocketInstance.on("connect",()=>{
      console.log(" client connected successFully to chat-srv");
    })
    chatSocketInstance.on("connect_error",(err)=>{
      console.log("connection error",err);
    })

    return ()=>{
      if(chatSocketInstance){
        chatSocketInstance.disconnect()
      }
    }

  },[])

  return (
    <SocketProvider.Provider value={{socket,chatSocket}}>{children}</SocketProvider.Provider>
  );
}

export default SocketWrapper;
