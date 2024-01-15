import React, { useContext, useEffect, useState } from "react";
import Youimg from "../assets/Vidioimg.webp";
import styled from "styled-components";
import Comments from "../Components/Comments";
import Recomend from "../Components/Recomend";
import axios from "axios";
import { useLocation } from "react-router-dom";
import context from "../context/AuthContext";
const Container = styled.div`
  display: flex;
`;
const VidioWrappper = styled.div``;

const VidioFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin: 10px;
  color: ${({ theme }) => theme.text};
`;
const Channel = styled.div`
  display: flex;
  color: ${({ theme }) => theme.text};
`;
const Channelimg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;
const ChannelNmae = styled.div``;
const Subscriber = styled.div`
  margin-top: 5px;
`;
const Button = styled.div`
  display: flex;
  margin-left: 20px;
`;
const Join = styled.button`
  padding: 10px;
  border: 1px solid red;
  border-radius: 10%;
  background-color: red;
  font-weight: bold;
  margin-left: 20px;
  color: ${({ theme }) => theme.text};
`;
const Subscribed = styled.button`
  padding: 10px;
  border: 1px solid red;
  border-radius: 10%;
  background-color: red;
  font-weight: bold;
  margin-left: 20px;
  color: ${({ theme }) => theme.text};
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 5;
  margin: 10px;
`;
const Hr = styled.hr`
  margin: 15px 5px 5px 5px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const Details = styled.div`
  background-color: black;
  color: white;
  margin: 5px;
  padding: 10px;
`;
const Area = styled.div`
  width: 450px;
  margin-left: 10px;
`;

function Video() {
  const [vidio, setVidio] = useState({});
  const [recomend, setrecomend] = useState([]);
  const [channel, setChannel] = useState({});
  const path = useLocation().pathname.split("/")[2];
  const auth = useContext(context);
  useEffect(() => {
    const fetchReco = async () => {
      const res = await axios.get(`/api/vidio/random`);
      setrecomend(res.data);
    };
    fetchReco();
    fetchChannel();
  }, []);

  const fetchChannel = async () => {
    let video = await axios.get(`/api/vidio/find/${path}`);
    setVidio(video.data);
    const res = await axios.get(`/api/auth/getuser/${video.data.userId}`);
    setChannel(res.data);
  };

  const Subscription = async () => {
    auth.user.subscribedUsers.includes(channel._id)
      ? await axios.put(`/api/auth/unsub/${channel._id}`)
      : await axios.put(`/api/auth/sub/${channel._id}`);
    fetchChannel();
    return;
   
  };

  return (
    <Container id="Vidio">
      <Content>
        <VidioWrappper>
          <VidioFrame src={vidio.VidioUrl} controls />
        </VidioWrappper>
        <Title>{vidio.title}</Title>
        <Channel>
          <Channelimg src={channel.img} />
          <Info>
            <ChannelNmae>{channel.name}</ChannelNmae>
            <Subscriber>{channel.subscribers}</Subscriber>
          </Info>
          <Button>
            <Join>Join</Join>
            {auth.isAuthenticated && (
              <Subscribed onClick={Subscription}>
                {auth.user.subscribedUsers?.includes(channel._id)
                  ? "UNSUBSCRIBE"
                  : "SUBSCRIBE"}
              </Subscribed>
            )}
          </Button>
        </Channel>
        <Hr />
        <Details>{vidio.description}</Details>
        <Comments vidio={vidio} path={path} />
      </Content>
      <Area id="reco">
        {recomend.map((content) => (
          <Recomend
            key={content._id}
            content={content}
            setVidio={setVidio}
            setChannel={setChannel}
          />
        ))}
        ;
      </Area>
    </Container>
  );
}

export default Video;
