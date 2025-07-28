import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import useProduct from "./useProduct";

export default function AddProduct({addProduct}) {
  // useProduct hook provides the product list and addProduct function
//   const { product, addProduct } = useProduct();

  // Local form state separate from the product list
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    quantity: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  // Validation logic on form values
  const validate = () => {
    const errs = {};
    if (!formState.name.trim()) errs.name = "Product name is required";
    if (!formState.price || isNaN(formState.price) || Number(formState.price) <= 0)
      errs.price = "Valid price is required";
    if (
      formState.quantity === "" ||
      isNaN(formState.quantity) ||
      Number(formState.quantity) < 0
    )
      errs.quantity = "Valid quantity is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Update local form state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // On form submit, validate and add product via hook
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Prepare product data by converting strings to appropriate types
    const newProduct = {
      name: formState.name.trim(),
      price: Number(formState.price),
      quantity: Number(formState.quantity),
      image: formState.image.trim(),
    };
    console.log(newProduct)
    addProduct(newProduct);

    // Reset the form after adding the product
    setFormState({ name: "", price: "", quantity: "", image: "" });
    setErrors({});
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        maxWidth: 400,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        bgcolor: "#f5f5f5",
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <Typography variant="h6" component="h2" align="center">
        Add New Product
      </Typography>

      <TextField
        label="Product Name"
        name="name"
        value={formState.name}
        onChange={handleChange}
        error={Boolean(errors.name)}
        helperText={errors.name}
        required
      />

      <TextField
        label="Price"
        name="price"
        type="number"
        inputProps={{ step: "0.01" }}
        value={formState.price}
        onChange={handleChange}
        error={Boolean(errors.price)}
        helperText={errors.price}
        required
      />

      <TextField
        label="Available Stock"
        name="quantity"
        type="number"
        inputProps={{ min: 0 }}
        value={formState.quantity}
        onChange={handleChange}
        error={Boolean(errors.quantity)}
        helperText={errors.quantity}
        required
      />

      <TextField
        label="Product Image URL"
        name="image"
        value={formState.image}
        onChange={handleChange}
        placeholder="https://example.com/image.jpg"
      />

      <Button variant="contained" color="primary" type="submit">
        Add Product
      </Button>
    </Box>
  );
}
