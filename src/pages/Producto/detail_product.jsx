import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((item) => item.id === id);
      setProduct(foundProduct);
    }
  }, [id, products]);

  if (products.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={4}
      bgcolor={theme.palette.background.default}
      minHeight="100vh"
    >
      <Card sx={{ maxWidth: 600, width: "100%", boxShadow: 5 }}>
        <CardMedia
          component="img"
          height="300"
          image={product.imagen} // Asegúrate de que product.image es "https://loremflickr.com/640/480/animals"
          alt={product.name}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            {product.name}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" fontWeight="medium" gutterBottom>
            ${product.price}
          </Typography>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                <strong>Stock:</strong> {product.stock}
              </Typography>
            </Grid>
          </Grid>
          {/* Aquí puedes añadir más campos si tu producto tiene otros detalles */}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetails;
