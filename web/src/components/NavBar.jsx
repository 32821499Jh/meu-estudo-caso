import { AppBar, Toolbar, Typography, Button, Stack } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function NavBar() {
  const location = useLocation();

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: 3,
        background: "linear-gradient(90deg, #1976d2, #2196f3)",
      }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <Stack direction="row" spacing={3}>
          {/* Lista de alunos */}
          <Button
            color={location.pathname === "/" ? "secondary" : "inherit"}
            variant={location.pathname === "/" ? "contained" : "text"}
            component={RouterLink}
            to="/"
            startIcon={<ListAltIcon />}
            sx={{
              fontWeight: "bold",
              color: location.pathname === "/" ? "#fff" : "#e3f2fd",
            }}
          >
            Alunos
          </Button>

          {/* Novo aluno */}
          <Button
            color={location.pathname === "/novo" ? "secondary" : "inherit"}
            variant={location.pathname === "/novo" ? "contained" : "text"}
            component={RouterLink}
            to="/novo"
            startIcon={<AddCircleOutlineIcon />}
            sx={{
              fontWeight: "bold",
              color: location.pathname === "/novo" ? "#fff" : "#e3f2fd",
            }}
          >
            Novo Aluno
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
