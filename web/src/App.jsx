import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Box } from "@mui/material";
import NavBar from "./components/NavBar";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      {/* Navbar fixa no topo */}
      <NavBar />

      {/* Conteúdo principal centralizado */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "calc(100vh - 64px)", // altura da Navbar
          backgroundColor: "#f8f9fa",
          padding: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 800,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AppRoutes />
        </Box>
      </Box>
    </BrowserRouter>
  );
}
