// import React, { useContext, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { sendMessage } from "../../Features/Trip/tripActions";
// import { getMessageService } from "../../Features/Trip/tripService";
// import { useSocket } from "../../Hooks/socket";
// import { MessageProvider } from "../../Context/ChatProvider";
// import { FaWindowClose } from "react-icons/fa";

// function Chat({  driver,user,setOpenChat }) {
//   const {messages,setMessages} = useContext(MessageProvider)

//   const [message, setMessage] = useState("");
//   const [reciever,setReciever] = useState("")
//   const [sender,setSender] = useState('')
//   const dispatch = useDispatch();
//   const { tripDetail } = useSelector((state) => state.trip);
//   const {chatSocket} =useSocket()

//   useEffect(()=>{
// if(driver){

//     setSender(tripDetail?.driverId?._id)
//     setReciever(tripDetail?.userId)
// }else if(user) {
//     setSender(tripDetail?.userId)
//     setReciever(tripDetail?.driverId)
// }
//   },[driver,user])

//   useEffect(()=>{
// console.log("sender and reciever",sender,reciever);

//   },[sender,reciever])

//   useEffect(()=>{
//     console.log("inside the chat useeffect");

//     const getMessages = async ()=>{
//         const response = await getMessageService(tripDetail._id)
//         console.log('rep',response);

//         console.log('response from backenf',response);
//         if(response){
//             setMessages(response?.messages)
//         }
//     }
//     getMessages()
//   },[])

//     useEffect(()=>{
// console.log('messagesssssssssssssssss',messages);

//     },[messages])

//   const chat = () => {
//    const token = driver
//       ? localStorage.getItem("driverAccessToken")
//       : localStorage.getItem("userAccessToken");
//    const recieverId = driver ? tripDetail?.userId : tripDetail?.driverId;
//     const data = {
//       tripId: tripDetail?._id,
//       token,
//       recieverId,
//       message:message
//     };

//     dispatch(sendMessage(data));
//     const dataForSender = {
//         senderId:sender,
//         recieverId:reciever,
//         message:message
//     }
//     setMessages((prev)=>[...prev,dataForSender])
//   };

//   return (
//     <div className="w-[60%] h-[90dvh] max-w-lg mx-auto border-2 border-gray-300 rounded-lg shadow-lg fixed z-50 top-5 right-14 bg-white">
//     <div className="bg-gray-200 px-4 py-3 border-b border-gray-300 rounded-t-lg flex items-center justify-between">
//       <div className="font-semibold text-lg text-gray-800">

//       </div>
//       <div className="flex items-center space-x-2">
//         <button className="text-gray-600 hover:text-gray-800">

//         </button>
//         <button
//           className="text-gray-600 hover:text-gray-800"
//           onClick={() => setOpenChat()}
//         >
//           <FaWindowClose size={20}/>
//         </button>
//       </div>
//     </div>

//     <div className="relative w-full h-[80%] overflow-y-auto p-4 space-y-4">
//       {(messages && messages.length > 0) &&
//         messages.map((item, index) => {
//           if (item?.senderId == sender) {
//             return (
//               <div className="flex" key={index}>
//                 <div className="max-w-xs bg-gray-100 p-3 rounded-lg shadow-md text-gray-800">
//                   {item.message}
//                 </div>
//               </div>
//             );
//           } else if (item?.senderId == reciever) {
//             return (
//               <div className="flex justify-end" key={item._id}>
//                 <div className="max-w-xs bg-blue-500 text-white p-3 rounded-lg shadow-md">
//                   {item.message}
//                 </div>
//               </div>
//             );
//           }
//         })}

//       </div>
//       <div className="absolute bottom-0 left-0 w-full px-4 py-3 bg-gray-200 border-t border-gray-300 rounded-b-lg flex items-center space-x-4">
//         <button className="text-gray-600 hover:text-gray-800">
//           <i className="fas fa-paperclip"></i>
//         </button>
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={message}
//           onChange={(e) => {
//             setMessage(e.target.value);
//           }}
//           className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
//         />
//         <button
//           className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"
//           onClick={chat}
//         >
//           <i className="fas fa-paper-plane"></i>
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Chat;

import React, { useContext, useEffect, useState } from "react";
import {useSelector } from "react-redux";
import { FaWindowClose } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { getMessageService, sendMessageService } from "../../Features/Trip/tripService";
import { MessageProvider } from "../../Context/ChatProvider";


function Chat({ user, setOpenChat }) {
  const [senderId, setSenderId] = useState(null);
  const [recieverId, setRecieverId] = useState(null);
  const userDetail = useSelector(state=>state.user)
  const driverDetail = useSelector(state=>state.driver)
  const [userId,setUserId] = useState(null)
  const [driverId,setDriverId] = useState(null)
  const [chatOwnerId,setChatOwnerId] = useState(driverDetail?.driver?.id || userDetail?.user?.id)

  
  const {messages,setMessages,chatName,setChatName} = useContext(MessageProvider)

  const { tripDetail } = useSelector((state) => state.trip);
const [message,setMessage] = useState('')
  const setParticipants = (sendersId, recieversId) => {

    setSenderId(sendersId);
    setRecieverId(recieversId);
  };

  const handleChat = async()=>{
    let chatData = {
      senderId:senderId,
      senderType:user,
      recieverId:recieverId,
      tripId:tripDetail?._id,
      userId : userId,
      driverId: driverId,
      message:message,
    }
    if(user === 'user'){
      chatData = {...chatData,token:userDetail?.token}
    }else {
      chatData = {...chatData,token:driverDetail?.token}
    }
    console.log('chatdata',chatData);
    
    const response = await sendMessageService(chatData)
    console.log('response from sendMessage Api',response.data); 
  }

  useEffect(() => {
    const getMessages = async () => {
     const response =  await getMessageService(tripDetail?._id)
     setMessages(response?.messages)
     console.log('response',response);
     
     if(user === 'driver'){
      setChatName(response?.userName)
     }else{
      setChatName(response?.driverName)
     }
    }
    getMessages()
    if (user === "driver") {
      setParticipants(tripDetail?.driverId?._id, tripDetail?.userId);
      setDriverId(tripDetail?.driverId?._id)
      setUserId(tripDetail?.userId)
      return;
    }
    if (user === "user") {
      setParticipants(tripDetail?.userId, tripDetail?.driverId);
      setDriverId( tripDetail?.driverId)
      setUserId(tripDetail?.userId)
      return;
    }
  }, []);




  return(
    <div className="w-[60%] h-[90dvh] max-w-lg mx-auto border border-gray-300 rounded-lg shadow-lg fixed z-50 top-5 right-14 bg-white">

  <div className="bg-yellow-300 px-4 py-3 border-b border-gray-300 rounded-t-lg flex items-center justify-between">
    <div className="font-semibold text-lg text-gray-800">
      {chatName && chatName.toUpperCase()}
    </div>
    <div className="flex items-center space-x-2">
      <button className="text-gray-600 hover:text-gray-800">
        <i className="fas fa-minus"></i> 
      </button>
      <button
        className="text-gray-600 hover:text-gray-800"
        onClick={() => setOpenChat()}
      >
        <FaWindowClose size={20} />
      </button>
    </div>
  </div>

  <div className="relative w-full h-[75%] overflow-y-auto p-4 space-y-4 bg-gray-50">
    {messages && messages.length > 0 && messages.map((chat) => {
      const isSentByUser = chat.senderId === chatOwnerId;
      return (
        <div
          key={chat._id}
          className={`flex ${isSentByUser ? 'justify-end' : 'justify-start'} w-full`}
        >
          <div className="">
          <div className={`flex flex-col  ${isSentByUser ? 'bg-blue-500' : 'bg-gray-400'} 
            text-white p-3 rounded-lg shadow-sm max-w-xs break-words`}>
            <p>{chat?.message}</p>
            </div>
            <p className={`${isSentByUser ? 'text-end' : 'text-start'}`}>{new Date(chat?.createdAt).toLocaleString('en-US',{hour:'numeric',minute:'numeric'})}</p>
          </div>
        </div>
      );
    })}
  </div>

  
  <div className="absolute bottom-0 left-0 w-full px-4 py-3 bg-white border-t border-gray-300 rounded-b-lg flex items-center space-x-4">
    <button className="text-gray-600 hover:text-gray-800">
      <i className="fas fa-paperclip"></i> 
    </button>
    <input
      type="text"
      placeholder="Type a message..."
      value={message}
      className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
      onChange={(e) => setMessage(e.target.value)}
    />
    <button
      className="text-blue-600 hover:text-blue-800"
      onClick={handleChat}
    >
      <IoSend size={'1.5rem'} />
    </button>
  </div>
</div>

  )
}

export default Chat;
