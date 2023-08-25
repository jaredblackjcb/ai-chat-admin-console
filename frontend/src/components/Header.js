import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { Grid } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header(props) {
  // Destructure any properties that were set in userReducers slice.reducers
  const { userInfo, error, loading } = useSelector((state) => state.user || {});
  const [anchorEl, setAnchorEl] = useState(null);
  console.log("header " + userInfo);
  console.log("header " + error);
  console.log("header " + loading);
  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item></Grid>
          <Grid item>
            {userInfo && (
              <div>
                <Grid container justifyContent={"space-between"} alignItems={"center"}>
                  {/* Only display username on larger screens */}
                  <Grid id="account-username" item sx={{ display: { xs: "none", sm: "block" } }}>
                    <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
                      {userInfo.first_name || userInfo.username}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                  </Grid>
                </Grid>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {/* Dropdown menu options */}
                  <MenuItem component={Link} to="/dashboard" onClick={handleClose}>
                    <ChatIcon sx={{ mr: 1 }} />
                    Chatbots
                  </MenuItem>
                  <MenuItem component={Link} to="/subscription/manage" onClick={handleClose}>
                    <CreditCardIcon sx={{ mr: 1 }} />
                    Manage Subscription
                  </MenuItem>
                  <MenuItem component={Link} to="/profile" onClick={handleClose}>
                    <ManageAccountsIcon sx={{ mr: 1 }} />
                    My Account
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ mr: 1 }} />
                    Sign Out
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>

    //   <Navbar bg="light" expand="sm" id="navbarBlur" sticky="top">
    //     <Navbar.Toggle aria-controls="navbar" />
    //     <Navbar.Collapse id="navbar">
    //       <div className="ms-md-auto pe-md-3 d-flex align-items-center"></div>
    //       <NavDropdown
    //         title={
    //           <>
    //             {<img className="navbar-avatar" src={userInfo.avatar} alt="User Avatar" />}
    //             {userInfo.first_name || userInfo.username}
    //           </>
    //         }
    //         id="dropdownMenuButton1"
    //         align="end"
    //       >
    //         <NavDropdown.Item as={Link} to="/profile">
    //           <span className="pg-icon">
    //             <i className="fa fa-user"></i>
    //           </span>
    //           <span>Profile</span>
    //         </NavDropdown.Item>
    //         {/* <NavDropdown.Item as={Link} to="/subscriptions/subscription_details">
    //             <span className="pg-icon">
    //               <i className="fa fa-repeat"></i>
    //             </span>
    //             <span>Manage Subscription</span>
    //           </NavDropdown.Item> */}
    //         <NavDropdown.Item as={Link} to="/changePassword">
    //           <span className="pg-icon">
    //             <i className="fa fa-unlock-alt"></i>
    //           </span>
    //           <span>Change Password</span>
    //         </NavDropdown.Item>
    //         <NavDropdown.Item onClick={logoutHandler}>
    //           <span className="pg-icon">
    //             <i className="fa fa-sign-out"></i>
    //           </span>
    //           <span>Sign Out</span>
    //         </NavDropdown.Item>
    //       </NavDropdown>
    //     </Navbar.Collapse>
    //   </Navbar>
  );
}
