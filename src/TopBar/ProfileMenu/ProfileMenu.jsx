// src/ProfileMenu.js
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option) => {
    console.log(`${option} clicked`);
    handleClose();
    // Add navigation or other logic here as needed
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        size="large"
        aria-label="profile"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleOpen}
        color="inherit"
      >
        <AccountCircleIcon />
      </IconButton>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick("View Profile")}>
          View Profile
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("My Orders")}>
          My Orders
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("Logout")}>Logout</MenuItem>
      </Menu>
    </>
  );
}
