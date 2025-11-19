import axios from "axios";

export interface Produto {
  id?: number;
  nome: string;
  preco: number;
}

const API_URL = "http://proweb.leoproti.com.br/produtos";

const listar = async (): Promise<Produto[]> => {
  const { data } = await axios.get<Produto[]>(API_URL);
  return data;
};

const obter = async (id: number): Promise<Produto> => {
  const { data } = await axios.get<Produto>(`${API_URL}/${id}`);
  return data;
};

const criar = async (produto: Produto): Promise<Produto> => {
  const { data } = await axios.post<Produto>(API_URL, produto);
  return data;
};

const atualizar = async (id: number, produto: Produto): Promise<Produto> => {
  const { data } = await axios.put<Produto>(`${API_URL}/${id}`, produto);
  return data;
};

const excluir = async (id: number): Promise<void> => {
  await axios.delete<void>(`${API_URL}/${id}`);
};

export default {
  listar,
  obter,
  criar,
  atualizar,
  excluir,
};