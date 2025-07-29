import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function Login({ open, onClose,onLogin}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    emailId: "",
    mobileNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
    // Optionally clear form and close dialog
    setFormData({
      userName: "",
      password: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Account</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2, minWidth: 400 }}
          noValidate
        >
          
          <TextField
            required
            label="Username"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            fullWidth
          />
          
          <TextField
            required
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
          />
          <DialogActions sx={{ px: 0 }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Sign Up
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
