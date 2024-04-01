import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';


export default function Register(props) {

    const { navigation } = props;

    return (

        <ImageBackground resizeMode="cover"
            source={require('../img/RegistroBackground.jpg')}
            style={{
                height: '100%',
                width: '100%',
                objectFit: "cover"
            }}
        >

            <View style={{
                alignItems: 'center',
                paddingTop: 100,
            }}>

                <Text style={styles.TextStyle}>Registro</Text>

                <View style={{ height: 30 }} />

                <Text style={styles.TextStyle3}>Nombre</Text>
                <TextInput style={styles.TextInputStyle} placeholder="Nombre"></TextInput>

                <View style={{ height: 10 }} />

                <Text style={styles.TextStyle3}>Correo</Text>
                <TextInput style={styles.TextInputStyle} keyboardType="email-address" placeholder="ejemplo@email.com"></TextInput>

                <View style={{ height: 10 }} />

                <Text style={styles.TextStyle3}>Contraseña</Text>
                <TextInput style={styles.TextInputStyle} secureTextEntry placeholder="contraseña"></TextInput>

                <View style={{ height: 45 }} />

                <TouchableOpacity style={styles.buttonTouchable} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.TextStyle2}>Crear cuenta</Text>
                </TouchableOpacity>
            </View>

        </ImageBackground>


    )
}

const styles = StyleSheet.create({
    TextStyle: {
        fontSize: 35,
        color: "black",
        fontWeight: 'bold',
        textAlign: 'center'
    },

    TextInputStyle: {
        backgroundColor:'#FFFF',
        fontSize:15,
        borderWidth:1,
        borderColor:'#FFFF',
        padding:6,
        margin:5,
        width:200,
        marginBottom:5,
        borderRadius:15
    },

    TextStyle3: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: "#FFFF"
    },

    buttonTouchable: {
        backgroundColor: '#A160FF',
        borderRadius: 20,
        width: 120,
        height: 30,
        padding: 6,
    },

    TextStyle2: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
}
)