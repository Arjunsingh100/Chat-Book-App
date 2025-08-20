import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OtpForm = (props) => {
    const { email } = props;
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [error, setError] = useState('');
    const inputRefs = useRef([]);
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

    const handleChange = (element, index) => {
        const value = element.value.replace(/[^0-9]/g, '');
        if (!value) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move focus to next input
        if (index < 5 && value) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && index > 0) {
            inputRefs.current[index - 1].focus();
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const enteredOtp = otp.join('');

        if (enteredOtp.length < 6) {
            setError('Please enter a valid 6-digit OTP');
            toast.error('Please enter a valid 6-digit OTP')
        } else {
            setError('');
            try {
                console.log(email)
                console.log(otp)
                const otpVerificationStatus = await axios.post('http://localhost:5000/api/v1/auth/verifyOtp', { email, otp: enteredOtp });
                if (otpVerificationStatus?.data?.success == false) {
                    return toast.error(otpVerificationStatus?.data?.message);
                }
                toast.success(otpVerificationStatus?.data?.message);
                console.log(otpVerificationStatus?.data?.message)
                navigate('/chats');
            } catch (error) {
                toast.error(`Facing error while verifying OTP ${error}`)
            }
        }
    };

    return (
        <Container>
            <form onSubmit={handleSubmit} style={{ width: '350px', height: '300px', textAlign: 'center' }}>
                <h2>Enter OTP</h2>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e.target, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputRefs.current[index] = el)}
                            style={{
                                width: '40px',
                                height: '40px',
                                fontSize: '24px',
                                textAlign: 'center',
                            }}
                        />
                    ))}
                </div>
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                <button type="submit" style={{ marginTop: '20px' }}>Verify OTP</button>
            </form>
            <ToastContainer />
        </Container>
    );
};


const Container = styled.div`
width: 100vw;
height: 100vh;
overflow: hidden;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
background-color: #0e101c;
`
export default OtpForm;
