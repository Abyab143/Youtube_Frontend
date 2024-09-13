import React, { useContext, useEffect, useState } from "react";
import Youimg from "../assets/Vidioimg.webp";
import styled from "styled-components";
import Comment from "./Comment";
import context from "../context/AuthContext";
import axios from "axios";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  flexdirection: row;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;
const Button = styled.button`
  padding: 10px;
  border: 1px solid red;
  border-radius: 10%;
  background-color: red;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const Comments = ({ vidio, path }) => {
  const auth = useContext(context);
  const [coment, setcoment] = useState("");
  const [fetchComent, setComo] = useState([]);

  const FetchComent = async () => {
    let data = await axios.get(`https://abyabtube.onrender.com/api/comments/${path}`);
    // console.log(data.data);
    setComo(data.data);
  };

  useEffect(() => {
    FetchComent();
  }, [path,coment]);

  //TODO: ADD NEW COMMENT FUNCTIONALITY

  const PostComments = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://abyabtube.onrender.com/addcoment", {
        VidioId: vidio._id,
        userId: auth.user._id,
        Comment: coment,
      });
      FetchComent();
      alert("Comment added successfully");
      setcoment("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      {auth.isAuthenticated && (
        <NewComment>
          <Avatar src={auth.user.img} />
          <Input
            placeholder="Add a comment..."
            type="text"
            value={coment}
            onChange={(e) => setcoment(e.target.value)}
          />
          <Button onClick={PostComments}>Comment</Button>
        </NewComment>
      )}

      {fetchComent.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
