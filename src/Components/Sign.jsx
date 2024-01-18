import axios from "axios";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import context from "../context/AuthContext";
import { auth, provider } from "../firebase.config.js";
import { signInWithPopup } from "firebase/auth";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import { responsiveFontSizes } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const Sign = () => {
  const app = useContext(context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://abyabtube.onrender.com/api/auth/signin", { email, password });
      auth.setUsername(res.data.name);
      alert("Login success");
      app.setIsAuthenticated(true);
      app.setuser(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const sign = async () => {
          const res = await axios
            .post("https://abyabtube.onrender.com/api/auth/google", {
              name: result.user.displayName,
              email: result.user.email,
              img: result.user.photoURL,
            })
              alert("Login success");
              app.setIsAuthenticated(true);
              app.setUsername(res.data.name);
              app.setuser(res.data);
              navigate("/");
        };
        sign();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //TODO: REGISTER FUNCTIONALITY
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://abyabtube.onrender.com/api/auth/signup", {
        name,
        email,
        password,
      });

      alert("Register success");
      app.setUsername(res.data.name);
      app.setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to Youtube</SubTitle>
        <Input
          placeholder="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        <Title>or</Title>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignup}>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default Sign;
