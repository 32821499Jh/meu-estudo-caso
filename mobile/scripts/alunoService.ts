import axios from "axios";

export interface Aluno {
  id?: number;
  nome: string;
  turma: string;
  curso: string;
  matricula: string;
}

const API_URL = "http://proweb.leoproti.com.br/alunos";

// LISTAR
const listar = async (): Promise<Aluno[]> => {
  const { data } = await axios.get<Aluno[]>(API_URL);
  return data;
};

// OBTER POR ID
const obter = async (id: number): Promise<Aluno> => {
  const { data } = await axios.get<Aluno>(`${API_URL}/${id}`);
  return data;
};

// CRIAR
const criar = async (aluno: Aluno): Promise<Aluno> => {
  const { data } = await axios.post<Aluno>(API_URL, aluno);
  return data;
};

// ATUALIZAR
const atualizar = async (id: number, aluno: Aluno): Promise<Aluno> => {
  const { data } = await axios.put<Aluno>(`${API_URL}/${id}`, aluno);
  return data;
};

// EXCLUIR
const excluir = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const alunoService = {
  listar,
  obter,
  criar,
  atualizar,
  excluir,
};

export default alunoService;
