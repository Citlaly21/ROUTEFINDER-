import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Image, TextInput } from "react-native";
import backgroundImage from '../img/fondoazul.jpg';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';;
import Icon from 'react-native-vector-icons/FontAwesome';
import routesCoordinates from "./coordenadas";
import { getDatabase, ref, push } from '@firebase/database';
import { initializeApp } from '@firebase/app';

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
// Obtiene la instancia de la base de datos
const db = getDatabase(app);

const Mapas = (props) => {
    const { navigation } = props;
    const [mapRef, setMapRef] = useState(null);
    const [showRoute, setShowRoute] = useState(false);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [savedRoutes, setSavedRoutes] = useState(routesCoordinates)
    const [selectedRouteIndex, setSelectedRouteIndex] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const [comments, setComments] = useState("");

    const handleRoutePress = (index) => {
        setSelectedRouteIndex(index);
        setRouteCoordinates(savedRoutes[index].coordinates);
        setShowRoute(prevState => !prevState); // Cambiar el estado actual de showRoute
    };
    

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const handleCommentsChange = (text) => {
        setComments(text);
    };

    const handleCommentsSubmit = () => {
        // Guarda el comentario en la base de datos
        const commentsRef = ref(db, 'comments');
        push(commentsRef, comments);

        // Limpia el campo de comentarios después de enviar
        setComments("");
    };

    return (
        <View style={styles.container}>
            
                <View style={styles.content}>
                    <View style={styles.header}>
                        {/* Barra negra transparente */}
                        <View style={styles.transparentBar}></View>

                        <Text style={styles.title}>ROUTE FINDER</Text>
                        <Image source={require('../img/logo2.png')} style={styles.icon} />
                        {/* Botón para mostrar/ocultar la barra lateral */}
                        {!showSidebar && (
                            <TouchableOpacity onPress={toggleSidebar} style={styles.toggleSidebarButton}>
                                <Icon name="bars" size={20} color="white" />
                            </TouchableOpacity>
                        )}
                    </View>

                    {/* Barra lateral */}
                    {showSidebar && (
                        <View style={styles.sidebar}>
                            <Text style={styles.title}>Rutas</Text>
                            <ScrollView style={styles.savedRoutesList}>
                                {savedRoutes.map((route, index) => (
                                    <TouchableOpacity key={index} style={styles.savedRouteItem} onPress={() => handleRoutePress(index)}>
                                        <Text style={styles.savedRouteName}>{route.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                            {/* Icono de cierre de la barra lateral */}
                            <TouchableOpacity onPress={toggleSidebar} style={styles.closeSidebarButton}>
                                <Icon name="times" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    )}

                    <ScrollView>
                        <View style={styles.mapContainer}>
                            <MapView
                                style={styles.map}
                                ref={(ref) => setMapRef(ref)}
                                provider={PROVIDER_GOOGLE}
                                initialRegion={{
                                    latitude: 18.4616,
                                    longitude: -97.3924,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                                showsUserLocation={true}
                            >
                                {showRoute && (
                                    <Polyline
                                        coordinates={routeCoordinates}
                                        strokeColor="#FF0000"
                                        strokeWidth={2}
                                    />
                                )}
                            </MapView>
                            {/* Mostrar el nombre de la ruta seleccionada */}
                            {selectedRouteIndex !== null && (
                                <View style={styles.routeNameContainer}>
                                    <Text style={styles.routeName}>{savedRoutes[selectedRouteIndex].name}</Text>
                                </View>
                            )}
                        </View>

                        {/* Sección de comentarios */}
                        <View style={styles.commentsContainer}>
                            <Text style={styles.commentsTitle}>Comentarios</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nombre"
                                onChangeText={handleCommentsChange}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                onChangeText={handleCommentsChange}
                            />
                            <TextInput
                                style={[styles.input, styles.textarea]}
                                placeholder="Mensaje"
                                multiline={true}
                                onChangeText={handleCommentsChange}
                            />
                            <TouchableOpacity style={styles.submitButton} onPress={handleCommentsSubmit}>
                                <Text style={styles.submitButtonText}>Enviar</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#124C96'
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative', // Ajusta la posición de la barra negra
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: '600',
        marginRight: 'auto',
        zIndex: 1, // Asegura que el título esté por delante de la barra negra
    },
    icon: {
        width: 100,
        height: 80,
        marginLeft: 'auto',
    },
    toggleSidebarButton: {
        marginLeft: 'auto',
    },
    transparentBar: {
        position: 'absolute',
        top: -10,
        left: -50,
        right: -50,
        height: 100, // Ajusta la altura de la barra negra
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Color negro transparente
        zIndex: 0, // Coloca la barra negra detrás del título y la imagen
    },
    sidebar: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 200,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingTop: 40,
        paddingHorizontal: 20,
        zIndex: 1, // Asegura que la barra lateral esté por delante del mapa
    },
    savedRoutesList: {
        marginBottom: 50,
    },
    savedRouteItem: {
        marginBottom: 10,
    },
    savedRouteName: {
        color: 'white',
        fontSize: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
    },
    closeSidebarButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        padding: 10,
    },
    mapContainer: {
        height: 550, // Ajusta la altura del mapa
        marginVertical: 20, // Margen vertical
        position: 'relative', // Ajusta la posición del nombre de la ruta
    },
    map: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    routeNameContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 5,
        padding: 10,
    },
    routeName: {
        color: 'white',
        fontSize: 16,
    },
    commentsContainer: {
        marginTop: 20, // Ajusta el margen superior del formulario
        paddingHorizontal: 10,
    },
    commentsTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    textarea: {
        height: 100,
    },
    submitButton: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Mapas;
