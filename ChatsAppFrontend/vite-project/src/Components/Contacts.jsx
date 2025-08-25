import React, { useState } from 'react'
import styled from 'styled-components'
import profilePhoto from '../images/user-profile-images.jpg'
import SearchHeader from './SearchHeader';
import axios from 'axios';

const Contacts = (props) => {
  const { contacts, handleSearchedContacts, changeChat, currentUser } = props;
  const [addFriend, setAddFriend] = useState(false);
  const [currentSelect, setCurrentSelect] = useState(undefined);

  const changeCurrentChat = async (user, index) => {
    changeChat(user)
    setCurrentSelect(index)
    if (addFriend) {
      const isFriend = currentUser?.data?.friends?.includes(`${user?._id}`);
      if (!isFriend) {
        const { data } = await axios.post('http://localhost:5000/api/v1/search/addFriend', { userId: currentUser?.data?._id, friendId: user?._id })
        if (data?.success) {
          setAddFriend(false)
        }
      }
    }
  }
  const searchedFriends = (friends) => {
    handleSearchedContacts(friends)
  }
  const handleAddFriend = (value) => {
    setAddFriend(value)
  }
  return (
    <Container>
      <div className="brand">
        <h2>Chat Book App</h2>
      </div>
      <div style={{ width: '100%' }}>
        <SearchHeader handleAddFriend={handleAddFriend} searchedFriends={searchedFriends} />
      </div>
      <div className="contacts">
        {
          contacts?.map((user, index) => {
            return (
              <div className={`contact ${index == currentSelect ? "selected" : ""}`} key={index} onClick={() => { changeCurrentChat(user, index) }}>
                 <div>
                  <img src={profilePhoto}></img>
                 </div>
                <div style={{width: '50%', display: 'flex', flexDirection:'row', justifyContent: 'flex-end'}}>
                  <h2>{user.username}</h2>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="current-user">
        <div className="profile-photo">
          <img src={profilePhoto}></img>
        </div>
        <div className="current-username">
          <h3>{currentUser?.data?.username?.split(" ", 1)}</h3>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
.brand {
height: 5rem;
display: flex;
flex-direction:row;
align-items: center;
justify-content: center;
background-color: #ccc;
border-radius: 10px;
h2 {
color: #ec5990;
}
}
.contacts {
overflow-y: scroll;
.contact {
width: 100%;
height: auto;
height: 5rem;
display: flex;
flex-direction: row;
overflow-y: auto;
justify-content: space-around;
align-items: center;
background-color: #++333;
border-radius: 10px;
border-top: 2px solid #ff7aa8;
img {
width: 50px;
height: 50px;
border-radius: 50%;
}
}
.selected {
background-color: #9a86f3;
}
.contact: hover {
background-color: #ec5990;
}
}
.current-user {
width: 100%;
height: 5rem;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-around;
background-color: #bf1650;
border-radius: 10px;
img {
width: 50px;
height: 50px;
border-radius: 50%;
}
}
`
export default Contacts
