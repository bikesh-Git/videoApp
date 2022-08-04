import React from "react";
import styled from "styled-components";
import LogoIMG from "../img/IMG_20200825_125945.jpg";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import RestoreIcon from "@mui/icons-material/Restore";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import LightModeIcon from "@mui/icons-material/LightMode";
import ReportIcon from "@mui/icons-material/Report";
import HelpIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;
const Image = styled.img`
  height: 25px;
  width:25px;
  
  background-color: ${({ theme }) => theme.soft};

`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;
const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const Login = styled.div`
  display: flex;
  flex-direction: column;
`;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  font-weight: 500;
  border-radius: 3px;
  color: #3ea6ff;
  width: max-content;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.div`
  font-size: 14px;
  margin-bottom: 20px;
  font-weight: 500;
  color: #aaaaaa;
`;

function Menu({ darkMode, setDarkMode }) {

 const {user} = useSelector((state)=>state.user)

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Image src={user?.img} />
            Vizziee
          </Logo>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
        <Item>
          <HomeIcon /> Home
        </Item>
        </Link>
        <Link to="trend"  style={{ textDecoration: "none" }}>
          <Item>
            <ExploreIcon /> Explore
          </Item>
        </Link>
        <Link to="subcriptions"  style={{ textDecoration: "none" }}>
          <Item>
            <SubscriptionsIcon /> Subscription
          </Item>
        </Link>
        <Hr />
        {!user && 
        <>
        <Login>
          Sign in to like videos, comment and subscribe channels.
          <Link to="signin" style={{ textDecoration: "none" }}>
            <Button>
              <AccountCircleIcon />
              SIGNIN
            </Button>
          </Link>
        </Login>
        <Hr />
        </>}
        <Title>best of Bikesh Verma</Title>
        <Item>
          <VideoLibraryIcon /> Library
        </Item>
        <Item>
          <RestoreIcon /> History
        </Item>
        <Hr />
        <Item>
          <LibraryMusicIcon /> Music
        </Item>
        <Item>
          <SportsBasketballIcon /> Sports
        </Item>
        <Item>
          <SportsEsportsIcon /> Gaming
        </Item>
        <Item>
          <NewspaperIcon /> News
        </Item>
        <Item>
          <LiveTvIcon /> Live
        </Item>
        <Hr />
        <Item>
          <SettingsIcon /> Setting
        </Item>
        <Item>
          <ReportIcon /> Report
        </Item>
        <Item>
          <HelpIcon /> Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <LightModeIcon /> {darkMode ? "Dark Mode" : "Light Mode"}
        </Item>
      </Wrapper>
    </Container>
  );
}

export default Menu;
