import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Text } from "react-native-paper";

import alunoService, { Aluno } from "../../scripts/alunoService";
import FormAluno from "../../components/FormAlunos";

export default function EditarAluno() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [aluno, setAluno] = useState<Aluno>({
    nome: "",
    turma: "",
    curso: "",
    matricula: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      setLoading(true);
      alunoService.obter(Number(id)).then((data) => {
        setAluno({
          nome: data.nome,
          turma: data.turma,
          curso: data.curso,
          matricula: data.matricula,
        });
        setLoading(false);
      });
    }
  }, [id]);

  const handleChange = (name: keyof Aluno, value: string) => {
    setAluno((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!aluno.nome || !aluno.turma || !aluno.curso || !aluno.matricula) {
      alert("Preencha todos os campos!");
      return;
    }

    setLoading(true);
    try {
      await alunoService.atualizar(Number(id), aluno);
      router.push("/alunos");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text
        variant="titleLarge"
        style={{ textAlign: "center", marginBottom: 20 }}
      >
        Editar Aluno
      </Text>

      <FormAluno
        aluno={aluno}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={() => {
          if (router.canGoBack?.()) {
            router.back();
          } else {
            router.push("/alunos");
          }
        }}
      />
    </View>
  );
}
