import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchFailure, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";


const Container = styled.div`
  display: flex;
  gap: 24px;
`;
const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;
const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;
const Buttons = styled.div`
  display: flex;
  gap: 20px;
  cursor:pointer;
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
const Hr = styled.hr`
  margin: 15px 0;
  boder: 0.5px solid ${({ theme }) => theme.Soft};
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color:gray;
`;

const ChannelDetails = styled.div`
display:flex;
flex-direction:column;
color:${({theme})=>theme.text};
`;
const ChannelName = styled.span`
font-weight:500;
`;
const ChannelCounter = styled.span`
margin-top:5px
margin-bottom:20px;
color:${({theme})=>theme.textSoft};
font-size:12px;

`;
const Description = styled.div`
font-size:14px;
`;

const Subscribe = styled.button`
background-color:red;
color:white;
font-weight:500;
border-radius:3px;
border:none;
height:max-content;
padding:10px 20px;
cursor:pointer;
`;


const VideoFrame = styled.video`
max-height: 720px;
width: 100%;
object-fit:cover;
`

function Video() {
  const location = useLocation()
  const videoId = location.pathname.split("/").at(-1)
  const {user} = useSelector((state)=>state.user)
  
  const [channel, setChannel] = useState({})
  const {currentVideo} = useSelector((state)=>state.video)
  const dispatch =  useDispatch()


 
useEffect(() => {
    const fetchData = async()=>{
      try{
        const videoRes = await axios.get(`${process.env.REACT_APP_BASE_URL}/videos/find/${videoId}`)
      
        const channelRes = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/find/${videoRes.data.userId}`)
        setChannel(channelRes.data)
        dispatch(fetchSuccess(videoRes.data))
      }
      catch(err){
        dispatch(fetchFailure())
      }
    }
    fetchData()
  }, [videoId,dispatch])

  const handleLike =async()=>{
      await axios.put(`${process.env.REACT_APP_BASE_URL}/users/like/${currentVideo._id}`)
      dispatch(like(user._id))
  }
  const handleDislike =async()=>{
    await axios.put(`${process.env.REACT_APP_BASE_URL}/users/dislike/${currentVideo._id}`)
    dispatch(dislike(user._id))
  }

  const handleSub = async()=>{
    user.subscibedUsers.includes(channel._id) ? 
    await axios.put(`${process.env.REACT_APP_BASE_URL}/users/unsub/${channel._id}`)
    :
    await axios.put(`${process.env.REACT_APP_BASE_URL}/users/sub/${channel._id}`);


    dispatch(subscription(channel._id))
  }

  return (
    <Container>
    {currentVideo &&
     <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} controls/>
          <Title>{currentVideo.title}</Title>
          <Details>
            <Info>{currentVideo.views} views   {format(currentVideo.createdAt) }</Info>

            <Buttons>
              <Button onClick={handleLike}>
                {currentVideo.likes.includes(user._id) ? <ThumbUpIcon/> : <ThumbUpOutlinedIcon /> }
              
                {currentVideo.likes?.length}
              </Button>
              <Button onClick={handleDislike}>
              {currentVideo.dislikes.includes(user._id) ? <ThumbDownIcon/> :   <ThumbDownOffAltOutlinedIcon /> }
              
              {currentVideo.dislikes?.length} Dislike
              </Button>
              <Button>
                <ShareOutlinedIcon />
                Share
              </Button>
              <Button>
                <SaveAltOutlinedIcon />
                Save
              </Button>
            </Buttons>
          </Details>
          <Hr />
          <Channel>
            <ChannelInfo>
              <Image src={channel.img} />
              <ChannelDetails>
                <ChannelName>{channel.name}</ChannelName>
                <ChannelCounter>{channel.subscribers} subscriber</ChannelCounter>
                <Description>
                 {currentVideo.desc}
                </Description>
              </ChannelDetails>
            </ChannelInfo>
            <Subscribe onClick={handleSub}>{user.subscibedUsers?.includes(channel._id)? "SUBSCRIBED" : "UNSUBSCRIBED"}</Subscribe>
          </Channel>
          <Hr />
          <Comments videoId={currentVideo._id}/>
        </VideoWrapper>
      </Content>}

      <Recommendation tags={currentVideo?.tags}/>
     
    </Container>
  );
}

export default Video;
