import React, { useEffect, useState, useRef } from 'react';
import "./style.css";
import io from "socket.io-client";

// const socket = io('http://localhost:5000/')

function Chat(props) {
  const messageEl = useRef(null);// reference to the dom element
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  // const [soc, setsoc] = useState([]);

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }

    
    //recceinving msg from the server
    props.socket.on('message', data => {
      setChat([...chat, data])
    })
  })

  const sendMessage = (e) => {
    e.preventDefault();
    props.socket.emit('message', { message })
    setMessage('');
  }
  // -------------------------
  return (
    <div className="App">
      <div className="msg" ref={messageEl}>
        <div><h1>ChatBox</h1><hr /></div>
        {chat.map((data, index) => {
          {/* console.log(data + "vvv") */}
          return (<>
            {/* <sup>superscript</sup> */}
            <h3 key={index}>{data.message}</h3>
          </>)
        })
        }
      </div>
      <form onSubmit={sendMessage}>
        <input type="text" name="message"
          placeholder="type your message"
          value={message}
          onChange={(e) => { setMessage(e.target.value) }}
        />
        <button type="submit">Send</button>
      </form>

    </div>
  );
}

export default Chat;
