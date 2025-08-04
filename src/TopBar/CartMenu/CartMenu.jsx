import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../../CartProvider";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography } from "@mui/material";

export default function CartMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { cart, getCart } = useCart();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.id) {
      getCart(user.id);
    }
  }, []); // 👈 No infinite loop

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
        <Badge badgeContent={cart.length} color="error">
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
      >
        {cart.length === 0 ? (
          <MenuItem disabled>
            <Typography variant="body2">No products added</Typography>
          </MenuItem>
        ) : (
          cart.map((product, index) => (
            <MenuItem key={index} onClick={handleClose} sx={{ whiteSpace: "normal" }}>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {product.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Qty: {product.qty} | Price: ${product.productPrice.toFixed(2)}
                </Typography>
              </Box>
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
}
