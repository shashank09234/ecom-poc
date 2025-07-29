// src/CartMenu.js
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function CartMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        size="large"
        aria-label="cart"
        aria-controls="cart-menu"
        aria-haspopup="true"
        onClick={handleOpen}
        color="inherit"
      >
        <Badge badgeContent="2" color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Menu
        id="cart-menu"
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
        PaperProps={{ style: { maxHeight: 300, width: "300px" } }}
      ></Menu>
    </>
  );
}
