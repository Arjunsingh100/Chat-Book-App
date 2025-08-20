import React from 'react'
import styled from 'styled-components'

const Welcome = () => {
  return (
    <Container>
        <h2>Welcome to Chat Book App</h2>
    </Container>
  )
}

const Container = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;s
`
export default Welcome
