import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConvertScreen from 'src/containers/ConvertScreen';
import MainMenu from 'src/components/MainMenu';
import HomeScreen from 'src/containers/HomeScreen';
import i18n from 'i18next';
import conversion from 'src/utils/conversion.json';
import en from 'src/locales/en.json';
import fr from 'src/locales/fr.json';
import es from 'src/locales/es.json';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initReactI18next, useTranslation } from 'react-i18next';
import { NavigationContainer } from '@react-navigation/native';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en,
      fr,
      es
    },
    fallbackLng: 'en',
    compatibilityJSON: 'v3'
  });

const Stack = createNativeStackNavigator();

const RootNavigation = ({ value, setValue, unit }) => {

  const isInitialized = useRef(false);
  const { t } = useTranslation();
  const [usedConversions, setUsedConversions] = useState(conversion);
  const [darkMode, setDarkMode] = useState(false);

  const changeLanguage = async (iso) => {
    await AsyncStorage.setItem('unitstool_language', iso);
    i18n.changeLanguage(iso);
  }

  const initLanguage = async () => {
    const iso = await AsyncStorage.getItem('unitstool_language');
    if (iso !== null && iso !== i18n.language) {
      changeLanguage(iso);
    }
  }

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
      initLanguage();
      initData();
    }

    return () => {
      isInitialized.current = true;
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          options={{
            title: t('home'),
            headerStyle: {backgroundColor: 'lightskyblue' },
            headerTintColor: '#fff',
            headerRight: () => (
                <MainMenu currentLanguage={i18n.language} changeLanguage={changeLanguage} darkMode={darkMode} setDarkMode={setDarkMode}/>
            )
          }}
        >
          {props => <HomeScreen {...props} conversionsData={usedConversions} saveData={storeConversionData} />}
        </Stack.Screen>
        {
          usedConversions.map( (conv, index) => {
          return <Stack.Screen
                    key={index}
                    name={conv.category}
                    options={{title: t(conv.title), headerStyle: {backgroundColor: 'lightskyblue' }, headerTintColor: '#fff'}}>
                    {props => <ConvertScreen {...props} conversionData={conv} />}
                  </Stack.Screen>
          })
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;