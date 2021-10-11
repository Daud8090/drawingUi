import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";



function Login() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  // const [allEntry, setAllEntry] = useState("");





  return (
      <div className="outer">
        <div className="inner">
          <h1 className="heading">JOIN</h1>
          <div><input placeholder="name" type="text" onChange={(event) => setName(event.target.value)} /></div>
          <div><input placeholder="room" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
          <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/draw?name=${name}&room=${room}`} >
            <button type="submit">JOIN</button>
          </Link>
        </div>
      </div>

  )
}


export default Login;