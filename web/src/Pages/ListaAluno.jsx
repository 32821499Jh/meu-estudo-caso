import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import alunoService from "../services/alunoService";

export default function ListaAlunos() {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    carregarAlunos();
  }, []);

  const carregarAlunos = async () => {
    try {
      setCarregando(true);
      const data = await alunoService.listar();
      setAlunos(data);
    } catch (error) {
      console.error("Erro ao carregar alunos:", error);
      alert("Erro ao carregar alunos. Verifique a API ou CORS.");
    } finally {
      setCarregando(false);
    }
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Deseja realmente excluir este aluno?")) {
      try {
        await alunoService.excluir(id);
        alert("Aluno excluído com sucesso!");
        carregarAlunos();
      } catch (error) {
        console.error("Erro ao excluir aluno:", error);
        alert("Erro ao excluir aluno. Tente novamente.");
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f4f6f8"
      p={4}
    >
      {/* Cabeçalho */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        maxWidth={900}
        mb={3}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          color="primary"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          🎓 Lista de Alunos
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            px: 2.5,
            py: 1,
            borderRadius: 2,
          }}
          onClick={() => navigate("/novo")}
        >
          Novo Aluno
        </Button>
      </Box>

      {/* Tabela */}
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 900,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {carregando ? (
          <Box display="flex" justifyContent="center" my={6}>
            <CircularProgress color="secondary" />
          </Box>
        ) : alunos.length === 0 ? (
          <Typography textAlign="center" color="text.secondary" py={5}>
            Nenhum aluno cadastrado ainda.
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: "#1976d2" }}>
                <TableRow>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Nome</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>E-mail</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>RA</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {alunos.map((aluno) => (
                  <TableRow
                    key={aluno.id}
                    hover
                    sx={{
                      "&:hover": { bgcolor: "#e3f2fd" },
                      transition: "0.2s ease",
                    }}
                  >
                    <TableCell>{aluno.id}</TableCell>
                    <TableCell>{aluno.nome}</TableCell>
                    <TableCell>{aluno.email}</TableCell>
                    <TableCell>{aluno.ra}</TableCell>

                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => navigate(`/editar/${aluno.id}`)}
                      >
                        <Edit />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => handleExcluir(aluno.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
}
