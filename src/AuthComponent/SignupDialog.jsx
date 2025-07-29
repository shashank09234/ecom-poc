import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function SignupDialog({ open, onClose, onSignup }) {
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
    onSignup(formData);
    // Optionally clear form and close dialog
    setFormData({
      firstName: "",
      lastName: "",
      userName: "",
      emailId: "",
      mobileNumber: "",
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
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
          />
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
            label="Email ID"
            name="emailId"
            type="email"
            value={formData.emailId}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Mobile Number"
            name="mobileNumber"
            type="tel"
            value={formData.mobileNumber}
            onChange={handleChange}
            inputProps={{ maxLength: 10, pattern: "\\d{10}" }}
            helperText="Enter a 10-digit mobile number"
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
