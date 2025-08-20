import React, { useState, useEffect } from 'react'
import '../stylesheet/messagesStyle.css'
import { NavLink } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci";
import styled from 'styled-components'
import ChatInput from './ChatInput'
import currentChatProfile from '../images/user-profile-images.jpg'
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from '../Context/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const ChatsContainer = (props) => {
   const [auth, setAuth] = useAuth();
   const [messages, setMessage] = useState([])
   const navigate = useNavigate();
   const { currentChat } = props;


   const toastStyle = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
   }

   const handleLogout = async () => {
      setAuth({
         ...auth,
         user: null,
         token: ""
      });
      await localStorage.removeItem('auth');
      navigate('/login')
      toast.success('You have logout successfully')
      console.log('You have logout success fully')
   }
   

   const handleSendMessage = async (msg) => {
      try {
         console.log(msg)
      } catch (error) {
         console.log(error)
      }
   }
   return (
      <Container>
         <div className="chats-container">
            <div className="current-user-profile">
               <img src={currentChatProfile}></img>
               <h2>{currentChat.username}</h2>
            </div>
            <div className="user-menu">
               <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                     <CiMenuBurger />
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant='dark'>
                     <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                     <Dropdown.Item href="#/action-2">Set Picture</Dropdown.Item>
                     <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>

                  </Dropdown.Menu>
               </Dropdown>
            </div>
         </div>
         <div className="message-container">
            <div className="bubbleWrapper">
               <div className="inlineContainer">
                     <div className="otherBubble other">
                        No ninjas!
                     </div>
               </div><span className="other">08:41</span>
            </div>
            <div className="bubbleWrapper">
               <div className="inlineContainer own">
                     <div className="ownBubble own">
                        The first rule of being a ninja is, 'Do no harm.'
                     </div>
               </div><span className="own">08:55</span>
            </div>
            <div className="bubbleWrapper">
               <div className="inlineContainer">
                     <div className="otherBubble other">
                        Knowing when to leave requires training.
                     </div>
               </div>
            </div><span className="other">10:13</span>
            <div className="bubbleWrapper">
               <div className="inlineContainer own">
                     <div className="ownBubble own">
                        Stunned but impressed.
                     </div>
               </div><span className="own">11:07</span>
            </div>
            <div className="bubbleWrapper">
               <div className="inlineContainer">
                     <div className="otherBubble other">
                        How about throwing stars?
                     </div>
               </div><span className="other">11:11</span>
            </div>
             <div className="bubbleWrapper">
               <div className="inlineContainer">
                     <div className="otherBubble other">
                        How about throwing stars?
                     </div>
               </div><span className="other">11:11</span>
            </div>
             <div className="bubbleWrapper">
               <div className="inlineContainer">
                     <div className="otherBubble other">
                        How about throwing stars?
                     </div>
               </div><span className="other">11:11</span>
            </div>
             <div className="bubbleWrapper">
               <div className="inlineContainer">
                     <div className="otherBubble other">
                        How about throwing stars?
                     </div>
               </div><span className="other">11:11</span>
            </div>
             <div className="bubbleWrapper">
               <div className="inlineContainer">
                     <div className="otherBubble other">
                        How about throwing stars?
                     </div>
               </div><span className="other">11:11</span>
            </div>
         </div>
         <div className="msg-send-container">
            <ChatInput handleSendMessage = {handleSendMessage}/>
         </div>
      </Container>
   )
}

const Container = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
.chats-container {
width: 100%;
height: 4.5rem;
border-radius: 8px;
background-color: #2ecc71;
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
.current-user-profile {
display: flex;
flex-direction: row;
align-items:center;
gap: 1rem;
img {
width: 50px;
height: 50px;
border-radius: 50%;
}
}
}
.message-container{
width: 100%;
height: auto;
overflow-y: scroll;
}
.msg-send-container{
width: 100%;
}
`
export default ChatsContainer
