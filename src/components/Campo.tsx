import { View,TextInput,StyleSheet, TextInputProps} from 'react-native'

export function Campo({...rest}:TextInputProps){
    return (
        <View>
            <TextInput style={styles.cmp} {...rest}/>
        </View>

    );
}

const styles = StyleSheet.create({
    cmp:{
        width: 300,
        fontSize: 20,
        borderRadius: 50, // menos exagerado, ainda bem arredondado
        backgroundColor: "#fff", // corrigido, sem 4 letras "f"
        margin: 10,
        padding: 12, // adicionado para espaçamento interno
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center', // alinha o texto dentro
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',

    },
})