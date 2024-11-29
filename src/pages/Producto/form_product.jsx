import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

const FormProduct = ({ open, onClose, product }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imagen, setImagen] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setImagen(product.imagen);
    } else {
      setName("");
      setPrice("");
      setStock("");
      setImagen("");
    }
  }, [product]);

  const handleSave = () => {
    // Lógica para guardar el producto (crear o editar)
    if (product) {
      // Editar producto existente
    } else {
      // Crear nuevo producto
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{product ? "Editar Producto" : "Nuevo Producto"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} color="primary">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormProduct;