import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Box } from "@mui/material";

const Navbar = () => {
  // const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      color="primary"
      sx={{ backgroundColor: "primary.main" }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{ maxHeight: 50, marginRight: 16, cursor: "pointer" }}
            onClick={() => navigate(`/`)}
          />
        </Box>
        {/* <Box sx={{ display: "flex", gap: 2 }}>
          {navBarLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.link}
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#4caf50" : "inherit",
                display: "flex",
                alignItems: "center",
                marginRight: 4,
              })}
              onClick={item.onClick ? item.onClick : undefined}
            >
              {item.icon}
              <Typography sx={{ ml: 1, display: { xs: "none", sm: "block" } }}>
                {item.name}
              </Typography>
            </NavLink>
          ))}
        </Box> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
