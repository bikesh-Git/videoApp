import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Card from '../components/Card'

const Conatiner = styled.div`
display:flex;
gap:20px;
flex-wrap:wrap;
// justify-content:space-between;
`

function Search() {
    const query = useLocation().search
    const [videos, setVideos] = useState([])

    useEffect(() => {
      const fetchVideos = async()=>{
        const res = await axios.get(`https://videoapp13.herokuapp.com/api/videos/search${query}`)
        setVideos(res.data)
      }
    fetchVideos()
    }, [query])

  return (
    <Conatiner>
         {videos.map(video=>
        <Card key={video._id} video={video}/>
        )}
    </Conatiner>
  )
}

export default Search