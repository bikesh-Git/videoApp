import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";

const Conatiner = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  justify-content: space-between;
 
`;

function Home() {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get("https://videoapp13.herokuapp.com/api/videos/random");
      setVideo(res.data);
    };
    fetchVideos();
  }, []);

  return (
    <Conatiner>
      {video.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Conatiner>
  );
}

export default Home;
