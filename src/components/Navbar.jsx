import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import VideocamIcon from '@mui/icons-material/Videocam';
import Upload from './Upload'


const Container = styled.div`
  position: sticky;
  top: 0;
  height: 56px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  height: 100%;
  padding: 0 20px;
  position: relative;
`;

const Search = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 5px;
  color: ${({ theme }) => theme.text};

`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text};

`;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  font-weight: 500;
  border-radius: 3px;
  color: #3ea6ff;
  width: max-content;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor:pointer;
`;

const User = styled.div`
display:flex;
align-items:center;
gap:10px;
font-weight:500;

`
const Image = styled.img`
width: 30px;
height:30px;
border-radius:50%;
background-color: gray;
`

const UserName = styled.span`
`

function Navbar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState("")

  const {user} = useSelector((state)=>state.user)

  return (
    <>
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder="Search" onChange={(e)=>setQ(e.target.value)}/>
          <SearchIcon onClick={()=>navigate(`/search?q=${q}`)}/>
        </Search>
        {user ? 
        <User>
          <VideocamIcon onClick={()=>setOpen(true)}/>
          <Image src={user?.img} />
          <UserName>{user.name}</UserName>
        </User>
        :
        <Link to="signin" style={{ textDecoration: "none" }}>
          <Button>
            <AccountCircleIcon />
            SIGNIN
          </Button>
        </Link>}

      </Wrapper>
    </Container>
    {open && <Upload setOpen={setOpen} />}
    </>
  );
}

export default Navbar;
