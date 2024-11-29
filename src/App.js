import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, Typography,Hidden } from '@mui/material';
import Drawer from './components/DrawerComponent';
import NavBar from './components/NavBar';
import GlobalBreadcrumbs from './components/GlobalBreadcrumbs'; // Importa el componente de los breadcrumbs
import Dashboard from './pages/Dashboard'; // Importa tu componente Dashboard
import AdminProduct from './pages/Producto/admin_product';
import AdminVenta from './pages/Venta/admin_venta';
import FormProduct from './pages/Producto/form_product';
import ProductDetails from './pages/Producto/detail_product';
import { ProductProvider } from './context/ProductContext';
// Importa otros componentes si tienes más páginas, como una página de Productos o Ventas

function App() {
  return (
    <ProductProvider>
    <Router>
      <Box sx={{ display: 'flex' }}>
        <NavBar />
        <Drawer />
        
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          {/* Breadcrumbs globales */}
          <Hidden mdDown>
            <GlobalBreadcrumbs />
          </Hidden>

          <Routes>
            {/* Redirige a la página del Dashboard al inicio */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            {/* Ruta del Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Ruta Admin Product */}
            <Route path="/producto" element={<AdminProduct />} />
            {/* Ruta Form Product */}
            <Route path="/producto/form_product" element={<FormProduct />} />
            <Route path="/producto/:id" element={<ProductDetails />} />

            <Route path="/venta" element={<AdminVenta />} />
            {/* Puedes agregar más rutas para otras secciones */}
            {/* <Route path="/productos" element={<Productos />} /> */}
            {/* <Route path="/ventas" element={<Ventas />} /> */}

            {/* Ruta para manejar páginas no encontradas */}
            <Route path="*" element={<Typography>404 - Página no encontrada</Typography>} />
          </Routes>
        </Box>
      </Box>
    </Router>
    </ProductProvider>
  );
}

export default App;
