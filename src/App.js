import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import PageSystem from "./pages/PageSystem";
import PageLogin from "./pages/PageLogin";
import { useAuth } from "./hooks/useAuth";

import "./styles.css";

export default function App() {
  // console.log(useAuth())
  const { user } = useAuth();

  const [pageType, setPageType] = useState("Mainpage");

  return (
    <>
      <div>
        <MenuAppBar setPageType={setPageType} />
        {user ? <PageSystem pageType={pageType} /> : <PageLogin />}
      </div>
    </>
  );
}

function MenuAppBar(props) {
  const { setPageType } = props;

  const { user, signOutWithEmailAndPassword } = useAuth();

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            onClick={() => setPageType("Mainpage")}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            STODICTOR
          </Typography>
          {user && (
            <div>
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
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    setPageType("Account");
                    handleClose();
                  }}
                >
                  Account Settings
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    signOutWithEmailAndPassword();
                  }}
                >
                  Log out
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
