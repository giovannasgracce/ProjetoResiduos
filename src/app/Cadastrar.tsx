import { View, Button, StyleSheet, Alert} from "react-native"
import {Campo} from "@/components/Campo"
import {useState,useEffect} from 'react'
import { ResiduosDataBase, useResiduosDataBase } from "@/database/useResiduosDataBase"
import { useNavigation } from "expo-router" 
 
export default function Index(){
    const [id, setId] = useState("")
    const [data, setData] = useState("")
    const [categoria, setCategoria] = useState("")
    const [peso, setPeso] = useState("")
    const [residuos, setResiduos] = useState<ResiduosDataBase[]>()
    const ResiduosDataBase = useResiduosDataBase();
    const navigation = useNavigation()



    useEffect(() => {
        const hoje = new Date()
        const formato = hoje.toISOString().split("T")[0] // yyyy-mm-dd
        setData(formato)
    }, [])

    async function create() {
        try {
          const response = await fetch("https://api.sheetbest.com/sheets/cee7cb4e-2b7c-4e91-a356-cdb039268844", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: Number(id),
              data,
              categoria,
              peso: Number(peso),
            }),
          });
      
          if (response.ok) {
            Alert.alert("Resíduo cadastrado com sucesso na planilha!");
            // Limpar campos se quiser
          } else {
            Alert.alert("Erro ao cadastrar. Tente novamente.");
          }
        } catch (error) {
          console.log(error);
          Alert.alert("Erro na conexão.");
        }
      }
      

    return (
        <View style={styles.container}>
            <Campo placeholder="Data (yyyy-mm-dd)" onChangeText={setData} value={data}/>
            <Campo placeholder="Categoria"onChangeText={setCategoria} value={categoria} />
            <Campo placeholder="Peso (kg)" onChangeText={(text) => 
            {const novo = text.replace(/[^0-9.]/g, "") 
            const partes = novo.split(".")
                    if (partes.length <= 2) {
                        if (partes.length === 1 || partes[1].length <= 2) {
                            setPeso(novo)
                        }
                    }
                }}value={peso}/>
            <Button title="Cadastrar" onPress={create}/>
            <Button title=" Consultar" onPress={() => navigation.navigate('Consultar')}/>
            <Button title="Voltar" onPress={() => navigation.navigate('Index')}/>
        </View>
    );
}  
 
const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            backgroundColor: '#898989',
            alignItems: "center",
        },
    }
);