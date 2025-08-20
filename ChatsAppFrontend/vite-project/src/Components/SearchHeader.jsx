import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useSearch } from '../Context/Search.jsx'
import axios from 'axios';
import styled from 'styled-components'

const SearchHeader = (props) => {
    const { searchedFriends, handleAddFriend } = props;
    const [values, setValues] = useState({});
    const [debounceSearchValue, setDebounceSearchValue] = useState();
    const navigate = useNavigate();

    //debounce function 
    useEffect(() => {
        const getData = setTimeout(() => {
            setDebounceSearchValue(values.searchKeyword)
        }, 500);
        //cleanup function to clear the timer
        return () => {
            clearTimeout(getData)
        }
    }, [values.searchKeyword])

    const handleSubmit = async () => {
        if (!debounceSearchValue) {
            return;
        }
        const { data } = await axios.get(`http://localhost:5000/api/v1/search/searchFriends/${values.searchKeyword}`);
        searchedFriends(data?.friends);
        handleAddFriend(true)
    }
    //calling api using debounce
    useEffect(() => {
        if (debounceSearchValue) {
            try {
                handleSubmit();
            } catch (error) {
                console.log(error)
            }
        }
    }, [debounceSearchValue])

    return (
        <Container>
            <div className='header'>
                <div style={{width:  '100%'}}>
                    <form>
                        <input placeholder='Search here' type='text' onChange={(e) => { setValues({ ...values, searchKeyword: e.target.value }) }} />
                        <button style={{ visibility: 'hidden' }} disabled type='submit'>Search</button>
                    </form>
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
width: 100%;
.header {
width:100%;
display:flex;
flex-direction:row;
align-items:center;
justify-content:center;
form {
width: 100%;
display: flex; 
flex-direction: row;
align-items: center;
justify-content: center;
padding: 10px;
border: 1px solid red;
input {
width: 90%;
padding:10px;
border:none;
outline:none;
border-radius:50px;
}
button {
padding:10px;
color:white;
background-color:blue;
outline:none;
border:none;
border-radius:10px;
margin-left:15px;
}
}
}
`
export default SearchHeader