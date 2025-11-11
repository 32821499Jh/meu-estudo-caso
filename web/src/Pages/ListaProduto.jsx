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
import produtoService from "../services/produtoService";

export default function ListaProdutos() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      setCarregando(true);
      const data = await produtoService.listar();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      alert("Erro ao carregar produtos. Verifique a API ou CORS.");
    } finally {
      setCarregando(false);
    }
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Deseja realmente excluir este produto?")) {
      try {
        await produtoService.excluir(id);
        alert("Produto excluído com sucesso!");
        carregarProdutos();
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
        alert("Erro ao excluir produto. Tente novamente.");
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
          🛍️ Lista de Produtos
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
          Novo Produto
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
        ) : produtos.length === 0 ? (
          <Typography textAlign="center" color="text.secondary" py={5}>
            Nenhum produto cadastrado ainda.
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: "#9c27b0" }}>
                <TableRow>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>ID</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Nome</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Preço (R$)</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {produtos.map((produto) => (
                  <TableRow
                    key={produto.id}
                    hover
                    sx={{
                      "&:hover": { bgcolor: "#f3e5f5" },
                      transition: "0.2s ease",
                    }}
                  >
                    <TableCell>{produto.id}</TableCell>
                    <TableCell>{produto.nome}</TableCell>
                    <TableCell>
                      {produto.preco
                        ? `R$ ${Number(produto.preco).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}`
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => navigate(`/editar/${produto.id}`)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleExcluir(produto.id)}
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
