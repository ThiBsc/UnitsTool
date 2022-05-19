/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConvertScreen from 'src/containers/ConvertScreen';
import HomeScreen from 'src/containers/HomeScreen';
import conversion from 'src/utils/conversion.json';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {

  const isInitialized = useRef(false);
  const [usedConversions, setUsedConversions] = useState(conversion);

  const initData = async () => {
    try {
      const value = await AsyncStorage.getItem('unitstool_conversionDataJson');
      if(value === null) {
        storeConversionData(JSON.stringify(conversion));
      } else {
        storeConversionData(value);
      }
    } catch(e) {
      storeConversionData(conversion);
    }
  }

  const storeConversionData = async (value) => {
    try {
      const jsonStrValue = value;
      await AsyncStorage.setItem('unitstool_conversionDataJson', jsonStrValue);
      setUsedConversions(JSON.parse(jsonStrValue));
    } catch (e) {
      console.error('Unable to save the conversion data');
    }
  }

  useEffect(() => {
    if (!isInitialized.current) {
      initData();
    }

    return () => {
      isInitialized.current = true;
    };
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' options={{title: 'Home', headerStyle: {backgroundColor: 'lightskyblue' }, headerTintColor: '#fff'}}>
            {props => <HomeScreen {...props} conversionsData={usedConversions} saveData={storeConversionData} />}
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
 