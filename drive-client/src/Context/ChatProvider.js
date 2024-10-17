import React, { createContext,useState,useEffect } from 'react'
import { useSocket } from '../Hooks/socket'
import { useSelector } from 'react-redux'
export const MessageProvider = createContext(null)

function    ChatProvider({children}) {
    const {chatSocket} = useSocket()
    const {driver} = useSelector((state)=>state.driver)
    const {user} = useSelector(state=>state.user)
  const [messages,setMessages] = useState([])
  const [chatName,setChatName] = useState('')
    
    useEffect(()=>{  
        if(chatSocket){
            chatSocket?.on("latestMessage",(data)=>{
                setMessages((prev)=>[...prev,data])
                console.log('ser',messages);
                
            })
        }
        return ()=>{
          chatSocket?.off('latestMessage')
        }

    },[chatSocket,driver,user])
  return (
   <MessageProvider.Provider value={{messages,setMessages,chatName,setChatName}}>{children}</MessageProvider.Provider>
  )
}

export default ChatProvider
