import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, Alert } from "react-native";
import { Card, Button, Text, FAB } from "react-native-paper";
import { useRouter } from "expo-router";

import alunoService, { Aluno } from "../../scripts/alunoService";

export default function ListaAlunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const carregarAlunos = async () => {
    setLoading(true);
    try {
      const lista = await alunoService.listar();
      setAlunos(lista);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarAlunos();
  }, []);

  const handleDelete = (id: number) => {
    Alert.alert("Excluir Aluno", "Deseja realmente excluir este aluno?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await alunoService.excluir(id);
          carregarAlunos();
        },
      },
    ]);
  };

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id?.toString() ?? ""}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 12 }}>
            <Card.Title
              title={item.nome}
              subtitle={`Curso: ${item.curso} | Turma: ${item.turma}`}
            />
            <Card.Content>
              <Text>Matrícula: {item.matricula}</Text>
            </Card.Content>

            <Card.Actions>
              <Button
                mode="outlined"
                onPress={() => router.push(`/alunos/${item.id}` as never)}
                style={{ marginRight: 8 }}
              >
                Editar
              </Button>

              <Button
                mode="outlined"
                textColor="#d32f2f"
                onPress={() => handleDelete(item.id!)}
              >
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Nenhum aluno cadastrado.
          </Text>
        }
      />

      <FAB
        icon="plus"
        style={{
          position: "absolute",
          right: 16,
          bottom: 16,
          backgroundColor: "#1976d2",
        }}
        onPress={() => router.push("/alunos/novo" as never)}
        color="#fff"
      />
    </View>
  );
}
