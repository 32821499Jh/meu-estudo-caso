import { Routes, Route } from "react-router-dom";
import ListaAlunos from "../Pages/ListaAluno";
import FormAluno from "../Pages/FormAluno";
import AlunoDetails from "../Pages/AlunoDetails";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ListaAlunos />} />
      <Route path="/novo" element={<FormAluno />} />
      <Route path="/editar/:id" element={<FormAluno />} />
      <Route path="/aluno/:id" element={<AlunoDetails />} />
    </Routes>
  );
}
