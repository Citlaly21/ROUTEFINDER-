import React from "react";
import { StatusBarBar } from "expo-status-bar";
import react from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';

export default function Login(props){

    const {navigation} = props;

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

                    <Text style={styles.TextStyle3}>Correo electronico</Text>
                    <TextInput style={styles.TextInputStyle} 
                    keyboardType="email-address" 
                    placeholder=" email"></TextInput>

                    <View style={{height:20}}/>

                    <Text style={styles.TextStyle3}>Contraseña</Text>
                    <TextInput style={styles.TextInputStyle} 
                    secureTextEntry={true}
                    placeholder="contraseña"></TextInput>

                    <TouchableOpacity>
                        <Text style={[styles.TextStyle3,{
                        color:"#002060",
                        textAlign:"center",
                        fontSize:14
                    }]}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>

                    <View style={{height:30}}/>

                    <TouchableOpacity style={styles.buttonTouchable}    onPress={() => navigation.navigate('Mapas')} >

                        <Text style={styles.TextStyle2}>Entrar</Text>

                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.sinCuenta}>¿No tienes cuenta? Registrate</Text>
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
        paddindTop: 40,
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
}
)