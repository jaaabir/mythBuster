import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";

export const Navbar = ({ isAuthenticated }) => {
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
  };
  const logoStyle = {
    color: "white",
    letterSpacing: "1.5px",
    fontSize: "22px",
    textDecoration: "none",
    textTransform: "uppercase",
  };
  return (
    <AppBar position="static">
      <Toolbar style={navStyle}>
        <div className="logo">
          <Link to="/">
            <Typography variant="h6" style={logoStyle}>
              Myth buster
            </Typography>
          </Link>
        </div>
        <div>
          <Link to={isAuthenticated ? "/quiz" : "/login"}>
            <IconButton>
              <AccountCircleIcon fontSize="large" />
            </IconButton>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};