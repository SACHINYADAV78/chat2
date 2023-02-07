import React, { useEffect, useState } from "react";
import "./Chat.css";
import { user } from "./Join";
import socketIo from "socket.io-client";
import Message from "./Message";
import ReactScrollToBottom from "react-scroll-to-bottom"

const Endpoint = "http://localhost:4000";
let socket;
function Chat() {

  const [id, setId] = useState("")
  const [messages, setmessages] = useState([])
   const send = ()=>{
   const message = document.getElementById('chat-input').value
    socket.emit('message',{message ,id})
   document.getElementById('chat-input').value =""

   }

  useEffect(() => {
     socket = socketIo(Endpoint, { transports: ["websocket"] });

    socket.on("connect", () => {
      //   alert("hello connected");
      setId(socket.id)
      
    });
    console.log(socket);
    socket.emit("join", { user });

    socket.on("welcome", (data) => {
      setmessages([...messages ,data])
    });
    socket.on("userJoined", (data) => {
      setmessages([...messages ,data])
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setmessages([...messages ,data])
      console.log(data.user, data.message);
    });
    return () => {
      socket.emit("disconect");
      socket.off();
    };
  }, []);
  useEffect(() => {
    socket.on('sendMessage', (data)=>{
      setmessages([...messages ,data])
      console.log(data.user , data.message ,data.id)

    })
  
    return () => {
      socket.off()
    }
  }, [messages])
  
  return (
    <div className="chat-page">
      <div className="chatcontainer">
        <div className="header"></div>
        <ReactScrollToBottom className="chat-box">
          {messages.map((item ,i)=> <Message user={item.id ===id? '' :item.user} message={item.message} classs={item.id ===id? 'right' :'left'}/>)}
        </ReactScrollToBottom>
        <div className="input-box">
          
          <input  type="text" id="chat-input" />
          <button onClick={send} className="sendbtn">send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
