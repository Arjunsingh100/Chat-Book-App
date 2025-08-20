import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Contacts from '../Components/Contacts'
import ChatsContainer from '../Components/ChatsContainer'
import Welcome from '../Components/Welcome'
import image from '../images/user-profile-images.jpg'
import axios from 'axios'
const Chats = () => {
  const users = [{ photo: 'image', username: 'Sandy', _id: 'kjk8jk3#45@' },
  { photo: 'image', username: 'Ravi', _id: 'kjkf67#4)*!' },
  { photo: 'image', username: 'Rajesh', _id: 'kjdf^&*23#' },
  { photo: 'image', username: 'Pinto', _id: 'vfjk6^@h73)%' }]
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined)
  const [contacts, setContacts] = useState()
  const navigate = useNavigate();

  const changeChat = (chat) => {
    setCurrentChat(chat)
  }
  const settingCurrentUser = async () => {
    if (!localStorage.getItem('auth')) {
      navigate('/login')
    }
    else {
      const user = await JSON.parse(localStorage.getItem('auth'))
      setCurrentUser(user)
    }
  }
  useEffect(() => {
    settingCurrentUser()
  }, [])
  const handleSearchedContacts = (searchedContacts) => {
    setContacts(searchedContacts)
  }

  //get all contacts
  const getAllFriends = async () => {
    if (currentUser) {
      const { data } = await axios.get(`http://localhost:5000/api/v1/search/getContacts/${currentUser?.data?._id}`)
      if (data?.success) {
        setContacts(data?.friends[0]?.friends);
      }
    }
  }
  useEffect(() => {
    getAllFriends();
  }, [currentUser])


  return (
    <Container>
      <div className="chats-contacts">
        <Contacts contacts={contacts} handleSearchedContacts={handleSearchedContacts} currentUser={currentUser} changeChat={changeChat} />
      </div>
      <div className="current-chat-container">
        {currentChat === undefined ? (<Welcome />) : (<ChatsContainer currentChat={currentChat} />)}
      </div>
    </Container>
  )
}

const Container = styled.div`
background-color: #4f6294;
width: 100vw;
height: 100vh;
display: flex;
flex-direction:row;
row-gap:2rem;
justify-content: space-between;

.chats-contacts {
width:30%;
height: 100vh;
background-color: #0e101c;
border-radius: 12px;
}
.current-chat-container {
width: 68%;
height: 100vh;
background-color: #191d3a;
border-radius: 12px;
}
`
export default Chats
