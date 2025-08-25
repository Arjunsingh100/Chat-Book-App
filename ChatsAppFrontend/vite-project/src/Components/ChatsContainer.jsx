import React, { useState, useEffect } from 'react'
import '../stylesheet/messagesStyle.css'
import { data, NavLink } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci";
import styled from 'styled-components'
import ChatInput from './ChatInput'
import currentChatProfile from '../images/user-profile-images.jpg'
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from '../Context/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { format, isToday, isYesterday } from "date-fns";

const ChatsContainer = (props) => {
   const [auth, setAuth] = useAuth();
   const [messages, setMessages] = useState([])
   const navigate = useNavigate();
   const { currentChat, currentUser } = props;

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
         // setMessages([...messages, msg]);
         console.log(msg)
         const createMessage = await axios.post('http://localhost:5000/api/v1/message/createMessage',
            { from: currentUser?.data?._id, to: currentChat?._id, message: msg })
      } catch (error) {
         console.log(error)
      }
   }
   const groupedMessageArr = (allMessages) => {
      const groupedMessagesArr = [];
      allMessages?.map((msg, index) => {
         const date = format(new Date(msg?.createdAt), "yyyy-MM-dd")
         const hasKey = groupedMessagesArr.some((ele) => {
            return date in ele;
         })
         if (!hasKey) {
            groupedMessagesArr.push({ [date]: [] })
         }
         const indexOfGroup = groupedMessagesArr.findIndex((ele, ind) => {
            return date in ele;
         })
         return groupedMessagesArr[indexOfGroup]?.[date]?.push(msg)
      })
      setMessages(groupedMessagesArr)
   }
   //Helpers to format date headers
   const formatDateHelper = (dateKey) => {
      const date = new Date(dateKey);
      if (isToday(date)) {
         return "Today";
      }
      if (isYesterday(dateKey)) {
         return "Yesterday"
      }
      return format(date, "MMMM d, yyyy")
   }
   const fetchAllMessages = async () => {
      try {
         const { data } = await axios.post('http://localhost:5000/api/v1/message/fetchMessages',
            { from: currentUser?.data?._id, to: currentChat?._id })
         console.log(data)
         // setMessages(data?.allMessages)
         groupedMessageArr(data?.allMessages);
      } catch (error) {
         console.log(error)
      }
   }
   useEffect(() => {
      setMessages([])
      fetchAllMessages();
   }, [currentChat])
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
            {messages.map((dateKey, index) => {
               return (
                  <div key={index}>
                     <div key={index}>
                        <div className='message-header'>
                           {formatDateHelper(Object.keys(dateKey)[0])}
                        </div>
                     </div>
                     {dateKey[Object?.keys(dateKey)[0]]?.map((message,index) => {
                        return (
                           <div key={index} className="bubbleWrapper">
                              <div className={`inlineContainer ${currentUser?.data?._id == message?.sender ? "own" : ""}`}>
                                 <div className={`${currentUser?.data?._id == message?.sender ? "ownBubble own" : "otherBubble other"}`}>
                                    {message?.content}
                                 </div>
                              </div><span className={`${currentUser?.data?._id == message?.sender ? "own" : "other"}`}>{format(new Date(message.createdAt), "hh:mm")}</span>
                           </div>
                        )
                     })}
                  </div>

               )
            })}
         </div>
         <div className="msg-send-container">
            <ChatInput handleSendMessage={handleSendMessage} />
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
