// import MenuItem from "@mui/material/MenuItem";
// import { useAuth } from '../AuthHooks.jsx';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Navbar.css";
import rocket from "../assets/rocket-solid.svg";
import fileIcon from "../assets/file-solid.svg";
import fileIconOrange from "../assets/file-solid-orange.svg";
import briefCaseIcon from "../assets/briefcase-solid.svg";
import briefCaseIconOrange from "../assets/briefcase-solid-orange.svg";
import usersIcon from "../assets/users-solid.svg";
import usersIconOrange from "../assets/users-solid-orange.svg";
import IconButton from "@mui/material/IconButton";
import ForumIcon from "@mui/icons-material/Forum";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Menu, MenuItem } from "@mui/material";
import {useAuth} from '../hooks.js'
// import { fetchCurrentUserData } from '../utils/apiCalls';


export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
//   const { currentUser, updateCurrentUser } = useAuth();
  // const [isSignedIn, setIsSignedIn] = useState(false);
//   const navigate = useNavigate();
  const [activeNavLink, setActiveNavLink] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  //setup----------
  // const userData = fetchCurrentUserData();
  // updateCurrentUser(userData);
  //---------------

  const handleAccountButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    logout()
    navigate('/', { replace: true });
    handleAccountMenuClose();
  }

const handleNavLinkClick = (link) => {
  console.log('link set to: ', link);
  setActiveNavLink(link);
}

useEffect(() => {
  // if pathname does not include /resume or /portfolio or /networking, set activeNavLink to null
  if (location.pathname.includes('/resume-list')) setActiveNavLink('/resume-list');
  else if (location.pathname.includes('/portfolio')) setActiveNavLink('/portfolio');
  else if (location.pathname.includes('/networking')) setActiveNavLink('/networking');
  else setActiveNavLink(null);
}, [location]);

  // useEffect(() => {
  //   const authToken = sessionStorage.getItem('authToken');
  //   if (authToken) {
  //     // setIsSignedIn(true);
      
  //     // Fetch current user data and update the AuthContext
  //     fetchCurrentUserData()
  //       .then(userData => {
  //         updateCurrentUser(userData);
  //       })
  //       .catch(error => {
  //         console.error('Error fetching user data:', error);
  //       });
  //   } else {
  //     // setIsSignedIn(false);
  //   }
  // }, []);

  return (
    <>
      <nav id="navbar">

        <Link to="/" id="logo_name">
          <img id="logo" src={rocket} alt="logo" />
          <h1 id="brand_name">Resume Rocket</h1>
        </Link>

        <div id="nav_links">
          <Link to="/resume-list" className="nav_link" onClick={() => handleNavLinkClick('/resume-list')}>
            <img src={activeNavLink === '/resume-list' ? fileIconOrange : fileIcon} alt="resume" />
            <p>Resume</p>
          </Link>
          <Link to="/portfolio" className="nav_link" onClick={() => handleNavLinkClick('/portfolio')}>
            <img src={activeNavLink === '/portfolio' ? briefCaseIconOrange : briefCaseIcon} alt="portfolio" />
            <p>Portfolio</p>
          </Link>
          <Link to="/networking" className="nav_link" onClick={() => handleNavLinkClick('/networking')}>
            <img src={activeNavLink === '/networking' ? usersIconOrange : usersIcon} alt="networking" />
            <p>Networking</p>
          </Link>
        </div>

        <div id="account_buttons">
          <IconButton aria-label="messaging">
            <ForumIcon fontSize="large" />
          </IconButton>

          <IconButton
            aria-controls="account-menu"
            aria-haspopup="true"
            onClick={handleAccountButtonClick}
            color="inherit"
            size="large"
          >
            <AccountCircleIcon fontSize="large" />
          </IconButton>

          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleAccountMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            getcontentanchorel={null}
          >
            {(
              <MenuItem onClick={handleSignOut}>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Sign Out
                </Link>
              </MenuItem>
            )}
          </Menu>
        </div>
      </nav>
    </>
  );
}
