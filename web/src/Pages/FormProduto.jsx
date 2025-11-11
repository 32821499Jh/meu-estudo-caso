import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import produtoService from "../services/produtoService"; // ✅ mesma forma de importação

export default function FormProduto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [produto, setProduto] = useState({
    nome: "",
    preco: "",
  });

  const [carregando, setCarregando] = useState(false);

  // 🔄 Carrega o produto se for edição
  useEffect(() => {
    if (id) {
      carregarProduto();
    }
  }, [id]);

  const carregarProduto = async () => {
    try {
      setCarregando(true);
      const data = await produtoService.obter(id);
      setProduto({ nome: data.nome, preco: data.preco });
    } catch (error) {
      console.error("❌ Erro ao carregar produto:", error);
      alert("Erro ao carregar produto. Verifique a API.");
    } finally {
      setCarregando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prev) => ({
      ...prev,
      [name]: name === "preco" ? value.replace(",", ".") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!produto.nome || !produto.preco) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      setCarregando(true);

      const produtoFormatado = {
        nome: produto.nome,
        preco: parseFloat(produto.preco),
      };

      if (id) {
        await produtoService.atualizar(id, produtoFormatado);
        alert("Produto atualizado com sucesso!");
      } else {
        await produtoService.criar(produtoFormatado);
        alert("Produto cadastrado com sucesso!");
      }

      navigate("/");
    } catch (error) {
      console.error("❌ Erro ao salvar produto:", error);
      alert("Erro ao salvar produto. Verifique a API.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f8f9fa"
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography
          variant="h6"
          align="center"
          color="primary"
          fontWeight="bold"
          gutterBottom
        >
          {id ? "Editar Produto" : "Novo Produto"}
        </Typography>

        {carregando ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nome do Produto"
              name="nome"
              value={produto.nome}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Preço (R$)"
              name="preco"
              type="number"
              value={produto.preco}
              onChange={handleChange}
              margin="normal"
              required
              inputProps={{ step: "0.01" }}
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={3}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/")}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {id ? "Salvar Alterações" : "Cadastrar"}
              </Button>
            </Box>
          </form>
        )}
      </Paper>
    </Box>
  );
}