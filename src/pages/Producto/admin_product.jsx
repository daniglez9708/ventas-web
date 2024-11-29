import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext"; // Importar el contexto de productos
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Typography,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import { Search, Edit } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import FormProduct from "./form_product";
import FormEnvio from "./form_envio_product";
import CustomToolbar from "../../components/ToolbarComponent";

const columns = [
  { id: "name", label: "Name", minWidth: 40 },
  { id: "price", label: "Precio", minWidth: 40, align: "right" },
  { id: "stock", label: "Stock", minWidth: 40, align: "right" },
  { id: "imagen", label: "Imagen", minWidth: 40, align: "center" }, // Nueva columna para la imagen
  { id: "actions", label: "Acciones", minWidth: 40, align: "center" }, // Nueva columna para las acciones
];

export default function EnhancedTable() {
  const theme = useTheme();
  const { products, loading } = useContext(ProductContext); // Obtener productos y estado de carga desde el contexto
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [envioProduct, setEnvioProduct] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto seleccionado para editar
  const searchBoxRef = useRef(null);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => setSearch(event.target.value);

  // Filtrar productos por nombre
  const filteredRows = products.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  // Funciones para abrir/cerrar formularios
  const handleOpenDialog = () => {
    setSelectedProduct(null); // Limpiar el producto seleccionado
    setOpenDialog(true);
  };
  const handleCloseDialog = () => setOpenDialog(false);

  const handleEnvioProduct = () => setEnvioProduct(true);
  const handleCloseEnvio = () => setEnvioProduct(false);

  const toggleSearch = () => setShowSearch(!showSearch);

  const handleEditProduct = (product) => {
    setSelectedProduct(product); // Establecer el producto seleccionado
    setOpenDialog(true); // Abrir el formulario de edición
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setShowSearch(false);
      }
    }

    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <CustomToolbar
        title="Productos"
        searchValue={search}
        onSearchChange={handleSearchChange}
        onAddClick={handleOpenDialog}
        onMoveClick={handleEnvioProduct}
        showAddButton={true}
        showSendButton={true}
        showSearch={true}
      />

      {showSearch && (
        <Box ref={searchBoxRef} sx={{ paddingX: 2, marginBottom: 2 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Buscar..."
            value={search}
            onChange={handleSearchChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <Search sx={{ color: "gray", marginRight: 0.5 }} />
              ),
            }}
          />
        </Box>
      )}

      {loading ? (
        <Typography align="center" sx={{ mt: 3 }}>
          Cargando productos...
        </Typography>
      ) : (
        <>
          <TableContainer sx={{ maxHeight: 440, overflowX: "auto" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "name" ? (
                              <Link
                                to={`/producto/${row.id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                }}
                              >
                                {value}
                              </Link>
                            ) : column.id === "imagen" ? (
                              <img
                                src={value}
                                alt={row.name}
                                width={50}
                                height={50}
                              />
                            ) : column.id === "actions" ? (
                              <IconButton
                                onClick={() => handleEditProduct(row)}
                              >
                                <Edit />
                              </IconButton>
                            ) : column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}

      <FormProduct
        open={openDialog}
        onClose={handleCloseDialog}
        product={selectedProduct} // Pasar el producto seleccionado al formulario
      />
      <FormEnvio open={envioProduct} onClose={handleCloseEnvio} />
    </Paper>
  );
}