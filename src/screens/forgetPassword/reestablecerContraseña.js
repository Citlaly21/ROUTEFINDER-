import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, View, Text, ImageBackground } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function reestablecerContraseña(props) {

    const { navigation } = props;
    const [email, setEmail] = useState('');

    const handleResetPassword = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert('Solicitud enviada', 'Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.');
        } catch (error) {
            console.error('Error al enviar solicitud:', error.message);
            if(error.code == 'auth/missing-email'){
                Alert.alert('Error', 'No ha ingresado un email para la recuperación.');
            } else if(error.code === 'auth/invalid-email'){
                Alert.alert('Correo invalido', 'El correo que ha ingresado es invalido');
            }else {
                Alert.alert('Error', 'Hubo un problema al enviar la solicitud para restablecer la contraseña. Por favor, inténtalo de nuevo más tarde.');
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent:'center' }}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{
                    color: "#FFFFFF",
                    position: "relative",
                    fontSize: 25,
                    fontWeight: "bold",
                    margin: 15
                }}>Recuperar contraseña</Text>
                <TextInput style={styles.TextInputStyle}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Ingresa tu email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TouchableOpacity style={styles.buttonTouchable} onPress={handleResetPassword}>
                        <Text style={styles.TextStyle2}>Enviar solicitud de recuperación</Text>
                </TouchableOpacity>
            </View>

        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    TextInputStyle:{
        backgroundColor:'#DEDEDE',
        fontSize:15,
        borderWidth:1,
        borderColor:'#DEDEDE',
        padding:6,
        margin:5,
        width:200,
        marginBottom:5,
        borderRadius:15
    },

    buttonTouchable:{
        fontSize: 15,
        padding: 8,
        margin: 10,
        width: 205,
        marginBottom: 10,
        backgroundColor: '#023246',
        borderRadius: 20,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
    },

    TextStyle2:{
        color:'#FFFFFF',
        fontWeight:'bold',
        textAlign:'center'
    },

});