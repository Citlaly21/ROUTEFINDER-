import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import { signInWithEmailAndPassword } from '@firebase/auth';
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

export default function Login(props){

    const {navigation} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            // Inicia sesión en Firebase
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Usuario inició sesión exitosamente!');
            // Aquí puedes realizar otras acciones, como redireccionar a otra pantalla
            navigation.navigate('Mapas');
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
        }
    };

    return(
        <View style={{flex: 1, alignItems:'center'}}>

            <StatusBar style="auto"/>
            <View style={{
                flex:1,
                width:"100%",
                alignItems: "center"
            }}>
                <Image resizeMode="cover"
                    style={{
                        height:"110%",
                        width: "102%",
                        alignItems: "center",
                        justifyContent:"center",
                        marginLeft: -5
                    }}
                source={require('../img/ROUTEFINDER.png')}
                />
            </View>

            <View style={styles.container}>
                <View style={{alignItems:"center"}}>

                    <Text style={{
                        color:"#0037A4",
                        position: "relative",
                        fontSize:25,
                        fontWeight:"bold",
                        margin:15
                    }}>Iniciar sesión</Text>

                    <Text style={styles.TextStyle3}>Correo electrónico</Text>
                    <TextInput style={styles.TextInputStyle} 
                        keyboardType="email-address" 
                        placeholder="Correo electrónico"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <View style={{height:20}}/>

                    <Text style={styles.TextStyle3}>Contraseña</Text>
                    <TextInput style={styles.TextInputStyle} 
                        secureTextEntry={true}
                        placeholder="Contraseña"
                        value={password}
                        onChangeText={setPassword}
                    />

                    <View style={{height:30}}/>

                    <TouchableOpacity style={styles.buttonTouchable} onPress={handleLogin}>
                        <Text style={styles.TextStyle2}>Entrar</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.sinCuenta}>¿No tienes cuenta? Regístrate</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    TextStyle:{
        fontSize:35,
        color:"#000000",
        flex:0.3,
        resizeMode:'cover',
        fontWeight:'bold',
        textAlign:'center'
    },

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

    TextStyle3:{
        fontWeight:'bold',
        fontSize:17,
        textAlign:'center' 
    },

    buttonTouchable:{
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

    TextStyle2:{
        color:'#FFFFFF',
        fontWeight:'bold',
        textAlign:'center'
    },

    container:{
        backgroundColor:'#FFF',
        paddingHorizontal: 88,
        paddingTop: 40,
        flex:2,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent:"space-around",
        width: "100%"
    },
    
    sinCuenta:{
        color:"gray",
        fontSize:16,
        textAlign:"center"
    }
});
