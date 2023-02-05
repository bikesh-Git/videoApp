import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div``;
const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: gray;
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  padding: 5px;
  outline: none;
  width: 100%;
`;

function Comments({videoId}) {
  const [comments, setComments] = useState([]);
  const {user} = useSelector((state)=>state.user)

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/comments/${videoId}`);
      setComments(res.data);
      console.log("commests", res.data);
    };
    fetchComments();
  }, [videoId]);
  return (
    <Container>
      <NewComment>
        <Avatar src={user.img} />
        <Input placeholder="add a comment" />
      </NewComment>

      {comments.map((el) => {
        <Comment key={el._id} comment={el} />;
      })}
    </Container>
  );
}

export default Comments;
