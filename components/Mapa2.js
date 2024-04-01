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
        { name: "Ruta 8", coordinates: [{latitude: 18.4539077, longitude: -97.4303646},{latitude: 18.4560832, longitude: -97.4295406},{latitude: 18.4561748, longitude: -97.4283176},
            {latitude: 18.4574978, longitude: -97.4289613},{latitude: 18.4578031, longitude: -97.4283497},{latitude: 18.4614895, longitude: -97.4303109},{latitude: 18.4633416, longitude: -97.4311156},
            {latitude: 18.464298, longitude: -97.4317354},{latitude: 18.4648172, longitude: -97.4307293},{latitude: 18.46528, longitude: -97.4302226},{latitude: 18.465265, longitude: -97.4298389},
            {latitude: 18.4649798, longitude: -97.4296003},{latitude: 18.4648628, longitude: -97.4292892},{latitude: 18.4639774, longitude: -97.428506},{latitude: 18.4629753, longitude: -97.4277467},{latitude: 18.4623339, longitude: -97.4271059},
            {latitude: 18.4625275, longitude: -97.4256868},{latitude: 18.4627766, longitude: -97.4242735},{latitude: 18.4608888, longitude: -97.4232489},{latitude: 18.4602731, longitude: -97.4228519},
            {latitude: 18.4606242, longitude: -97.4190593},{latitude: 18.4605329, longitude: -97.4167068},{latitude: 18.4605329, longitude: -97.4167068},{latitude: 18.4602598, longitude: -97.4098349},
            {latitude: 18.4602241, longitude: -97.4086601},{latitude: 18.4597814, longitude: -97.4087137},{latitude: 18.4595474, longitude: -97.4088532},{latitude: 18.4587943, longitude: -97.4072385},{latitude: 18.4581074, longitude: -97.4058384},{latitude: 18.4574357, longitude: -97.4044168},
            {latitude: 18.4571507, longitude: -97.403875},{latitude: 18.4571049, longitude: -97.4035746},{latitude: 18.4569624, longitude: -97.4035746},{latitude: 18.4570032, longitude: -97.4024266},{latitude: 18.4562806, longitude: -97.4023998},
            {latitude: 18.4562195, longitude: -97.400651},{latitude: 18.4562218, longitude: -97.3988707},{latitude: 18.4568935, longitude: -97.3988278},{latitude: 18.4589136, longitude: -97.3990746},{latitude: 18.4589085, longitude: -97.398227},
            {latitude: 18.4588525, longitude: -97.3965372},{latitude: 18.4588271, longitude: -97.3941822},{latitude: 18.458649, longitude: -97.3895366},{latitude: 18.4586532, longitude: -97.38956},{latitude: 18.4586023, longitude: -97.3879266},{latitude: 18.4585362, longitude: -97.3866338},
            {latitude: 18.4585082, longitude: -97.3861161},{latitude: 18.4584691, longitude: -97.385139},{latitude: 18.4584208, longitude: -97.3838461},{latitude: 18.4583928, longitude: -97.3832963},{latitude: 18.4583165, longitude: -97.3817674},{latitude: 18.4582096, longitude: -97.3811934},{latitude: 18.4580671, longitude: -97.3804102},
            {latitude: 18.4569935, longitude: -97.3806168},{latitude: 18.4568154, longitude: -97.3796726},{latitude: 18.4559529, longitude: -97.3798631},{latitude: 18.4555633, longitude: -97.3799159},{latitude: 18.4552086, longitude: -97.3799693},{latitude: 18.454682, longitude: -97.3800163},
            {latitude: 18.4536808, longitude: -97.380145},{latitude: 18.4531986, longitude: -97.3801933},{latitude: 18.4527025, longitude: -97.3802536},{latitude: 18.4526898, longitude: -97.3796059},{latitude: 18.4521657, longitude: -97.3796971},{latitude: 18.4516237, longitude: -97.3798232},{latitude: 18.4507472, longitude: -97.3799613},
            {latitude: 18.4499852, longitude: -97.3790198},{latitude: 18.4497129, longitude: -97.3786296},{latitude: 18.4483444, longitude: -97.3763882}, 
            {latitude: 18.4526898, longitude: -97.3796059}, {latitude: 18.4532161, longitude: -97.3795554}, {latitude: 18.4536944, longitude: -97.3794937}, {latitude: 18.4551549, longitude: -97.3792496},
            {latitude: 18.4558876, longitude: -97.3791397}, {latitude: 18.4566865, longitude: -97.3790029}, {latitude: 18.4577754, longitude: -97.3788312}, {latitude: 18.4579052, longitude: -97.3794374},
            {latitude: 18.4580671, longitude: -97.3804102}, {latitude: 18.4591824, longitude: -97.3802206}, {latitude: 18.4600729, longitude: -97.3800597}, {latitude: 18.4603883, longitude: -97.3816127},
            {latitude: 18.460485, longitude: -97.3821706}, {latitude: 18.4606148, longitude: -97.3826721}, {latitude: 18.4606555, longitude: -97.3838818}, {latitude: 18.460686, longitude: -97.385298},
            {latitude: 18.4607471, longitude: -97.3871702}, {latitude: 18.4607878, longitude: -97.3882753}, {latitude: 18.4608132, longitude: -97.389434}, {latitude: 18.4574192, longitude: -97.3895413},
            {latitude: 18.4527022, longitude: -97.3896593}, {latitude: 18.4540506, longitude: -97.3907322}, {latitude: 18.4552312, longitude: -97.3916119},
            {latitude: 18.4552312, longitude: -97.3916119}, {latitude: 18.4563667, longitude: -97.3925155}, {latitude: 18.4565524, longitude: -97.3925129}, {latitude: 18.456672, longitude: -97.394774},
            {latitude: 18.4567127, longitude: -97.3960507}, {latitude: 18.4567916, longitude: -97.39685}, {latitude: 18.4568781, longitude: -97.3984754}, {latitude: 18.4569671, longitude: -97.4006882},
            {latitude: 18.4570129, longitude: -97.4023619}, {latitude: 18.4571223, longitude: -97.4024826}, {latitude: 18.4571198, longitude: -97.4034026}, {latitude: 18.4576846, longitude: -97.404446},
            {latitude: 18.4583283, longitude: -97.4058542}, {latitude: 18.4586997, longitude: -97.4064604}, {latitude: 18.4590686, longitude: -97.4072623}, {latitude: 18.459753, longitude: -97.4087322},
            {latitude: 18.4600634, longitude: -97.4094778}, {latitude: 18.4602568, longitude: -97.4097863}, {latitude: 18.4539077, longitude: -97.4303646}]},
        {name: "Ruta 21", coordinates: [{latitude: 18.4909678, longitude: -97.3872008}, {latitude: 18.4907147, longitude: -97.3872236}, {latitude: 18.4906867, longitude: -97.3871298}, {latitude: 18.4900807, longitude: -97.3877145},
            {latitude: 18.4900603, longitude: -97.3877333}, {latitude: 18.4903745, longitude: -97.3880752}, {latitude: 18.4904699, longitude: -97.3880806}, {latitude: 18.491813, longitude: -97.3880122},
            {latitude: 18.4929093, longitude: -97.3879921}, {latitude: 18.4934237, longitude: -97.3879628}, {latitude: 18.4938027, longitude: -97.387885}, {latitude: 18.4938841, longitude: -97.3878957},
            {latitude: 18.4938993, longitude: -97.3885958}, {latitude: 18.4939121, longitude: -97.3889954}, {latitude: 18.4938307, longitude: -97.3889847}, {latitude: 18.4938129, longitude: -97.3879252},
            {latitude: 18.4935941, longitude: -97.3879467}, {latitude: 18.4934033, longitude: -97.3879977}, {latitude: 18.4928971, longitude: -97.3880218}, {latitude: 18.4914955, longitude: -97.3880513},
            {latitude: 18.4908138, longitude: -97.3880889}, {latitude: 18.4904043, longitude: -97.3880996}, {latitude: 18.4903381, longitude: -97.3880754}, {latitude: 18.4900151, longitude: -97.3877053},
            {latitude: 18.4906688, longitude: -97.38713}, {latitude: 18.4906892, longitude: -97.3870971}, {latitude: 18.4907121, longitude: -97.3870602}, {latitude: 18.4907082, longitude: -97.3869543},
            {latitude: 18.4914243, longitude: -97.386906}, {latitude: 18.4923159, longitude: -97.3868966}, {latitude: 18.4923572, longitude: -97.3856936}, {latitude: 18.4928294, longitude: -97.3854603},
            {latitude: 18.4928531, longitude: -97.3848983}, {latitude: 18.493015, longitude: -97.3848051}, {latitude: 18.4932079, longitude: -97.3848041}, {latitude: 18.4933653, longitude: -97.3846856},
            {latitude: 18.4934517, longitude: -97.3845499}, {latitude: 18.493561, longitude: -97.3844015}, {latitude: 18.4935655, longitude: -97.3843209}, {latitude: 18.4935546, longitude: -97.3842617},
            {latitude: 18.4934535, longitude: -97.384185}, {latitude: 18.4933321, longitude: -97.3842147}, {latitude: 18.4931141, longitude: -97.3843462}, {latitude: 18.4929622, longitude: -97.3844537},
            {latitude: 18.4928459, longitude: -97.3845933}, {latitude: 18.490029, longitude: -97.3846153},{latitude: 18.490029, longitude: -97.3846153}, {latitude: 18.4891033, longitude: -97.3864412}, {latitude: 18.4885717, longitude: -97.3874872}, {latitude: 18.4884674, longitude: -97.3875838},
            {latitude: 18.4876636, longitude: -97.3862588}, {latitude: 18.4871243, longitude: -97.3854058}, {latitude: 18.4866206, longitude: -97.38462}, {latitude: 18.4859058, longitude: -97.3845931},
            {latitude: 18.4864425, longitude: -97.3862507}, {latitude: 18.4854047, longitude: -97.3862534}, {latitude: 18.4844355, longitude: -97.3862534}, {latitude: 18.4831028, longitude: -97.3862527},
            {latitude: 18.4813984, longitude: -97.3862849}, {latitude: 18.4803554, longitude: -97.3863117}, {latitude: 18.4793023, longitude: -97.3863439}, {latitude: 18.4793379, longitude: -97.3854614},
            {latitude: 18.4785518, longitude: -97.3854722}, {latitude: 18.4785722, longitude: -97.3860998}, {latitude: 18.4785416, longitude: -97.38636}, {latitude: 18.4784577, longitude: -97.3870788},
            {latitude: 18.4784017, longitude: -97.3871673}, {latitude: 18.4784908, longitude: -97.3881651}, {latitude: 18.4785772, longitude: -97.3886157}, {latitude: 18.4784399, longitude: -97.3886533},
            {latitude: 18.4784984, longitude: -97.3891522}, {latitude: 18.478651, longitude: -97.3891468}, {latitude: 18.4787909, longitude: -97.3899193}, {latitude: 18.4778319, longitude: -97.3901526},
            {latitude: 18.4771934, longitude: -97.3903028}, {latitude: 18.4773282, longitude: -97.3893775}, {latitude: 18.4764378, longitude: -97.3893453}, {latitude: 18.4760486, longitude: -97.3893372},
            {latitude: 18.4752269, longitude: -97.3893372}, {latitude: 18.4737056, longitude: -97.3893077}, {latitude: 18.4729856, longitude: -97.390394}, {latitude: 18.472431, longitude: -97.3911665},
            {latitude: 18.472487, longitude: -97.3912577}, {latitude: 18.4724972, longitude: -97.3913355}, {latitude: 18.4724654, longitude: -97.3914307}, {latitude: 18.4724221, longitude: -97.3914843},
            {latitude: 18.472342, longitude: -97.3915112}, {latitude: 18.4722797, longitude: -97.3915165}, {latitude: 18.4722072, longitude: -97.3914669}, {latitude: 18.4721652, longitude: -97.3914066},
            {latitude: 18.4721486, longitude: -97.3913154}, {latitude: 18.4721792, longitude: -97.3911987}, {latitude: 18.4712926, longitude: -97.3904115}, {latitude: 18.4701287, longitude: -97.3893681},
            {latitude: 18.4689203, longitude: -97.3893332}, {latitude: 18.4668367, longitude: -97.389352}, {latitude: 18.465875, longitude: -97.3893493}, {latitude: 18.46285, longitude: -97.3893949},
            {latitude: 18.4608132, longitude: -97.389434}, {latitude: 18.4586725, longitude: -97.3894593}, {latitude: 18.4586725, longitude: -97.3894593}, {latitude: 18.4584691, longitude: -97.385139}, {latitude: 18.456188, longitude: -97.3852433}, {latitude: 18.4563399, longitude: -97.3891391},
            {latitude: 18.4565382, longitude: -97.3892883}, {latitude: 18.4566526, longitude: -97.389395}, {latitude: 18.4567212, longitude: -97.3894857}, {latitude: 18.4563954, longitude: -97.389549},
            {latitude: 18.4564869, longitude: -97.3915709}, {latitude: 18.4700954, longitude: -97.3912715}, {latitude: 18.4721154, longitude: -97.3913323}, {latitude: 18.4721689, longitude: -97.391226},
            {latitude: 18.4722332, longitude: -97.3911627}, {latitude: 18.4723219, longitude: -97.3911412}, {latitude: 18.4723904, longitude: -97.3911733}, {latitude: 18.4729812, longitude: -97.390321},
            {latitude: 18.4743323, longitude: -97.3902958}, {latitude: 18.4743159, longitude: -97.3893485}, {latitude: 18.4759384, longitude: -97.3893912}, {latitude: 18.4772992, longitude: -97.3893971},
            {latitude: 18.4773353, longitude: -97.389412}, {latitude: 18.477341, longitude: -97.3894859}, {latitude: 18.4772226, longitude: -97.3902612}, {latitude: 18.478756, longitude: -97.3899018},
            {latitude: 18.4786303, longitude: -97.3891817}, {latitude: 18.4784899, longitude: -97.3891864}, {latitude: 18.478422, longitude: -97.3886654}, {latitude: 18.478422, longitude: -97.3886654}, {latitude: 18.4794915, longitude: -97.3884043}, {latitude: 18.4797494, longitude: -97.3883404}, {latitude: 18.4804283, longitude: -97.38819},
            {latitude: 18.4811021, longitude: -97.3880437}, {latitude: 18.4824524, longitude: -97.3877449}, {latitude: 18.4833692, longitude: -97.3875244}, {latitude: 18.4833595, longitude: -97.3874182},
            {latitude: 18.4842291, longitude: -97.3872122}, {latitude: 18.4854296, longitude: -97.3869382}, {latitude: 18.4865761, longitude: -97.3866972}, {latitude: 18.4878693, longitude: -97.3864078},
            {latitude: 18.4885375, longitude: -97.387456}, {latitude: 18.4890496, longitude: -97.3864385}, {latitude: 18.4899664, longitude: -97.3876758}, {latitude: 18.49016, longitude: -97.387902},
            {latitude: 18.4902829, longitude: -97.3880359}, {latitude: 18.4903702, longitude: -97.3881081}, {latitude: 18.4908868, longitude: -97.3880996}, {latitude: 18.4913588, longitude: -97.3880806},
            {latitude: 18.4918765, longitude: -97.3880577}, {latitude: 18.4927459, longitude: -97.3880322}, {latitude: 18.4930718, longitude: -97.3880191}, {latitude: 18.4934034, longitude: -97.3880046},
            {latitude: 18.4936292, longitude: -97.3879577}, {latitude: 18.4938607, longitude: -97.3879285}, {latitude: 18.4939287, longitude: -97.3890063}, {latitude: 18.4938197, longitude: -97.3890047},
            {latitude: 18.4937906, longitude: -97.3879491}, {latitude: 18.4935941, longitude: -97.3879779}, {latitude: 18.4934158, longitude: -97.3880124}, {latitude: 18.4927543, longitude: -97.388045},
            {latitude: 18.4918016, longitude: -97.3880761}, {latitude: 18.4908407, longitude: -97.3881252}, {latitude: 18.4904143, longitude: -97.3881303}, {latitude: 18.4901973, longitude: -97.3879008},
            {latitude: 18.490043, longitude: -97.387715}, {latitude: 18.4906691, longitude: -97.3871856}, {latitude: 18.4907126, longitude: -97.3872521}, {latitude: 18.4909469, longitude: -97.3872516}]},



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
