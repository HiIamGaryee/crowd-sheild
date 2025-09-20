import { Box, Typography, TextField, Paper, Button } from "@mui/material";

import * as Yup from "yup";

const Footer = () => {
  return (
    // <Box>OI</Box>
    <Box
      component="footer"
      sx={{
        backgroundColor: "#161d2f",
        padding: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        color: "white",
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Typography variant="body2" sx={{ color: "white" }}>
          © 2025 All rights reserved by Team Can We Throw They Out The Window
          Now.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
