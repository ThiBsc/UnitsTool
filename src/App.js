/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import ConvertScreen from 'src/containers/ConvertScreen';
import HomeScreen from 'src/containers/HomeScreen';
import { conversion } from 'src/utils/conversion';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' options={{title: 'Accueil', headerStyle: {backgroundColor: 'lightskyblue' }, headerTintColor: '#fff'}}>
            {props => <HomeScreen {...props} conversionsData={conversion} />}
          </Stack.Screen>
          {
            conversion.map( (conv, index) => {
              return <Stack.Screen
                        key={index}
                        name={conv.category}
                        options={{title: conv.title, headerStyle: {backgroundColor: 'lightskyblue' }, headerTintColor: '#fff'}}>
                          {props => <ConvertScreen {...props} conversionData={conv} />}
                      </Stack.Screen>
            })
          }
        </Stack.Navigator>
      </NavigationContainer>      
    </SafeAreaProvider>
  );
}

export default App;
 