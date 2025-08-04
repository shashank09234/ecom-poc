import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { useAuth } from "../../AuthProvider";
import SignupDialog from "../../AuthComponent/SignupDialog";
import axios from "axios";
import { toast } from "react-toastify";
import Login from "../../AuthComponent/LogIn";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();
  // const { isLoggedIn, login, logout } = useAuth();

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleMenuItemClick = (option) => {
    handleClose();

    switch (option) {
      case "Login":
        setLoginOpen(true);
        break;
      case "Logout":
        localStorage.removeItem("user")
        navigate('/');
        // logout();
        break;
      case "Signup":
        setSignupOpen(true);
        break;
      default:
        break;
    }
  };

  const showToast = (msg) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 3000, // 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  // Handle signup form submission
  const handleSignup = async (data) => {
    console.log("Signup data submitted:", data);
    // TODO: Implement actual signup API call here
    // After successful signup, you might want to login the user automatically:
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/signup",
        data
      );
      console.log(response);
      if (response.status === 201) {
        localStorage.setItem("user",JSON.stringify({
          id: response.data.id,
          userName: response.data.userName,
          firstName: response.data.firstName
        }))
        // login({
        //   name: data.firstName,
        //   email: data.emailId,
        //   userName: data.userName,
        // });
        showToast("Account Created");
      } else {
        showToast("Account Creation Failed");
      }
      return response;
    } catch (error) {
      showToast("Error adding Product");
      console.error(error);
      throw error; // allow caller to know of failure
    }
  };

  const handleLogin = async (data) => {
    console.log("SigLoginnup data submitted:", data);
    // TODO: Implement actual signup API call here
    // After successful signup, you might want to login the user automatically:
    try {
      console.log(data);
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        data
      );
      console.log(response.data);
      if (response.status === 200) {
        localStorage.setItem("user",JSON.stringify({
          id: response.data.id,
          userName: response.data.userName,
          firstName: response.data.firstName
        }));
        // login({
        //   name: data.firstName,
        //   email: data.emailId,
        //   userName: data.userName,
        // });
        showToast("Logged In Success");
      } else {
        showToast("Logged In Failed");
      }
      return response;
    } catch (error) {
      showToast("Error adding Product");
      console.error(error);
      throw error; // allow caller to know of failure
    }
  };

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
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {localStorage.getItem("user") && (
          <MenuItem onClick={() => handleMenuItemClick("View Profile")}>
            View Profile
          </MenuItem>
        )}
        {localStorage.getItem("user") && (
          <MenuItem onClick={() => handleMenuItemClick("My Orders")}>
            My Orders
          </MenuItem>
        )}
        {localStorage.getItem("user") && (
          <MenuItem onClick={() => handleMenuItemClick("Logout")}>
            Logout
          </MenuItem>
        )}

        {!localStorage.getItem("user") && (
          <MenuItem onClick={() => handleMenuItemClick("Login")}>
            Login
          </MenuItem>
        )}
        {!localStorage.getItem("user") && (
          <MenuItem onClick={() => handleMenuItemClick("Signup")}>
            Signup
          </MenuItem>
        )}
      </Menu>

      <SignupDialog
        open={isSignupOpen}
        onClose={() => setSignupOpen(false)}
        onSignup={handleSignup}
      />
      <Login
        open={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={handleLogin}
      />
    </>
  );
}
