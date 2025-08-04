// src/ProductCards.js
import React, { useCallback, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { Stack, TextField } from "@mui/material";
import ProductForm from "./ProductForm";
import Login from "../../AuthComponent/LogIn";
import { toast } from "react-toastify";
import { useCart } from "../../CartProvider"; 

const formatDateString = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};
export default function ProductCards() {
  // const { product: products, addProduct } = useProduct();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const {addToCart, getCart} = useCart();
  const fetchData = useCallback(() => {
    axios
      .get("http://localhost:8080/inventry/product")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        return response.data;
      })
      .then((data) => {
        const formattedData = data.map((item) => ({
          ...item,
          date: formatDateString(item.date),
        }));
        setProducts(formattedData);
        setFilteredProducts(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    fetchData(); // Use the memoized callback here
  }, [fetchData]);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    if (value.trim() === "") {
      setFilteredProducts(products); // Display all data when search query is empty
    } else {
      console.log(products, "products");
      console.log(value, "value");
      const filteredData = products.filter((product) =>
        Object.values(product).some(
          (val) =>
            val !== null &&
            val !== undefined &&
            val.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
      setFilteredProducts(filteredData);
    }
  };

  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };

  const toggleEditDrawer = (open) => {
    setIsEditDrawerOpen(open);
  };

  const addProductAndUpdate = async () => {
    try {
      console.log("Updating Product list...");
      await fetchData(); // Fetch updated category list
    } catch (error) {
      console.error("Error updating Product list:", error);
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
const addToCartHandle = async(id)=>{
  
    console.log("Product Id:", id);
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user,"user")
    if(user){
      await addToCart({
        userId:user.id,
        productId:id
      });
      await getCart(user.id);
    }else{
      setLoginOpen(true);
    }
    // TODO: Implement actual signup API call here
    // After successful signup, you might want to login the user automatically:
    
}
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
      console.log(response);
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
        if (response.status === 200) {
  const userData = {
    id: response.data.id,
    userName: response.data.userName,
    firstName: response.data.firstName
  };
  localStorage.setItem("user", JSON.stringify(userData));
  showToast("Logged In Success");
  getCart(userData.id); // <-- Fetch cart
}
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
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        sx={{ justifyContent: "flex-end", marginBottom: "10px" }}
      >
        <TextField
          id="standard-basic"
          label="Search Category"
          variant="standard"
          value={searchQuery}
          onChange={handleSearch}
        />

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <ProductForm
            open={isDrawerOpen}
            onClose={() => toggleDrawer(false)}
            anchor="right"
            onProductAdded={addProductAndUpdate}
          />
        </Grid>
      </Stack>
      <div style={{ overflowX: "auto" }}>
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
              <Card
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  alt={product.name}
                  image={
                    product.imagePath &&
                    `http://localhost:8080/inventry/productImage?imagePath=${product.imagePath}`
                  }
                  sx={{
                  height:"100%",
                    objectFit: "contain",
                    objectPosition: "center",
                    backgroundColor: "#f5f5f5",
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.productName}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    ${product.price ? product.price.toFixed(2) : 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stock: {product.qty}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => addToCartHandle(product.id)}
                    disabled={product.stock === 0}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <Login
              open={isLoginOpen}
              onClose={() => setLoginOpen(false)}
              onLogin={handleLogin}
            />
    </>
  );
}
