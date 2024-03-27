import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, TextInput, Image } from "react-native";
import backgroundImage from '../img/fondoazul.jpg';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Loader } from "@googlemaps/js-api-loader";
import Icon from 'react-native-vector-icons/FontAwesome';


const Mapas = (props) => {
    const { navigation } = props;
    const [mapRef, setMapRef] = useState(null);
    const [showRoute, setShowRoute] = useState(false);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [savedRoutes, setSavedRoutes] = useState([]);
    const [newRouteName, setNewRouteName] = useState("");
    const [selectedRouteIndex, setSelectedRouteIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSidebar, setShowSidebar] = useState(false); // Estado para controlar si se muestra la barra lateral
    const [comments, setComments] = useState("");
    useEffect(() => {
        const loader = new Loader({
            apiKey: "AIzaSyBiNGlYdMIt0Ov4qGQEzZYn835FUv1eI0k",
            version: "weekly",
        });
    }, [mapRef]);

    const handleMapPress = (event) => {
        if (showRoute) {
            const newCoordinate = event.nativeEvent.coordinate;
            const newRouteCoordinates = [...routeCoordinates, newCoordinate];
            setRouteCoordinates(newRouteCoordinates);
            console.log("Nuevas coordenadas de la ruta:", newRouteCoordinates);
        }
    };
    

    const handleToggleRoute = () => {
        setShowRoute(!showRoute);
        if (!showRoute) {
            console.log("Coordenadas de la ruta:", routeCoordinates);
        }
    };
    

    const handleSaveRoute = () => {
        // Guarda la ruta actual en la lista de rutas guardadas
        setSavedRoutes([...savedRoutes, { name: newRouteName, coordinates: routeCoordinates }]);
        // Limpia el campo de entrada de nombre de ruta
        setNewRouteName("");
        // Reinicia las coordenadas de la ruta actual
        setRouteCoordinates([]);
        // Oculta la ruta mostrada en el mapa
        setShowRoute(false);
    };

    const handleRoutePress = (index) => {
        setSelectedRouteIndex(index);
        setRouteCoordinates(savedRoutes[index].coordinates);
        setShowRoute(true);
    };

    const handleDeleteRoute = (index) => {
        const newSavedRoutes = [...savedRoutes];
        newSavedRoutes.splice(index, 1);
        setSavedRoutes(newSavedRoutes);
        // Limpiar la ruta seleccionada si es la que se está eliminando
        if (selectedRouteIndex === index) {
            setSelectedRouteIndex(null);
            setShowRoute(false);
            setRouteCoordinates([]);
        }
    };

    const handleSearch = () => {
        // Aquí puedes realizar la búsqueda con la consulta 'searchQuery'
        
        console.log("Búsqueda:", searchQuery);
    };

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const handleCommentsChange = (text) => {
        setComments(text);
    };
    // Función para agregar automáticamente la ruta guardada a la barra lateral
    useEffect(() => {
        if (newRouteName !== "") {
            setSavedRoutes([...savedRoutes, { name: newRouteName, coordinates: routeCoordinates }]);
            setNewRouteName("");
            setRouteCoordinates([]);
        }
    }, [newRouteName]);

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage} blurRadius={7}>
            <View style={styles.container}>
            <View style={styles.content}>
            <View style={styles.header}>
            <View style={styles.transparentBar}></View>
                <Text style={styles.title}>ROUTE FINDER</Text>
                <Image source={require('../img/logo2.png')} style={styles.icon} />
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>Buscar</Text>
                    </TouchableOpacity>
                </View>

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
                    onPress={handleMapPress}
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

                <TouchableOpacity onPress={handleToggleRoute} style={styles.button}>
                    <Text style={styles.buttonText}>{showRoute ? 'Cancelar Dibujo' : 'Dibujar Ruta'}</Text>
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    placeholder="Nombre de la nueva ruta"
                    value={newRouteName}
                    onChangeText={setNewRouteName}
                />

                <TouchableOpacity onPress={handleSaveRoute} style={styles.button}>
                    <Text style={styles.buttonText}>Guardar Ruta</Text>
                </TouchableOpacity>
            </View>

            {/* Sección de comentarios */}
            <View style={styles.commentsContainer}>
                            <Text style={styles.commentsTitle}>Comentarios</Text>
                            <TextInput
                                style={styles.input1}
                                placeholder="Nombre"
                                onChangeText={handleCommentsChange}
                            />
                            <TextInput
                                style={styles.input1}
                                placeholder="Email"
                                onChangeText={handleCommentsChange}
                            />
                            <TextInput
                                style={[styles.input1, styles.textarea]}
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
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
    },
    
    commentsContainer: {
        marginTop: 20, 
        paddingHorizontal: 10,
    },
    input1: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    commentsTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    textarea: {
        height: 100,
    },

    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: '600',
        marginLeft: 65, // Mover hacia la izquierda
        marginTop: 20, // Mover hacia abajo
        zIndex: 1,
    },
    
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 13,
        marginTop: 25  
    },
    searchInput: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        width: '75%',
    },
    searchButton: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
        marginLeft: 10,
    },
    searchButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    transparentBar: {
        position: 'absolute',
        top: -10,
        left: -50,
        right: -50,
        height: 100, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        zIndex: 0,
    },
    map: {
        flex: 1,
    },
    mapContainer: {
        height: 550, 
        marginVertical: 20, 
        position: 'relative', 
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    icon: {
        width: 100,
        height: 90,
        marginLeft: 250, 
        marginTop: -70
    },
    toggleSidebarButton: {
        position: 'absolute',
        top: 18,
        left: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 5,
        zIndex: 10,
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
        zIndex: 1
    },
    closeSidebarButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 20,
    },
    button: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: '80%',
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
        textAlign: 'center',
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