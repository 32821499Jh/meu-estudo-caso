import { Text, View, Image } from "react-native";
import { Button, Card } from "react-native-paper";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f6fa",
        padding: 24,
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 380,
          padding: 24,
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: 16,
          elevation: 4,
        }}
      >
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",
          }}
          style={{ width: 80, height: 80, marginBottom: 16 }}
          resizeMode="contain"
        />

        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "#1976d2",
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          Bem-vindo ao CRUD de Alunos
        </Text>

        <Text
          style={{
            textAlign: "center",
            color: "#333",
            marginBottom: 24,
            fontSize: 16,
          }}
        >
          Gerencie alunos de forma prática e rápida.
        </Text>

        <Button
          mode="contained"
          onPress={() => router.push("/alunos" as never)}
          style={{
            backgroundColor: "#1976d2",
            borderRadius: 8,
            paddingVertical: 6,
            width: "100%",
          }}
          labelStyle={{ fontSize: 16, color: "#fff" }}
          icon="account-multiple"
        >
          Ir para Alunos
        </Button>
      </Card>
    </View>
  );
}