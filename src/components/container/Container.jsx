import React, { useEffect, useState } from "react";
// import Board from "../board/Board"
import Chat from "../chat/Chat";
import NewBoard, { timer } from "../newBoard/NewBoard";
import "./style.css";
import queryString from 'query-string';
import { useLocation } from 'react-router-dom'
import io from "socket.io-client";




function Container() {
  const socket = io('http://localhost:5000/')
  const [col, setcol] = useState("black");
  const [Name, setName] = useState('');
  const [Room, setRoom] = useState('');
  const location = useLocation();

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    // console.log(name,room) 
    setName(name)
    setRoom(room)


    socket.emit('joinRoom',{name,room})
  })



  function onChange1(e) {
    setcol(e.target.value)
    clearInterval(timer)
  }
  // -----------------------------
  return (
    <>
      <div className="container">
        {/* <div className="colorpicker">
          Select Color :
          <input type="color" id="color" onChange={onChange1}></input>
        </div> */}
        <Chat socket={socket} /> 
        {/* // Name={Name} Room={Room}/> */}
        <div className="board-container">
          {/* <Board color={col} /> */}
          <NewBoard  socket={socket}/>
        </div>
      </div>
    </>
  )
}
export default Container;