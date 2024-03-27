import { StyleSheet, backgroundImage,ImageBackground } from 'react-native';


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
        marginTop: 20, // Ajusta el margen superior del formulario
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Color negro transparente
        zIndex: 0, // Coloca la barra negra detrás del título y la imagen
    },
    map: {
        flex: 1,
    },
    mapContainer: {
        height: 550, //  altura del mapa
        marginVertical: 20, // Margen vertical
        position: 'relative', //  posición del nombre de la ruta
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    icon: {
        width: 100,
        height: 90,
        marginLeft: 250, // Mover hacia la izquierda
        marginTop: -70
    },
    toggleSidebarButton: {
        position: 'absolute',
        top: 10,
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: 200,
        zIndex: 10,
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
        width: '100%',
    },
    savedRouteItem: {
        padding: 10,
    },
    savedRouteName: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
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