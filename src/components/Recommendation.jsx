import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from "../components/Card";


const Conatainer = styled.div`
  flex: 2;
`;
function Recommendation({tags}) {
    const [videos, setVideos] = useState([])

    useEffect(() => {
      const fetchVideos = async()=>{
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/videos/tags?tags=${tags}`)
        setVideos(res.data)
        console.log(res.data)
      }
    fetchVideos()
    }, [tags])


  return (
    <Conatainer>
        {videos.map(el=>
        <Card type="sm" key={el._id} video={el}/>
        )  }
    </Conatainer>
  )
}

export default Recommendation