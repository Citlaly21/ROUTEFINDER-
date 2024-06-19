import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
// Obtiene la instancia de autenticación
const auth = getAuth(app);

export default function Register(props) {

    const { navigation } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleRegister = async () => {
        try {
            // Crear cuenta de usuario en Firebase
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('Usuario creado exitosamente!');
            Alert.alert('Usuario registrado', 'El usuario se ha creado correctamente.');
            // Aquí puedes realizar otras acciones, como redireccionar a la pantalla de inicio de sesión
            navigation.navigate('Mapas');
        } catch (error) {
            console.error('Error al crear usuario:', error.message);
            setEmailError('');
            setPasswordError('');

            // Alerta de error contraseña y correo en uso
            if (error.code === 'auth/weak-password') {
                Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
            } else if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Error', 'El correo electrónico ingresado ya está en uso. Por favor, inicia sesión o utiliza otro correo electrónico.');
            } else if(email === '' && password === ''){
                setEmailError('Ingresa tu correo electronico');
                setPasswordError('Ingresa tu contraseña');
            } else if(error.code === 'auth/invalid-email'){
                Alert.alert('Correo invalido', 'El correo que ha ingresado es invalido');
            } else if(email === ''){
                setEmailError('Ingresa tu correo electronico');
            } else if(error.code === 'auth/missing-password'){
                setPasswordError('Ingresa tu contraseña');
            } else {
                Alert.alert('Error', 'Hubo un problema al crear el usuario. Por favor, inténtalo de nuevo más tarde.');
            }
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
                <View style={{ height: 75 }} />

                <Text style={styles.TextStyle3}>Correo</Text>

                <TextInput style={styles.TextInputStyle} 
                keyboardType="email-address" 
                placeholder="ejemplo@email.com" 
                value={email} 
                onChangeText={setEmail} 
                autoCapitalize="none"></TextInput>
                {emailError !== '' && <Text style={{ color: 'red' }}>{emailError}</Text>}

                <View style={{ height: 10 }} />
                <Text style={styles.TextStyle3}>Contraseña</Text>

                <TextInput style={styles.TextInputStyle} 
                secureTextEntry 
                placeholder="contraseña" 
                value={password} 
                onChangeText={setPassword} 
                autoCapitalize="none"></TextInput>
                {passwordError !== '' && <Text style={{ color: 'red' }}>{passwordError}</Text>}

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
