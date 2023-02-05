import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";

const Conatiner = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  justify-content: space-between;
  padding:15px;
 
`;

function Home({type}) {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
  const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/videos/${type}`);
      setVideo(res.data);
    };
    fetchVideos();
  }, []);

  return (
    <Conatiner>
      {video.map((video) => (
        <Card key={video._id} video={video}/>
      ))}
    </Conatiner>
  );
}

export default Home;
