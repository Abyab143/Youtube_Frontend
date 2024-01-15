import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Youimg from "../assets/Vidioimg.webp";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  width: 360px;
  margin: 10px;
  cursor: pointer;
`;
const Img = styled.img`
  width: 100%;
  height: 202px;
  border-radius:10px;
  flex: 1;
`;
const ChaLogo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const Wrapper = styled.div``;
const Line = styled.div`
  display: flex;
  align-items: center;
`;
const Views = styled.div`
  color: ${({ theme }) => theme.textSoft};
`;
const Title = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10;
  flex: 1;
`;
const Text = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;
const Chaneelname = styled.div`
  color: ${({ theme }) => theme.textSoft};
`;

export default function Card({video}) {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/api/auth/getuser/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, []);
  return (
    <Container id="card">
      <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
        <Img src={video.thumbnail} />
        <Wrapper>
          <Content>
            <Line>
              <ChaLogo src={channel.img} />
              <Text>
                <Title>{video.title}</Title>
                <Chaneelname>{channel.name}</Chaneelname>
                <Views>{video.views}-Views</Views>
              </Text>
            </Line>
          </Content>
        </Wrapper>
      </Link>
    </Container>
  );
}
