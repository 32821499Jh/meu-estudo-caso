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
import produtoService from "../services/produtoService";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;
    setLoading(true);
    setErro("");

    produtoService
      .obter(id)
      .then((data) => {
        if (ativo) setProduto(data);
      })
      .catch(() => setErro("Produto não encontrado."))
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

  if (erro || !produto) {
    return (
      <Paper sx={{ p: 4, maxWidth: 560, mx: "auto", mt: 6, borderRadius: 3 }}>
        <Typography variant="h6" color="error" gutterBottom>
          {erro || "Produto não encontrado."}
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Voltar para a lista
        </Button>
      </Paper>
    );
  }

  const precoFmt =
    typeof produto.preco === "number"
      ? produto.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
      : `R$ ${produto.preco}`;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "70vh",
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 560, width: "90%", mt: 6, borderRadius: 3, boxShadow: 3 }}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" color="primary" fontWeight="bold">
              Detalhes do Produto
            </Typography>
            <Chip label={`ID: ${produto.id}`} />
          </Stack>

          <Divider />

          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">
              Nome
            </Typography>
            <Typography variant="h6">{produto.nome}</Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">
              Preço
            </Typography>
            <Typography variant="h6">{precoFmt}</Typography>
          </Stack>

          <Divider />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button variant="outlined" onClick={() => navigate("/")}>
              Voltar
            </Button>

            <Button
              variant="contained"
              component={RouterLink}
              to={`/editar/${produto.id}`}
            >
              Editar produto
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </div>
  );
}
