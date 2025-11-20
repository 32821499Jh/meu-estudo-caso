import React, { useEffect } from "react";
import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { TextInput, Button } from "react-native-paper";
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

  return (
    <View style={{ width: "100%" }}>
      
      {/* NOME */}
      <Controller
        control={control}
        name="nome"
        rules={{ required: "Nome obrigatório" }}
        render={({ field: { onChange: onFieldChange, value }, fieldState }) => (
          <TextInput
            label="Nome"
            value={value}
            onChangeText={(text) => {
              onFieldChange(text);
              onChange("nome", text);
            }}
            mode="outlined"
            style={{ marginBottom: 16 }}
            error={!!fieldState.error}
          />
        )}
      />

      {/* TURMA */}
      <Controller
        control={control}
        name="turma"
        rules={{ required: "Turma obrigatória" }}
        render={({ field: { onChange: onFieldChange, value }, fieldState }) => (
          <TextInput
            label="Turma"
            value={value}
            onChangeText={(text) => {
              onFieldChange(text);
              onChange("turma", text);
            }}
            mode="outlined"
            style={{ marginBottom: 16 }}
            error={!!fieldState.error}
          />
        )}
      />

      {/* CURSO */}
      <Controller
        control={control}
        name="curso"
        rules={{ required: "Curso obrigatório" }}
        render={({ field: { onChange: onFieldChange, value }, fieldState }) => (
          <TextInput
            label="Curso"
            value={value}
            onChangeText={(text) => {
              onFieldChange(text);
              onChange("curso", text);
            }}
            mode="outlined"
            style={{ marginBottom: 16 }}
            error={!!fieldState.error}
          />
        )}
      />

      {/* MATRÍCULA */}
      <Controller
        control={control}
        name="matricula"
        rules={{ required: "Matrícula obrigatória" }}
        render={({ field: { onChange: onFieldChange, value }, fieldState }) => (
          <TextInput
            label="Matrícula"
            value={value}
            onChangeText={(text) => {
              onFieldChange(text);
              onChange("matricula", text);
            }}
            mode="outlined"
            style={{ marginBottom: 16 }}
            error={!!fieldState.error}
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

      <Button
        mode="outlined"
        onPress={onCancel}
        labelStyle={{ color: "#1976d2" }}
      >
        Cancelar
      </Button>
    </View>
  );
}
