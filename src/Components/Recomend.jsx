import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Youimg from "../assets/Vidioimg.webp";
import { Link } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  display: flex;
  margin-top:10px;
`;
const VidioWrappper = styled.div``;
const VidioFrame = styled.img`
  height:100px;
  width: 150px;
   border-radius: 10px;
`;
const Text = styled.div`
margin-left:5px;
padding:10px;
`;
const Title = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.text};
`;
const Views = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.textSoft};
`;
const ChannelName = styled.div`
font-size: 18px;
font-weight: 400;
margin-top:5px 0px 5px 0px;
color: ${({ theme }) => theme.textSoft};
`;

function Recomend({setVidio,content,setChannel}) {
  const [curchannel, setcurChannel] = useState({});

  const setCurVidio = async()=>{
    let video = await axios.get(`https://abyabtube.onrender.com/api/vidio/find/${content._id}`);
    setVidio(video.data);
    const res = await axios.get(`https://abyabtube.onrender.com/api/auth/getuser/${content.userId}`);
    setChannel(res.data);
  }

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`https://abyabtube.onrender.com/api/auth/getuser/${content.userId}`);
      setcurChannel(res.data);
    };
    fetchChannel();
  }, []);
  return (
    <Container onClick={setCurVidio}>
      <VidioWrappper>
        <VidioFrame src={content.thumbnail}/>
      </VidioWrappper>
      <Text id="text">
        <Title>{content.title}</Title>
        <ChannelName>{curchannel.name}</ChannelName>
        <Views>{content.views}-views</Views>
      </Text>
    </Container>
    
  );
}

export default Recomend;
