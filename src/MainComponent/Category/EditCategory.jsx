import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import { Button, TextField, Paper, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  margin: "10px",
}));

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export default function EditCategory({ onCategoryAdded, categoryId }) {
  const [state, setState] = useState({ right: false });
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [formData, setFormData] = useState({
    id: "",
    categoryCode: "",
    categoryName: "",
    description: "",
    date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  });

  // Fetch category data when drawer opens
  const getCategory = () => {
    axios
      .get("http://localhost:8080/inventry/category/" + categoryId)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        return response.data;
      })
      .then((data) => {
        // If date comes as string, parse it properly
        const formattedDate = dayjs(data.date);
        setFormData({
          ...data,
          date: formattedDate.format("YYYY-MM-DD HH:mm:ss"),
        });
        setSelectedDate(formattedDate);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Drawer toggle logic
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    // Only fetch data when opening drawer
    if (open) {
      getCategory();
    }
    setState({ ...state, [anchor]: open });

    // When closing, call onCategoryAdded callback (assumes parent refresh)
    if (!open) {
      onCategoryAdded && onCategoryAdded();
    }
  };

  // Show toast helper
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

  // Handle form field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle date change from picker
  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    setFormData((prevData) => ({
      ...prevData,
      date: newValue.format("YYYY-MM-DD HH:mm:ss"),
    }));
  };

  // Update category API call
  const updateCategory = async (category) => {
    try {
      const response = await axios.put(
        "http://localhost:8080/inventry/category",
        category
      );
      if (response.status === 201) {
        showToast(category.categoryName + " Updated");
        return true;
      } else {
        showToast(category.categoryName + " Not Updated");
        return false;
      }
    } catch (error) {
      showToast("Failed to update category");
      console.error(error);
      return false;
    }
  };

  // Form submit handler
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("form updated");
    console.log(formData);

    const success = await updateCategory(formData);
    if (success) {
      // Close drawer only after successful update
      setState({ right: false });
      onCategoryAdded && onCategoryAdded(); // inform parent to refresh, if needed
    }
  };

  const list = () => (
    <FormContainer>
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        fontWeight="bold"
        style={{ color: "blue" }}
      >
        Edit Category
      </Typography>
      <Form onSubmit={handleFormSubmit}>
        <TextField
          name="id"
          label="ID"
          variant="outlined"
          value={formData.id}
          onChange={handleInputChange}
          disabled
        />
        <TextField
          name="categoryCode"
          label="Category Code"
          variant="outlined"
          value={formData.categoryCode}
          onChange={handleInputChange}
          required
        />
        <TextField
          name="categoryName"
          label="Category Name"
          variant="outlined"
          value={formData.categoryName}
          onChange={handleInputChange}
          required
        />
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          value={formData.description}
          onChange={handleInputChange}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["MobileDateTimePicker"]}>
            <MobileDateTimePicker
              label="Date"
              value={selectedDate}
              onChange={handleDateChange}
              slotProps={{
                textField: { variant: "outlined" },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Form>
    </FormContainer>
  );

  return (
    <div>
      <Button
        variant="contained"
        onClick={toggleDrawer("right", true)}
        sx={{ "& .MuiDataGrid-cell:focus": { outline: "none" } }}
        startIcon={<EditIcon />}
      >
        Edit Category
      </Button>
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list()}
      </Drawer>
    </div>
  );
}
