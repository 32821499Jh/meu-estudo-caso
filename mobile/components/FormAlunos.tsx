import React, { useEffect } from "react";
import { View, TextInput } from "react-native"; // <-- IMPORTA O CORRETO
import { Controller, useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import { Aluno } from "../scripts/alunoService";

interface Props {
  aluno: Aluno;
  loading: boolean;
  onChange: (name: keyof Aluno, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function FormAlunos({
  aluno,
  loading,
  onChange,
  onSubmit,
  onCancel,
}: Props) {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      nome: aluno.nome ?? "",
      turma: aluno.turma ?? "",
      curso: aluno.curso ?? "",
      matricula: aluno.matricula ?? "",
    },
  });

  useEffect(() => {
    setValue("nome", aluno.nome ?? "");
    setValue("turma", aluno.turma ?? "");
    setValue("curso", aluno.curso ?? "");
    setValue("matricula", aluno.matricula ?? "");
  }, [aluno, setValue]);

  const inputStyle = {
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  };

  return (
    <View style={{ width: "100%" }}>
      {/* NOME */}
      <Controller
        control={control}
        name="nome"
        rules={{ required: "Nome obrigatório" }}
        render={({ field: { onChange: onFieldChange, value } }) => (
          <TextInput
            placeholder="Nome"
            value={value}
            onChangeText={(text) => {
              onFieldChange(text);
              onChange("nome", text);
            }}
            style={inputStyle}
          />
        )}
      />

      {/* TURMA */}
      <Controller
        control={control}
        name="turma"
        rules={{ required: "Turma obrigatória" }}
        render={({ field: { onChange: onFieldChange, value } }) => (
          <TextInput
            placeholder="Turma"
            value={value}
            onChangeText={(text) => {
              onFieldChange(text);
              onChange("turma", text);
            }}
            style={inputStyle}
          />
        )}
      />

      {/* CURSO */}
      <Controller
        control={control}
        name="curso"
        rules={{ required: "Curso obrigatório" }}
        render={({ field: { onChange: onFieldChange, value } }) => (
          <TextInput
            placeholder="Curso"
            value={value}
            onChangeText={(text) => {
              onFieldChange(text);
              onChange("curso", text);
            }}
            style={inputStyle}
          />
        )}
      />

      {/* MATRÍCULA */}
      <Controller
        control={control}
        name="matricula"
        rules={{ required: "Matrícula obrigatória" }}
        render={({ field: { onChange: onFieldChange, value } }) => (
          <TextInput
            placeholder="Matrícula"
            value={value}
            onChangeText={(text) => {
              onFieldChange(text);
              onChange("matricula", text);
            }}
            style={inputStyle}
          />
        )}
      />

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
        style={{ marginBottom: 10, backgroundColor: "#1976d2" }}
        labelStyle={{ color: "#fff" }}
      >
        Salvar
      </Button>

      <Button mode="outlined" onPress={onCancel}>
        Cancelar
      </Button>
    </View>
  );
}
