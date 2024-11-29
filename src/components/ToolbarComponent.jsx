// CustomToolbar.js
import React, { useState } from "react";
import {
  Box,
  Toolbar,
  Typography,
  TextField,
  IconButton,
  Collapse,
  Tooltip,
} from "@mui/material";
import { Search, Add } from "@mui/icons-material";
import OutboxOutlinedIcon from "@mui/icons-material/OutboxOutlined";
import { useTheme, useMediaQuery } from "@mui/material";

const CustomToolbar = ({
  title,
  searchValue,
  onSearchChange,
  onAddClick,
  onMoveClick,
  showAddButton = false,
  showSendButton = false,
  showSearch,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [showSearchBox, setShowSearchBox] = useState(false);

  const toggleSearchBox = () => setShowSearchBox(!showSearchBox);

  return (
    <Box>
      <Toolbar
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isSmallScreen ? (
            <Tooltip title="Buscar">
              <IconButton color="inherit" onClick={toggleSearchBox}>
                <Search />
              </IconButton>
            </Tooltip>
          ) : (
            <TextField
              variant="outlined"
              size="small"
              placeholder="Buscar..."
              value={searchValue}
              onChange={onSearchChange}
              sx={{
                marginRight: 2,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 1,
              }}
              InputProps={{
                startAdornment: (
                  <Search sx={{ color: "gray", marginRight: 0.5 }} />
                ),
              }}
            />
          )}
          {showAddButton && (
            <Tooltip title="Agregar">
              <IconButton color="inherit" onClick={onAddClick}>
                <Add />
              </IconButton>
            </Tooltip>
          )}
          {showSendButton && (
            <Tooltip title="Enviar al piso de venta">
              <IconButton color="inherit" onClick={onMoveClick}>
                <OutboxOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
      {/* Mostrar el cuadro de búsqueda en una fila debajo en pantallas pequeñas */}
      {isSmallScreen && (
        <Collapse in={showSearchBox}>
          <Box sx={{ padding: 1 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Buscar..."
              value={searchValue}
              onChange={onSearchChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <Search sx={{ color: "gray", marginRight: 0.5 }} />
                ),
              }}
            />
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

export default CustomToolbar;
