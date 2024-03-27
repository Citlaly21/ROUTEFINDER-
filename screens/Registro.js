import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function Register(props) {
    const { navigation } = props;
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const registrarUsuario = async (nombre, email, password) => {
        try {
        await firestore()
            .collection('usuarios')
            .add({
                nombre: nombre,
                email: email,
                password: password
            });
        console.log('Usuario registrado correctamente');
        } catch (error) {
          console.error('Error al registrar usuario: ', error);
        }
      };
      


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
                <Text style={styles.TextStyle}>Crea tu cuenta y comienza a explorar</Text>
                <View style={{ height: 30 }} /> 
                <Text style={styles.TextStyle4}>¡Empieza ahora y no te pierdas!</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.TextStyle3}>Nombre</Text>
                    <TextInput style={styles.TextInputStyle} placeholder="Nombre" onChangeText={setNombre}></TextInput>
                    <View style={{ height: 10 }} />
                    <Text style={styles.TextStyle3}>Correo</Text>
                    <TextInput style={styles.TextInputStyle} keyboardType="email-address" placeholder="ejemplo@email.com" onChangeText={setEmail}></TextInput>
                    <View style={{ height: 10 }} />
                    <Text style={styles.TextStyle3}>Contraseña</Text>
                    <TextInput style={styles.TextInputStyle} secureTextEntry placeholder="contraseña" onChangeText={setPassword}></TextInput>
                    <View style={{ height: 45 }} />
                    <TouchableOpacity style={styles.buttonTouchable}  onPress={() => registrarUsuario(nombre, email, password)}>
                        <Text style={styles.TextStyle2}>Crear cuenta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonTouchable} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.TextStyle2}>IR A LOGIN</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    TextStyle: {
        fontSize: 35,
        color: "white",
        fontWeight: 'bold',
        textAlign: 'center',
        top: 35
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 20,
        borderRadius: 8,
    },
    TextInputStyle: {
        backgroundColor: '#FFFF',
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#FFFF',
        padding: 6,
        margin: 5,
        width: 200,
        marginBottom: 5,
        borderRadius: 15
    },
    TextStyle3: {
        marginBottom: 13,
        fontSize: 18,
        fontWeight: '300',
    },
    TextStyle4: {
        marginBottom: 12,
        fontSize: 19,
        fontWeight: '400',
        color: 'white',
        top: 10
    },
    buttonTouchable: {
        fontSize: 15,
        padding: 8,
        margin: 10,
        width: 205,
        marginBottom: 10,
        backgroundColor: '#023246',
        borderRadius: 20,
        height: 43,
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextStyle2: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
