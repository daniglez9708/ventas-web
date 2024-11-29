import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CustomToolbar from "../../components/ToolbarComponent";
import useMediaQuery from "@mui/material/useMediaQuery";

function createSale(id, date, customer, total, products) {
  return {
    id,
    date,
    customer,
    total,
    products,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>{row.customer}</TableCell>
        <TableCell align="right">{row.total}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: isMobile ? 0.5 : 1, padding: isMobile ? 1 : 2 }}>
              <Typography
                variant={isMobile ? "subtitle2" : "h6"}
                gutterBottom
                component="div"
              >
                Detalles de los Productos
              </Typography>
              <Table
                size="small"
                aria-label="purchases"
                sx={{
                  "& td, & th": { fontSize: isMobile ? "0.75rem" : "1rem" },
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell align="right">Precio unitario</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((product) => (
                    <TableRow key={product.name}>
                      <TableCell component="th" scope="row">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell align="right">{product.unitPrice}</TableCell>
                      <TableCell align="right">
                        {product.quantity * product.unitPrice}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    customer: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        unitPrice: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const rows = [
  createSale("001", "2024-01-05", "Cliente A", 59.99, [
    { name: "Producto 1", quantity: 2, unitPrice: 15.99 },
    { name: "Producto 2", quantity: 1, unitPrice: 28.0 },
  ]),
  createSale("002", "2024-01-06", "Cliente B", 29.99, [
    { name: "Producto 3", quantity: 1, unitPrice: 29.99 },
  ]),
  createSale("003", "2024-01-07", "Cliente C", 45.5, [
    { name: "Producto 4", quantity: 2, unitPrice: 20.0 },
    { name: "Producto 5", quantity: 1, unitPrice: 5.5 },
  ]),
];

export default function SalesTable() {
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleSearchChange = (event) => setSearch(event.target.value);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <CustomToolbar
        title="Ventas"
        searchValue={search}
        onSearchChange={handleSearchChange}
        onAddClick={handleOpenDialog}
        showAddButton={false} // Oculta el botón de agregar
        showSendButton={false} // Oculta el botón de envío
        showSearch={true}
      />

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: isMobile ? 300 : 500,
          overflowX: isMobile ? "auto" : "hidden",
        }}
      >
        <Table
          aria-label="collapsible table"
          size={isMobile ? "small" : "medium"}
        >
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Fecha</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell align="right">Monto Total ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
