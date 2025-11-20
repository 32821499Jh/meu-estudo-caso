import { Stack } from "expo-router";
import { PaperProvider, DefaultTheme } from "react-native-paper";
import { useEffect } from "react";
import { StatusBar } from "react-native";

// Tema global claro com azul (igual ao web)
const lightBlueTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#f5fafd",
    surface: "#fff",
    primary: "#1976d2",
    text: "#222",
    onSurface: "#222",
    onBackground: "#222",
  },
};

export default function RootLayout() {
  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    StatusBar.setBackgroundColor("#1976d2");
  }, []);

  return (
    <PaperProvider theme={lightBlueTheme}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#1976d2" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          contentStyle: { backgroundColor: "#f5fafd" },
        }}
      >
        <Stack.Screen
          name="alunos/index"
          options={{ title: "Lista de Alunos" }}
        />
        <Stack.Screen
          name="alunos/novo"
          options={{ title: "Novo Aluno" }}
        />
        <Stack.Screen
          name="alunos/[id]"
          options={{ title: "Editar Aluno" }}
        />
      </Stack>
    </PaperProvider>
  );
}