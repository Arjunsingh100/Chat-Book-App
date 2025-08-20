import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import VerifyEmail from './Pages/Auth/VerifyEmail'
import Chats from './Pages/Chats'
import OtpForm from './Pages/Auth/OtpForm'


function App() {
  const [count, setCount] = useState(0)

  return (
     <>
      <Routes>
             <Route path='/' element={<Register />} />
             <Route path='/login' element={<Login />}/>
             <Route path='/verifyEmail' element={<VerifyEmail />}/>
             <Route path='/chats' element={<Chats />}/>
             <Route path='/verifyOtp' element={<OtpForm />} />
     </Routes>
     </>
  )
}

export default App
