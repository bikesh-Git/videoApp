import styledEngine from "@mui/styled-engine";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;

`;
const Wrapper = styled.div`
  height: 600px;
  width: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  z-index:1;
`;
const Close = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: 1ps solid ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: 1ps solid ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
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

const Label = styled.label`
  font-size: 14px;
`;

function Upload({ setOpen }) {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);

  const navigate = useNavigate()
  

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;

          default:
            break;
        }
      },
      (error) => {},
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video ,"videoUrl");
  }, [video]);
  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload =async(e)=>{
    e.preventDefault()
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/videos`,{
      ...inputs,tags
    })
    setOpen(false)

    res.status === 200 && navigate(`${process.env.REACT_APP_BASE_URL}/video/${res.data._id}`)
     console.log("sss",res.data)
  }
  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a new video</Title>
        <Label>Video:</Label>
       { videoPerc > 0 ? ("uploading Video"+ videoPerc + "%") :
        <Input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
        />}
        <Input type="text" name="title" required placeholder="Title" onChange={handleChange} />
        <Desc placeholder="Desciption" name="desc" required rows={8} onChange={handleChange} />
        <Label>Image:</Label>
       {imgPerc > 0 ? ("uploading Image"+ imgPerc + "%" ):
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
        />}
        <Input
          type="text"
          placeholder="Separate tags with comas."
          onChange={handleTags}
        />
        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
}

export default Upload;
