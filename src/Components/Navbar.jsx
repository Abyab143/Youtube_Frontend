import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate } from "react-router-dom";
import context from "../context/AuthContext";
import { useContext, useState } from "react";
import Create from "./Create";
const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
  margin-left: 20px;
`;
const Hiden = styled.div`
  color: red;
  cursor: pointer;
`;

function Navbar() {
  const auth = useContext(context);
  const [open, setopen] = useState();
  const currentUser = auth.isAuthenticated;

  const setHidden = () => {
    auth.close && auth.setclose(false);
    !auth.close && auth.setclose(true);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Hiden onClick={setHidden}>X</Hiden>
          <Search id="search">
            <Input
              placeholder="Search"
              // onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlinedIcon onClick={() => navigate(`/search?q=${q}`)} />
          </Search>
          {currentUser ? (
            <User id="avtar">
              <VideoCallOutlinedIcon onClick={() => setopen(true)} />
              <Avatar src={auth.user.img} />
              {auth.username}
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button id="avtar">
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Create setopen={setopen} />}
    </>
  );
}

export default Navbar;