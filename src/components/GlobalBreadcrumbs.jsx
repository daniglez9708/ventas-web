// src/components/GlobalBreadcrumbs.js
import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useLocation, Link as RouterLink } from "react-router-dom";

function GlobalBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        component={RouterLink}
        to="/"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Home
      </Link>

      {pathnames.map((value, index) => {
        const path = `/${pathnames.slice(0, index + 1).join("/")}`;
        return (
          <Link
            key={path}
            component={RouterLink}
            to={path}
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Link>
        );
      })}

      <Typography sx={{ color: "text.primary" }}>
        {pathnames.length > 0 ? pathnames[pathnames.length - 1] : "Home"}
      </Typography>
    </Breadcrumbs>
  );
}

export default GlobalBreadcrumbs;
