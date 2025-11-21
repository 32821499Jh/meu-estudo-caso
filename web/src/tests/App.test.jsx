import { render, screen } from "@testing-library/react";
import App from "../App";

test("renderiza a navbar com ALUNOS e NOVO ALUNO", () => {
  render(<App />);

  // aceita múltiplos textos “Alunos”
  const alunosTexts = screen.getAllByText(/Alunos/i);
  expect(alunosTexts.length).toBeGreaterThan(0);

  // verifica Novo Aluno (aparece 2x também)
  const novoAlunoTexts = screen.getAllByText(/Novo Aluno/i);
  expect(novoAlunoTexts.length).toBeGreaterThan(0);
});