import { display } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {format} from 'timeago.js'

const Container = styled.div`
  width:${(props)=>props.type !=="sm" && "360px"};
  cursor: pointer;
  margin-bottom:${(props)=>props.type ==="sm" ? "10px": "40px"};
  display:${(props)=>props.type ==="sm" && "flex"};
 gap:10px;
`;

const Image = styled.img`
flex:1;
  width: 100%;
  height: ${(props)=>props.type ==="sm" ? "100px": "202px"};
  background-color: gray;
  object-fit:cover;
  positon:absolute;
  top:0;
  
`;

const Details = styled.div`
flex:1;
  display: flex;
  margin-top: ${(props)=>props.type !=="sm" &&"16px"};
  gap: 12px;
`;
const ChannelImage = styled.img`
  height: 36px;
  width: 36px;
  background-color: gray;
  border-radius: 50%;
  display:${(props)=>props.type ==="sm" && "none"};
`;

const Text = styled.div`

`;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color:${({theme})=> theme.text}
`;
const ChannelName = styled.h2`
  font-size: 16px;
  font-weight: 500;
  margin: 9px 0px;
  color:${({theme})=> theme.textSoft}
 
`;
const Info = styled.div`
  display: flex;
  gap: 20px;
  color:${({theme})=> theme.textSoft}

`;
const View = styled.span``;
const Date = styled.span``;

function Card({type ,video}) {
const [channel, setChannel] = useState({})
 
useEffect(() => {
    const fetchChannel = async()=>{
      const res = await axios.get(`https://videoapp13.herokuapp.com/api/users/find/${video.userId}`)
      setChannel(res.data)
    }
    fetchChannel()
  }, [video.userId])


  return (
    <Link to={`/video/${video._id}`} style={{textDecoration:"none"}}>
    <Container type={type}>
      <Image type={type} src={video.imgUrl} />
      <Details type={type} >
        <ChannelImage type={type} src={channel.img} />
        <Text>
          <Title>{video.title}</Title>
          <ChannelName>{channel.name}</ChannelName>
          <Info>
            <View>{video.views} views</View>
            <Date>{format(video.createdAt)}</Date>
          </Info>
        </Text>
      </Details>
    </Container>
    </Link>
  );
}

export default Card;
