import React, { createContext, useState, useEffect } from "react";

// Crea el contexto
export const ProductContext = createContext();

// Crea el proveedor del contexto
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ejemplo de carga de productos desde una API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://6735f90a5995834c8a94dd35.mockapi.io/products"
        );
        const data = await response.json();
        setProducts(data);
        console.log(products);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
