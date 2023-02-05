import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { format } from 'timeago.js'

const Container = styled.div`
    display:flex;
    gap:10px;
    margin:30px 0;
`
const Avatar = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
background-color: gray;
`
const Details = styled.div`
display:flex;
flex-direction:column;
color:${({theme})=>theme.text};
`
const Name = styled.div`
font-weight:500;
font-size:13px;

`
const Date = styled.span`
font-size:12px;
font-weight:400;
color:${({theme})=>theme.textSoft};
margin-left:5px;

`

const Description = styled.div`
font-size:14px;
color:${({theme})=>theme.text};

`;




function Comment({comment}) {
  const [channel, setChannel] = useState({})


  useEffect(() => {
    const fetchComment = async()=>{
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/find/${comment.userId}`)
      setChannel(res.data)
    }
    fetchComment()
  }, [comment.userId])
 

  return (
    <Container>
        <Avatar src={channel.img}/>
        <Details>
        <Name>{channel.name} <Date>{format(channel.createdAt)}</Date></Name>
          
                <Description>
                 {comment.desc}
                </Description>
        </Details>

    </Container>
  )
}

export default Comment