import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import OtpForm from './OtpForm';
import axios from 'axios';


const VerifyEmail = () => {
    const [verifyEmail, setVerifyEmail] = useState('');
    const [step, setStep] = useState(1)
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

    useEffect(() => { toast.error('Your email is not verified so please verify your email') }, [])
    //send otp to email
    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        try {
            const otp = await axios.post('http://localhost:5000/api/v1/auth/sentOtp', { email: verifyEmail });
             if(otp?.data?.success) {
                toast.success(otp?.data?.message);
                setStep(2)
             }
        } catch (error) {
            toast.success(`Facing error while sending otp ${error}`)
        }
    }
    return (
        <Container>
            {step == 1 && <div className="verify-email bg-body-tertiary d-flex flex-direction-row align-items-center justify-content-center">
                <form className='d-flex direction-column align-items-center justify-content-center' onSubmit={handleVerifyOTP}>
                    <h2>Verify your Email</h2>
                    <div className="verifyemail-input">
                        <label>Enter your email</label>
                        <div className='d-flex direction-column' style={{ display: 'flex', flexDirection: 'column' }}>
                            <input type='email' name='email' value={verifyEmail} onChange={(e) => { setVerifyEmail(e.target.value) }} placeholder='Enter your register email' />
                            <Button type='submit' variant='primary'>Send OTP</Button>
                        </div>
                    </div>
                </form>
            </div>}
            {step == 2 && <OtpForm email = {verifyEmail}/>}
            <ToastContainer />
        </Container>
    )
}


const Container = styled.div`
width: 100vw;
height: 100vh;
overflow: hidden;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
verify-email {
width: 100%;
height: 100%;
overflow: hidden;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
form {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}
}
`
export default VerifyEmail
