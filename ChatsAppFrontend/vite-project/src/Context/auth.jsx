import { useState, useEffect, useContext, createContext } from "react";
import axios from 'axios'

const AuthContext = createContext();

const AuthProvider = (props) => {
    const {children} = props;
    const [auth, setAuth] = useState({user: null, token: ""})

    //default axios
    axios.defaults.headers.common["Authorization"] = auth?.token;
    useEffect(()=>{
        const handleData = async () => {
            const userData = await localStorage.getItem('auth');
            if(userData) {
                const parseData = JSON.parse(userData)
                setAuth({
                    ...auth,
                    user: parseData.data,
                    token: parseData.token
                })
            }
        }
        handleData();
        //eslint-disable-next-line
    },[])
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => { return useContext(AuthContext)};

export {useAuth, AuthProvider}