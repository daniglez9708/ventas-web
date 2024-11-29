import React, { useState, useContext } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Chip,
  Divider,
  Stack,
} from "@mui/material";
import {
  RemoveCircleOutline,
  ArrowBack,
  ArrowForward,
} from "@mui/icons-material";
import { ProductContext } from "../../context/ProductContext";

const ProductTransferForm = ({ open, onClose, onSubmit }) => {
  const { products } = useContext(ProductContext);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [step, setStep] = useState(1);

  const resetForm = () => {
    setSelectedProducts([]);
    setQuantities({});
    setStep(1);
  };

  const handleProductSelect = (event, newProducts) => {
    setSelectedProducts(newProducts);
    const newQuantities = { ...quantities };
    newProducts.forEach((product) => {
      if (!newQuantities[product.id]) {
        newQuantities[product.id] = 1;
      }
    });
    setQuantities(newQuantities);
  };

  const handleQuantityChange = (productId, value) => {
    setQuantities({
      ...quantities,
      [productId]: value,
    });
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId));
    const newQuantities = { ...quantities };
    delete newQuantities[productId];
    setQuantities(newQuantities);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const productData = selectedProducts.map((product) => ({
      productId: product.id,
      quantity: quantities[product.id],
    }));
    onSubmit(productData);
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle>Enviar Productos al Piso de Venta</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mt: 2 }}>
          {step === 1 && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                Paso 1: Selecciona los productos
              </Typography>
              <Autocomplete
                multiple
                options={products}
                getOptionLabel={(option) => option.name}
                value={selectedProducts}
                onChange={handleProductSelect}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option.name}
                      {...getTagProps({ index })}
                      onDelete={() => handleRemoveProduct(option.id)}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Buscar productos"
                    variant="outlined"
                  />
                )}
                sx={{ mb: 2 }}
              />
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" justifyContent="flex-end" spacing={1}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setStep(2)}
                  disabled={selectedProducts.length === 0}
                  endIcon={<ArrowForward />}
                >
                  Siguiente
                </Button>
              </Stack>
            </>
          )}

          {step === 2 && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                Paso 2: Asigna cantidades a los productos seleccionados
              </Typography>
              {selectedProducts.map((product) => (
                <Box
                  key={product.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                    bgcolor: "background.paper",
                    p: 2,
                    borderRadius: 1,
                    boxShadow: 1,
                  }}
                >
                  <Typography variant="body1" sx={{ flexGrow: 1 }}>
                    {product.name}
                  </Typography>
                  <TextField
                    label="Cantidad"
                    type="number"
                    variant="outlined"
                    size="small"
                    value={quantities[product.id] || ""}
                    onChange={(e) =>
                      handleQuantityChange(product.id, Number(e.target.value))
                    }
                    sx={{ width: 100, mr: 1 }}
                  />
                  <IconButton
                    onClick={() => handleRemoveProduct(product.id)}
                    color="error"
                  >
                    <RemoveCircleOutline />
                  </IconButton>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" justifyContent="space-between" spacing={1}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setStep(1)}
                  startIcon={<ArrowBack />}
                >
                  Atrás
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFormSubmit}
                >
                  Confirmar Envío
                </Button>
              </Stack>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductTransferForm;
