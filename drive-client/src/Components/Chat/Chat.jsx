import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../Features/Trip/tripActions";
import { getMessageService } from "../../Features/Trip/tripService";
import { useSocket } from "../../Hooks/socket";
import { MessageProvider } from "../../Context/ChatProvider";
import { FaWindowClose } from "react-icons/fa";


function Chat({ openChat, driver,user,setOpenChat }) {
  const {messages,setMessages} = useContext(MessageProvider)

  const [message, setMessage] = useState("");
  // const [messages,setMessages] = useState([])
  const [reciever,setReciever] = useState("")
  const [sender,setSender] = useState('')
  const dispatch = useDispatch();
  const { tripDetail } = useSelector((state) => state.trip);
  const {chatSocket} =useSocket()

  useEffect(()=>{
if(driver){
    
    setSender(tripDetail?.driverId?._id)
    setReciever(tripDetail?.userId)
}else if(user) {
    setSender(tripDetail?.userId)
    setReciever(tripDetail?.driverId)
}
  },[driver,user])

  useEffect(()=>{
console.log("sender and reciever",sender,reciever);

  },[sender,reciever])
  


  useEffect(()=>{
    console.log("inside the chat useeffect");
    
    const getMessages = async ()=>{
        const response = await getMessageService(tripDetail._id)
        console.log('rep',response);
        
        console.log('response from backenf',response);
        if(response){
            setMessages(response?.messages)
        }
    }
    getMessages()
  },[])

    // useEffect(()=>{
    //     if(chatSocket){
    //         chatSocket.on("latestMessage",(data)=>{
    //             console.log("message Recieved ",data);
    //             setMessages((prev)=>[...prev,data])
    //         })
    //     }
    //     return ()=>{
    //       chatSocket?.off('latestMessage')
    //     }

    // },[chatSocket,driver,user])


    useEffect(()=>{
console.log('messagesssssssssssssssss',messages);

    },[messages])



  const chat = () => {
   const token = driver
      ? localStorage.getItem("driverAccessToken")
      : localStorage.getItem("userAccessToken");
   const recieverId = driver ? tripDetail?.userId : tripDetail?.driverId;
    const data = {
      tripId: tripDetail?._id,
      token,
      recieverId,
      message:message
    };
    
    dispatch(sendMessage(data));
    const dataForSender = {
        senderId:sender,
        recieverId:reciever,
        message:message
    }
    setMessages((prev)=>[...prev,dataForSender])
  };

  return (
    <div className="w-[60%] h-[90dvh] max-w-lg mx-auto border-2 border-gray-300 rounded-lg shadow-lg fixed z-50 top-5 right-14 bg-white">
    <div className="bg-gray-200 px-4 py-3 border-b border-gray-300 rounded-t-lg flex items-center justify-between">
      <div className="font-semibold text-lg text-gray-800">
        
      </div>
      <div className="flex items-center space-x-2">
        <button className="text-gray-600 hover:text-gray-800">
          
        </button>
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={() => setOpenChat()} 
        >
          <FaWindowClose size={20}/> 
        </button>
      </div>
    </div>
  
    <div className="relative w-full h-[80%] overflow-y-auto p-4 space-y-4">
      {(messages && messages.length > 0) &&
        messages.map((item, index) => {
          if (item?.senderId == sender) {
            return (
              <div className="flex" key={index}>
                <div className="max-w-xs bg-gray-100 p-3 rounded-lg shadow-md text-gray-800">
                  {item.message}
                </div>
              </div>
            );
          } else if (item?.senderId == reciever) {
            return (
              <div className="flex justify-end" key={item._id}>
                <div className="max-w-xs bg-blue-500 text-white p-3 rounded-lg shadow-md">
                  {item.message}
                </div>
              </div>
            );
          }
        })}
 
  
       
      </div>
      <div className="absolute bottom-0 left-0 w-full px-4 py-3 bg-gray-200 border-t border-gray-300 rounded-b-lg flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-800">
          <i className="fas fa-paperclip"></i>
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"
          onClick={chat}
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}

export default Chat;
