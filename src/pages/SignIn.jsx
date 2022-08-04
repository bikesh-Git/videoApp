import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import {signInWithPopup} from 'firebase/auth'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
  flex-direction: column;
`;
const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
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
  border: none;
  background-color: transparent;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.soft};
  width: 100%;
  border-radius: 3px;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  backgrond-color: 1px solid ${({ theme }) => theme.soft};
  color: 1px solid ${({ theme }) => theme.textSoft};
`;
const More = styled.div`
  display: flex;
  color: 1px solid ${({ theme }) => theme.textSoft};
  font-size: 12px;
    margin-top:10px;
`;

const Links = styled.div`
margin-left:50px;
`;
const Link = styled.span`
margin-left:30px;
`;

function SignIn() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const dispatch =  useDispatch()

  const handleLogin =async(e)=>{
    e.preventDefault()
    dispatch(loginStart())

    try{
      const res = await axios.post(`https://videoapp13.herokuapp.com/api/auth/signin`,{name,password},{withCredentials:"include"})
      dispatch(loginSuccess(res.data))

    }
    catch(err){
      setError(err.response.data.message)
      console.log("error",err.response)
      dispatch(loginFailure())
    }
  }

  const signInWithGoogle = async(e)=>{
    e.preventDefault()
    dispatch(loginStart())
   
    signInWithPopup(auth,provider).then((result)=>{
     axios.post("api/auth/google",{
        name:result.user.displayName,
        email:result.user.email,
        img:result.user.photoURL
      }).then((res)=>{
        dispatch(loginSuccess(res.data))
      })
    
    }).catch((err)=>{
      dispatch(loginFailure())
    })
  }

  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <SubTitle>to continue dexter gaming</SubTitle>
        <Input placeholder="username" onChange={(e)=>setName(e.target.value)}/>
        <Input placeholder="password"  onChange={(e)=>setPassword(e.target.value)}/>
        <Button onClick={handleLogin}>sign in</Button>
        <Title>Or</Title>
        <Button onClick={signInWithGoogle} >SignIn with google</Button>
        <Title>Or</Title>
        <Input placeholder="username"  onChange={(e)=>setName(e.target.value)} />
        <Input placeholder="email"  onChange={(e)=>setEmail(e.target.value)}/>
        <Input placeholder="password"  onChange={(e)=>setPassword(e.target.value)}/>
        <Button>create new account</Button>
      </Wrapper>
      {error && <span>{error}</span>}
      <More>
        English(india)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
}

export default SignIn;
