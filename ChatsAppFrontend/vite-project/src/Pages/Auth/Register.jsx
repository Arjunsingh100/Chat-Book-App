import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { IoEye } from 'react-icons/io5'
import { FaRegEyeSlash } from "react-icons/fa6"
import styled from 'styled-components';
import { useAuth } from '../../Context/auth'
import { useNavigate } from 'react-router-dom'
import '../../stylesheet/style.css'
import handleHideShowPass from '../../utils/AuthUtils'
import {ToastContainer,toast} from 'react-toastify'
import axios from 'axios'


const Register = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState({});
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate();

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

  const handleHideShowPass = () => {
    setShowPass(!showPass)
  }
  const validateFunction = () => {
    const errorName = {}
    const pattern = /!@.$%/;
    const passwordPattern = /!@#$%^&*123456789asdfghjklmnbvcxzqwertyuiop/;
    if (name.length < 3) {
      errorName.name = 'Please enter a valid name'
      return errorName
    }
    else if (phone.length < 10) {
      errorName.phone = "Please enter a valid phone no"
      return errorName
    }
    else if (!(Object.keys(errorName).length == 0)) {
      return errorName;
    }
    return true;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateFunction();
    setFormError(validationErrors);
    if (validationErrors === true) {
      try {
        console.log(name, email, phone, password)
        const user = await axios.post('http://localhost:5000/api/v1/auth/register', { username: name, email, phone, password });
        if(user?.data?.success){
          toast.success(user?.data?.message);
          navigate('/login');
        }
      } catch (error) {
        toast.error(`Facing error while registering you ${error}`)
      }
    }
  }
  // useEffect(()=>{
  //   if(auth) {
  //     navigate('/chats')
  //   }
  // },[])
  return (
    <>
      <Container>
        <div className='registeration-form'>
          <form onSubmit={handleSubmit}>
            <h3>Registeration Form</h3>
            <div className='name-input'>
              <label>Name</label>
              <input type='text' name='name' value={name} placeholder='Enter your name' onChange={(e) => { setName(e.target.value) }} required />
              <span style={{ color: 'red' }}>{formError.name}</span>
            </div>
            <div className="email-input">
              <label>Enter Email</label>
              <input type='email' name='email' value={email} placeholder='Enter your Email' onChange={(e) => { setEmail(e.target.value) }} required></input>
              <span style={{ color: 'red' }}>{formError.email}</span>
            </div>
            <div className="phone-input">
              <label>Enter your phone</label>
              <input type='phone' name='phone' value={phone} placeholder='Enter your Phone' onChange={(e) => { setPhone(e.target.value) }} required />
              <span style={{ color: 'red' }}>{formError.phone}</span>
            </div>
            <div className="password-input">
              <label>Create Password</label>
              <input type={showPass ? 'password' : 'text'} name='password' value={password} placeholder='Enter your Password' onChange={(e) => { setPassword(e.target.value) }} required />
              {showPass ? (<IoEye onClick={handleHideShowPass} style={{ color: '#1e2a4a', position: 'absolute', right: '10px', top: '49px', fontSize: '1.6rem', cursor: 'pointer' }} />)
                : (<FaRegEyeSlash onClick={handleHideShowPass} style={{ color: '#1e2a4a', position: 'absolute', right: '10px', top: '49px', fontSize: '1.6rem', cursor: 'pointer' }} />)}
              <span style={{ color: 'red' }}>{formError.password}</span>
            </div>
            <div className='submit-btn'>
              <button type='submit'>Submit</button>
            </div>
            <span><Link to='/login'>Login</Link></span>
          </form>
        </div>
        <ToastContainer />
      </Container>
    </>
  )
}

const Container = styled.div`
width: 100vw;
height: 100vh;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
background-color: #081229;
`
export default Register
