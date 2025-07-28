import {useState} from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import SearchIcon from "@mui/icons-material/Search";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import CartMenu from "./CartMenu/CartMenu";
// import { getProducts } from "../ProductCards/useCart";
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  paddingLeft: theme.spacing(2),
  width: '200px',
}));


// const productsInCart = getProducts();
export default function TopBar({ topBarWidth,cart}) {
    const [showSearch, setShowSearch] = useState(false);
  const toggleSearch = () => {
    setShowSearch(prev => !prev);
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${topBarWidth ? topBarWidth : 60}px)`,
        marginLeft: topBarWidth ? `${topBarWidth}px` : 60,
        backgroundColor: "#1e293b",
        height: "auto",
        pb: '8px'
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ color: "#fff" }}>
          User Management
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {showSearch && (
            <Search>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                autoFocus
              />
            </Search>
          )}
          <IconButton size="large" aria-label="search" sx={{ color: "#fff" }} onClick={toggleSearch}>
            <SearchIcon />
          </IconButton>

          <CartMenu products={cart} />

         <ProfileMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
