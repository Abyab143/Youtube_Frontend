import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
`;

function Home({type}) {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVido = async () => {
      const res = await axios.get(`api/vidio/${type}`);
      setVideos(res.data);
    };
    fetchVido();
  }, []);
  return (
  <Container>
    {videos.map((video) => (
    <Card key={video._id} video={video}/>
  )
  )}
  </Container>);
}

export default Home;
