import React, { useState,useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import { ws } from "../Socket/Socket";
import "./chat.css";
import { URL } from "../../api/apiDB";
import {helpHttp} from "../helpers/helpHttp"
import image from "../../assets/images/chat.png";
let initialChatUser = {
  sender: null,
  name: "",
};

let initialReceptor = {
    firstName: "",
    lastName:"",
    iduser:"",
  };

const Mainchat = () => {
  const [message, setMessage] = useState("");
  const [listMessages, setListMessages] = useState([]);
  const [toggleChat, setToggleChat] = useState(false);
  const [Chatuser, setChatuser] = useState(initialChatUser);
  const [Receptor, setReceptor] = useState(initialReceptor);
  const [Emisor, setEmisor] = useState(initialReceptor);


useEffect(() => {
      helpHttp()
      .get(`${URL.USERS_DB}/${sessionStorage.getItem("id")}/profile`)
      .then((res) => {
        if(!res.err){
            setEmisor({...Emisor,firstName:res.firstName,lastName:res.lastName,iduser:sessionStorage.getItem("id")})
        }
        
      });
}, [])

useEffect(() => {
    if(Chatuser.sender != sessionStorage.getItem("id")){
        helpHttp()
        .get(`${URL.USERS_DB}/${Chatuser.sender}/profile`)
        .then((res) => {
          if(!res.err){
            setReceptor({...Receptor,firstName:res.firstName,lastName:res.lastName,iduser:Chatuser.sender})

          }
        });
    }
}, [Chatuser])



  ws.onopen = (e) => {
    console.log("Web socket open : ", e);
  };
  ws.onmessage = (message) => {
     
    const chatMesssage = JSON.parse(message.data);
   
    if (chatMesssage.sender != sessionStorage.getItem("id")) {
      setChatuser({
        ...Chatuser,
        sender: chatMesssage.sender,
        name: chatMesssage.name,
      });
    }
    setListMessages([...listMessages, chatMesssage]);
  };
  ws.onclose = (event) => {
    console.log("Close: ", event);
  };

  const send = () => {
    const requestMessage = {
      sender: sessionStorage.getItem("id"),
      name: sessionStorage.getItem("username"),
      //'recipient': 15,
      message: message,
      datetime: new Date(),
    };
    ws.send(JSON.stringify(requestMessage));
  };
  const openChat = () => {
    setToggleChat(!toggleChat);
  };
  const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };
  return (
    <>
      <Sidebar />
      <div className="container-chat">
        <div className={`col-1-chat ${toggleChat ? "active" : ""}`}>
          <header className="header-chat">
            <h1><i className="fas fa-users"></i> Chat Delibakery</h1>
          </header>
          <aside className="side-chat">
              {Emisor.iduser&&<>
            <div
              className="contact-chat"
              onClick={() => {
                openChat();
              }}
            >
              <div className="profile-picture chat-picture">
                <img
                  src={`${URL.USERS_DB}/${Emisor.iduser}/image`} 
                  alt="profile-picture"
                />
                <p className="chat-status"></p>
              </div>
              <div className="chat-content">
                <span className="chat-user">{Emisor.firstName} {Emisor.lastName}</span>
                <p className="chat-message">
                  lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor
                  sit amet, consectetur adip
                </p>
              </div>
              <div className="chat-info">
                <p className="chat-time">Estas conectado Justo Ahora</p>
                <p className="chat-qty">5</p>
              </div>
            </div>
            </>}
            {Receptor.iduser&&<>
            <div
              className="contact-chat"
              onClick={() => {
                openChat();
              }}
            >
                
              <div className="profile-picture chat-picture">
                <img
                  src={`${URL.USERS_DB}/${Receptor.iduser}/image`} 
                  alt="profile-picture"
                />
                <p className="chat-status"></p>
              </div>
              <div className="chat-content">
                <span className="chat-user">{Receptor.firstName} {Receptor.lastName}</span> 
                <p className="chat-message">
                  lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor
                  sit amet, consectetur adip
                </p>
              </div>
              <div className="chat-info">
                <p className="chat-time">Justo Ahora</p>
                <p className="chat-qty">5</p>
              </div>
            </div></>}
          </aside>
        </div>
        <div className={`col-2-chat ${toggleChat ? "active" : ""}`}>
          <header className="header-chat">
            <div className="return" onClick={openChat}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 16.5L4 12M4 12L8.5 7.5M4 12L20 12"
                  stroke="#3B5162"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Regresar</span> 
            </div>
            <div className="profile">
              {Receptor.iduser ? (
                <>
                  <div className="profile-picture">
                    <img src={`${URL.USERS_DB}/${Receptor.iduser}/image`} />
                  </div>
                  <div className="profile-info">
                    <span className="name">
                    {Receptor.firstName} {Receptor.lastName} <i className="fas fa-circle"></i>
                    </span>
                    <span className="user-status">Activo ahora</span>
                  </div>
                </>
              ) : (
                <h1><i className="fas fa-comments"></i> No hay mensajes</h1>
              )}
            </div>
          </header>
          <main className="content-chat">
            <div className="list-messages">
              {!listMessages.length>0&&
              <div className="center f-column message-empty">
                <img src={image} alt="chat" width="200"/>
                <p className="text">Comienzar a chatear</p>
              </div>}
              {/* Messages */}
              
              {listMessages.map((e, i) => (
                <div
                  key={i}
                  className={`message ${
                    e.sender == sessionStorage.getItem("id") ? "right" : "left"
                  }`}
                >
                  <div className="message-profile">
                    <img src={`${URL.USERS_DB}/${e.sender}/image`} />
                  </div>
                  <div className="messages">
                    <p className="message-text">
                      {e.message}

                      <span className="datetime">
                        {formatAMPM(new Date(e.datetime))}
                      </span>
                    </p>
                  </div>
                </div>
              ))}

            </div>
            <div className="input-message">
              <span className="emoji">
                <i className="far fa-grin"></i>
              </span>
              <div className="input-container">
                <textarea
                  type="text"
                  className="input"
                  placeholder="Escribe un mensaje aqui"
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                ></textarea>
              </div>
              <span className="send" onClick={() => send()}>
                <i className="fas fa-paper-plane"></i>
              </span>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export { Mainchat };
