// src/CartMenu.js
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function CartMenu({ products }) {
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
        <Badge badgeContent={products.length} color="error">
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
        PaperProps={{ style: { maxHeight: 300, width: '300px' } }}
      >
        {products.length === 0 && (
          <MenuItem disabled>
            <Typography variant="body2">No products added</Typography>
          </MenuItem>
        )}

        {products.map((product, index) => (
          <MenuItem key={index} onClick={handleClose} sx={{ whiteSpace: 'normal' }}>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Qty: {product.quantity} | Price: ${product.price.toFixed(2)}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
