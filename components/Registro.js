import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDRplYQcLl5p6G1fW4IBAwbWgYKMnri9eM",
    authDomain: "route-finder-75a0b.firebaseapp.com",
    databaseURL: "https://route-finder-75a0b-default-rtdb.firebaseio.com",
    projectId: "route-finder-75a0b",
    storageBucket: "route-finder-75a0b.appspot.com",
    messagingSenderId: "833216771763",
    appId: "1:833216771763:web:cbaec2a9392817195222c6",
    measurementId: "G-HMMHJH8PPC"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
// Obtiene la instancia de autenticación
const auth = getAuth(app);

export default function Register(props) {

    const { navigation } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');

    const handleRegister = async () => {
        try {
            // Crear cuenta de usuario en Firebase
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('Usuario creado exitosamente!');
            // Aquí puedes realizar otras acciones, como redireccionar a la pantalla de inicio de sesión
            navigation.navigate('Mapas');
        } catch (error) {
            console.error('Error al crear usuario:', error.message);
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
                height: 550
            }}>
                <Text style={styles.TextStyle}>Registro</Text>
                <View style={{ height: 30 }} />
                <Text style={styles.TextStyle3}>Nombre</Text>
                <TextInput style={styles.TextInputStyle} placeholder="Nombre" value={nombre} onChangeText={setNombre}></TextInput>
                <View style={{ height: 10 }} />
                <Text style={styles.TextStyle3}>Correo</Text>
                <TextInput style={styles.TextInputStyle} keyboardType="email-address" placeholder="ejemplo@email.com" value={email} onChangeText={setEmail}></TextInput>
                <View style={{ height: 10 }} />
                <Text style={styles.TextStyle3}>Contraseña</Text>
                <TextInput style={styles.TextInputStyle} secureTextEntry placeholder="contraseña" value={password} onChangeText={setPassword}></TextInput>
                <View style={{ height: 45 }} />
                {/* Cambia el botón para que ejecute handleRegister */}
                <TouchableOpacity style={styles.buttonTouchable} onPress={handleRegister}>
                    <Text style={styles.TextStyle2}>Crear cuenta</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.login}>¿Ya tienes cuenta? </Text>
                    <Text style={styles.login}>Inicia sesión </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    TextStyle: {
        fontSize: 35,
        color: "white",
        fontWeight: 'bold',
        textAlign: 'center'
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
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: "#FFFF"
    },

    buttonTouchable: {
        backgroundColor: '#023246',
        borderRadius: 20,
        width: 200,
        height: 45,
        padding: 6,
        justifyContent: 'center'
    },

    TextStyle2: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center'
    },

    login:{
        color:"white",
        fontSize:16,
        textAlign:"center"
    }
});
