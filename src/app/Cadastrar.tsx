import { View, Button, StyleSheet, Alert } from "react-native";
import { Campo } from "@/components/Campo";
import { useState, useEffect } from "react";
import { ResiduosDataBase, useResiduosDataBase } from "@/database/useResiduosDataBase";
import { useNavigation } from "expo-router";
import { Picker } from '@react-native-picker/picker';

export default function Index() {
  const [id, setId] = useState("");
  const [data, setData] = useState("");
  const [categoria, setCategoria] = useState("");
  const [peso, setPeso] = useState("");
  const [residuos, setResiduos] = useState<ResiduosDataBase[]>();
  const ResiduosDataBase = useResiduosDataBase();
  const navigation = useNavigation();

  const categorias = [
    "Não reciclável",
    "Reciclável",
    "Óleo",
    "Tampinhas plásticas",
    "Lacres de alumínio",
    "Tecidos",
    "Meias",
    "Material de escrita",
    "Esponjas",
    "Eletrônicos",
    "Pilhas e baterias",
    "Infectante",
    "Químicos",
    "Lâmpada fluorescente",
    "Tonners de impressora",
    "Esmaltes",
    "Cosméticos",
    "Cartela de medicamento",
  ];

  useEffect(() => {
    const hoje = new Date();
    const formato = hoje.toISOString().split("T")[0]; // yyyy-mm-dd
    setData(formato);
  }, []);

  async function create() {
    try {
      const response = await ResiduosDataBase.create({
        data,
        categoria,
        peso,
      });

      Alert.alert("Resíduo cadastrado com sucesso! ID:" + response.insertedRowId);
    } catch (error) {
      console.log(error);
    }
  } // fim do create

  return (
    <View style={styles.container}>
      <Campo placeholder="Data (yyyy-mm-dd)" onChangeText={setData} value={data} />
      
      <Picker
        selectedValue={categoria}
        onValueChange={(itemValue) => setCategoria(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione a categoria" value="" />
        {categorias.map((cat, index) => (
          <Picker.Item key={index} label={cat} value={cat} />
        ))}
      </Picker>

      <Campo
        placeholder="Peso (kg)"
        onChangeText={(text) => {
          const novo = text.replace(/[^0-9.]/g, "");
          const partes = novo.split(".");
          if (partes.length <= 2) {
            if (partes.length === 1 || partes[1].length <= 2) {
              setPeso(novo);
            }
          }
        }}
        value={peso}
      />
      <Button title="Cadastrar" onPress={create} />
      <Button title="Consultar" onPress={() => navigation.navigate("Consultar")} />
      <Button title="Voltar" onPress={() => navigation.navigate("Index")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "#898989",
    alignItems: "center",
  },
  picker: {
    width: 300,
    height: 50,
    backgroundColor: "white",
    marginBottom: 20,
  },
});
