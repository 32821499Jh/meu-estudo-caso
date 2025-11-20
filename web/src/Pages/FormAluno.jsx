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
import alunoService from "../services/alunoService";

export default function FormAluno() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [aluno, setAluno] = useState({
    nome: "",
    email: "",
    ra: "",
  });

  const [carregando, setCarregando] = useState(false);

  // Carrega o aluno se estiver editando
  useEffect(() => {
    if (id) {
      carregarAluno();
    }
  }, [id]);

  const carregarAluno = async () => {
    try {
      setCarregando(true);
      const data = await alunoService.obter(id);
      setAluno({
        nome: data.nome,
        email: data.email,
        ra: data.ra,
      });
    } catch (error) {
      console.error("❌ Erro ao carregar aluno:", error);
      alert("Erro ao carregar aluno. Verifique a API.");
    } finally {
      setCarregando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAluno((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!aluno.nome || !aluno.email || !aluno.ra) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      setCarregando(true);

      if (id) {
        await alunoService.atualizar(id, aluno);
        alert("Aluno atualizado com sucesso!");
      } else {
        await alunoService.criar(aluno);
        alert("Aluno cadastrado com sucesso!");
      }

      navigate("/");
    } catch (error) {
      console.error("❌ Erro ao salvar aluno:", error);
      alert("Erro ao salvar aluno. Verifique a API.");
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
          {id ? "Editar Aluno" : "Novo Aluno"}
        </Typography>

        {carregando ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nome do Aluno"
              name="nome"
              value={aluno.nome}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="E-mail"
              name="email"
              type="email"
              value={aluno.email}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="RA"
              name="ra"
              value={aluno.ra}
              onChange={handleChange}
              margin="normal"
              required
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
