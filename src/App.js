import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LoginScreen from './components/Login';
import RegisterScreen from './components/Registro';
import MapaScreen from './components/Mapas';
import resetPassword from './components/reestablecerContraseña';

const Stack = createNativeStackNavigator();
export default function App() {

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        navigation.navigate('Mapas');
      }
    });

    // Devuelve una función de limpieza para desuscribirse del listener de cambio de autenticación
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Mapas" component={MapaScreen} />
        <Stack.Screen name="reestablecerContraseña" component={resetPassword} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
