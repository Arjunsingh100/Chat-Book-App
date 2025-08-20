import React from 'react'
import { useState, useEffect } from 'react'
// import handleHideShowPass from '../../utils/AuthUtils'
import { IoEye } from 'react-icons/io5'
import { FaRegEyeSlash } from "react-icons/fa6"
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../../stylesheet/style.css'
import axios from 'axios'
import { useAuth } from '../../Context/auth'
import { ToastContainer, toast } from 'react-toastify'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(true);
  const [auth, setAuth] = useAuth();
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
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await axios.post('http://localhost:5000/api/v1/auth/login', { email: username, password: password });
      console.log(userData)
      if (userData?.data?.success == false) {
        if (userData?.data?.data?.emailISVerified == false) {
          toast.error(`${userData?.data?.message}`)
          navigate('/verifyEmail')
        }
        return toast.error(`${userData?.data?.message}`)
      }
      if (userData && userData?.data?.success) {
        setAuth({
          ...auth,
          user: userData?.data?.user,
          token: userData?.data?.token
        })
        const setUser = await localStorage.setItem('auth', JSON.stringify(userData?.data));
        navigate('/chats')
        toast.success('You have login successfully')
      }

    } catch (error) {
      console.log(`Getting error while logging ${error}`)
      toast.error(`Getting error while logging ${error}`)
    }
  }
  // useEffect(()=>{
  //   if(!auth.user == null) {
  //     navigate('/chats')
  //   }
  // }, [])
  return (
    <>
      <Container>
        <div className='login-form'>
          <form onSubmit={handleLogin}>
            <h2>Login Form</h2>
            <div className='username-input'>
              <label>Username</label>
              <input type='email' name='name' value={username} placeholder='Enter your email' onChange={(e) => { setUsername(e.target.value) }} required />
            </div>
            <div className="password-input">
              <label>Password</label>
              <input type={showPass ? 'password' : 'text'} name='password' value={password} placeholder='Enter your password' onChange={(e) => { setPassword(e.target.value) }} />
              {showPass ? (<IoEye onClick={handleHideShowPass} style={{ position: 'absolute', right: '10px', top: '48px', fontSize: '1.6rem', cursor: 'pointer' }} />)
                : (<FaRegEyeSlash onClick={handleHideShowPass} style={{ position: 'absolute', right: '10px', top: '48px', fontSize: '1.6rem', cursor: 'pointer' }} />)}
            </div>
            <div className="submit-btn">
              <button type='submit'>Submit</button>
            </div>
            <span><Link to='/'>Register</Link></span>
          </form>
        </div>
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
background: #081229;
`
export default Login
