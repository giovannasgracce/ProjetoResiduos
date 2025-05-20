import { View, Button, StyleSheet, Alert} from "react-native"
import {Campo} from "@/components/Campo"
import {useState,useEffect} from 'react'
import { ResiduosDataBase, useResiduosDataBase } from "@/database/useResiduosDataBase"
import { useNavigation } from "expo-router"
import { useRoute } from '@react-navigation/native'

 
export default function Atualizar(){
    const [id, setId] = useState("")
    const [data, setData] = useState("")
    const [categoria, setCategoria] = useState("")
    const [peso, setPeso] = useState("")
    const [residuos, setResiduos] = useState<ResiduosDataBase[]>()
    const ResiduosDataBase = useResiduosDataBase();
    const navigation = useNavigation();
    const route = useRoute();
    const {item} = route.params;
   

  useEffect(()=> {//trazer todos os dados dos campos 
        if(item){
            setId(item.id.toString());
            setData(item.data)
            setCategoria(item.categoria)
            setPeso(item.peso)
        }
  },[]);

  //metodo atualizar

  async function atualizar(){
        try {
            await ResiduosDataBase.atualizar({
                id: Number(id),
                data,
                categoria,
                peso
            });

            Alert.alert(//para fazer a mensagem e os botões 
                "Sucesso!",//titulo da mensagem 
                "Dados do resíduos atualizados com sucesso",//mensagem 
                [//criar botão
                    {//botão ok
                        text:"OK",
                        onPress:() => navigation.navigate("Consultar"),
                    },
                ],
                {cancelable: false}//cancelou obotao cancelar
            );
        } catch (error) {
            console.log(error)
        }
   }//fim do atualizar

    async function salvarAtulizacao( ){
        try {
            if(id){
                await atualizar()
            }
        } catch (error) {
            console.log(error)
        }
        setId("");
        setData("");
        setCategoria("");
        setPeso("");
    }// fim d metodo

    return (
        <View style={styles.container}>
            <Campo placeholder="Data" onChangeText={setData} value={data}/>
            <Campo placeholder="Categoria"onChangeText={setCategoria} value={categoria} />
            <Campo placeholder="Peso" onChangeText={setPeso} value={peso}/>
            <Button title="Atualizar" onPress={salvarAtulizacao}/>
            <Button title="Voltar" onPress={() => navigation.navigate('Consultar2')}/>
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