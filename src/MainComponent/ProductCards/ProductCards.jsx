// src/ProductCards.js
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
// import useProduct from "../MainComponent/useProduct";




// const addToCart = (product)=>{
    // cart.name=product.name;
    // cart.price=product.price
    // cart.quantity=product.quantity
//     addProduct(cart);
// };
export default function ProductCards({addToCart,products }) {
// const { product: products, addProduct } = useProduct();
  return (
    <Grid container spacing={3}>
      {products.map(product => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt={product.name}
              height="140"
              image={product.image}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {product.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                ${product.price.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Stock: {product.quantity}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => addToCart({
                  id:product.id,
                      name:product.name,
                      price:product.price,
                      quantity:product.quantity
                })}
                disabled={product.stock === 0}
              >
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}