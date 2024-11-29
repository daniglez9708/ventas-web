import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

// Agrega una ruta (path) a cada elemento de menú

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const menuItems = [
    {
      text: "Home",
      icon: <HomeOutlinedIcon sx={{ color: theme.palette.primary.main }} />,
      path: "/",
    },
    {
      text: "Productos",
      icon: (
        <ShoppingBagOutlinedIcon sx={{ color: theme.palette.primary.main }} />
      ),
      path: "/producto/",
    },
    {
      text: "Ventas",
      icon: (
        <TrendingUpOutlinedIcon sx={{ color: theme.palette.primary.main }} />
      ),
      path: "/venta/",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path); // Navega a la ruta especificada
  };

  return (
    <Drawer
      variant="permanent"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      sx={{
        width: expanded ? 240 : 60,
        transition: "width 0.3s",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: expanded ? 240 : 60,
          marginTop: "64px",
          transition: "width 0.3s",
          overflowX: "hidden",
        },
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            sx={{ paddingLeft: expanded ? "20px" : "8px", cursor: "pointer" }}
            onClick={() => handleNavigation(item.path)} // Navegación al hacer clic
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            {expanded && <ListItemText primary={item.text} />}
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
