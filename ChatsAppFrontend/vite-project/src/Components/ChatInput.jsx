import React, { useState } from 'react'
import { BsEmojiSmileFill } from 'react-icons/bs'
import styled from 'styled-components'
import EmojiContainer from 'emoji-picker-react'

const ChatInput = (props) => {
  const { handleSendMessage } = props;
  const [message, setMessage] = useState('');
  const [hideShowEmojiContainer, setHideShowEmojiContainer] = useState(false)

  const handleEmojiContainer = () => {
    setHideShowEmojiContainer(!hideShowEmojiContainer)
  }

  
  const handleEmojiClick = (emojiObject) => {
    let msg = message;
    msg += emojiObject.emoji;
    setMessage(msg);
  }

  const handleSendMSG = async (e) => {
    e.preventDefault();
    if(message.length>0) {
      handleSendMessage(message)
      setMessage('')
    }
  }

  return (
    <Container>
      <div>
        <div className="emoji">
          <BsEmojiSmileFill style={{ left: '20px', right: '20px', fontSize: '30px', color: '#e2e20cff' }} onClick={handleEmojiContainer} />
          <div style={{ position: 'absolute', bottom: '70px' }}>
            {hideShowEmojiContainer && <EmojiContainer width='300px' height='400px' theme='dark' emoji-scroll-wraper='-webkit-scrollbar{background-color:green}' onEmojiClick={handleEmojiClick} />}
          </div>
        </div>
      </div>
      <form className='input-container' onSubmit={handleSendMSG}>
        <input type='text' name='message' value={message} onChange={(e) => { setMessage(e.target.value) }} />
        <button type='submit'>Send</button>
      </form>
    </Container>
  )
}

const Container = styled.div`
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
.input-container {
width: 90%;
overflow: hidden;
border: none;
margin-bottom: 1rem;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
row-gap: 20px;
input {
width: 80%;
height: 2rem;
border-radius: 40px;
}
button {
width: 80px;
height: 2rem;
}
}
`
export default ChatInput
