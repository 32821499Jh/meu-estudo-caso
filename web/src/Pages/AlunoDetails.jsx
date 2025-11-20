import { useEffect, useState } from "react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Paper,
  Typography,
  Stack,
  Divider,
  CircularProgress,
  Button,
  Chip,
} from "@mui/material";
import alunoService from "../services/alunoService";

export default function AlunoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aluno, setAluno] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;
    setLoading(true);
    setErro("");

    alunoService
      .obter(id)
      .then((data) => {
        if (ativo) setAluno(data);
      })
      .catch(() => setErro("Aluno não encontrado."))
      .finally(() => ativo && setLoading(false));

    return () => {
      ativo = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
        <CircularProgress />
      </div>
    );
  }

  if (erro || !aluno) {
    return (
      <Paper sx={{ p: 4, maxWidth: 560, mx: "auto", mt: 6, borderRadius: 3 }}>
        <Typography variant="h6" color="error" gutterBottom>
          {erro || "Aluno não encontrado."}
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Voltar para a lista
        </Button>
      </Paper>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "70vh",
      }}
    >
      <Paper
        sx={{
          p: 4,
          maxWidth: 560,
          width: "90%",
          mt: 6,
          borderRadius: 3,
          boxShadow: 3,
        }}
      >
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" color="primary" fontWeight="bold">
              Detalhes do Aluno
            </Typography>
            <Chip label={`ID: ${aluno.id}`} />
          </Stack>

          <Divider />

          {/* Nome */}
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">
              Nome
            </Typography>
            <Typography variant="h6">{aluno.nome}</Typography>
          </Stack>

          {/* Email */}
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">
              E-mail
            </Typography>
            <Typography variant="h6">{aluno.email}</Typography>
          </Stack>

          {/* RA */}
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">
              RA
            </Typography>
            <Typography variant="h6">{aluno.ra}</Typography>
          </Stack>

          <Divider />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button variant="outlined" onClick={() => navigate("/")}>
              Voltar
            </Button>

            <Button
              variant="contained"
              component={RouterLink}
              to={`/editar/${aluno.id}`}
            >
              Editar aluno
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </div>
  );
}
