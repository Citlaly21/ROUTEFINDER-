import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Image, TextInput } from "react-native";
import backgroundImage from '../img/fondoazul.jpg';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Loader } from "@googlemaps/js-api-loader";
import Icon from 'react-native-vector-icons/FontAwesome';

const Mapas = (props) => {
    const { navigation } = props;
    const [mapRef, setMapRef] = useState(null);
    const [showRoute, setShowRoute] = useState(false);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [savedRoutes, setSavedRoutes] = useState([
        { name: "Ruta 9", coordinates: [{ latitude: 18.46, longitude: -97.39 }, { latitude: 18.45, longitude: -97.40 }] },
        { name: "Ruta 3", coordinates: [{ latitude: 18.45, longitude: -97.39 }, { latitude: 18.46, longitude: -97.40 }] },
        { name: "Ruta 34", coordinates: [{ latitude: 18.47, longitude: -97.39 }, { latitude: 18.45, longitude: -97.41 }] },
        { name: "Ruta 78", coordinates: [{ latitude: 18.48, longitude: -97.38 }, { latitude: 18.46, longitude: -97.42 }] },
        { name: "Ruta 4", coordinates: [{ latitude: 18.47, longitude: -97.39 }, { latitude: 18.46, longitude: -97.40 }] },
        { name: "Ruta 12", coordinates: [{ latitude: 18.46, longitude: -97.39 }, { latitude: 18.45, longitude: -97.40 }] },
        { name: "ruta x", coordinates: [{ latitude: 18.45, longitude: -97.39}, {latitude: 18.45, longitude: -97.39}]}
    ]);
    const [selectedRouteIndex, setSelectedRouteIndex] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false); // Estado para controlar si se muestra la barra lateral
    const [comments, setComments] = useState(""); // Estado para almacenar los comentarios

    useEffect(() => {
        const loader = new Loader({
            apiKey: "AIzaSyBiNGlYdMIt0Ov4qGQEzZYn835FUv1eI0k",
            version: "weekly",
        });
    }, [mapRef]);

    const handleRoutePress = (index) => {
        setSelectedRouteIndex(index);
        setRouteCoordinates(savedRoutes[index].coordinates);
        setShowRoute(true);
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const handleCommentsChange = (text) => {
        setComments(text);
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
                                initialRegion={{
                                    latitude: 18.4616,
                                    longitude: -97.3924,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
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
                            <TouchableOpacity style={styles.submitButton}>
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
