import React, { useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConvertScreen from './ConvertScreen';
import ConvertCurrencyScreen from './ConvertCurrencyScreen';
import MainMenu from '../components/MainMenu';
import HomeScreen from './HomeScreen';
import i18n from 'i18next';
import conversion from '../utils/conversion.json';
import en from '../locales/en.json';
import fr from '../locales/fr.json';
import es from '../locales/es.json';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initReactI18next, useTranslation } from 'react-i18next';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme, useThemeMode } from '@rneui/themed';
import { Alert } from 'react-native';
import { Button } from '@rneui/base';
import { version } from '../../package.json';

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

const RootNavigation = ({ }) => {

  const isInitialized = useRef(false);
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { _, setMode } = useThemeMode();
  const [usedConversions, setUsedConversions] = useState(conversion);
  const [darkMode, setDarkMode] = useState(false);

  const setThemeMode = async (dark) => {
    const theme = dark ? 'dark' : 'light';
    await AsyncStorage.setItem('unitstool_theme', theme);
    setMode(theme);
    setDarkMode(dark);
  }

  const initThemeMode = async () => {
    const theme = await AsyncStorage.getItem('unitstool_theme');
    if (theme !== null) {
      const dark = theme === 'dark';
      setMode(theme);
      setDarkMode(dark);
    }
  }

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

  const isNewVersion = async () => {
    const currentVersion = await AsyncStorage.getItem('unitstool_version');
    const isNew = currentVersion === null || currentVersion < version;
    if (isNew)
      await AsyncStorage.setItem('unitstool_version', version);
    return isNew;
  }

  const initData = async () => {
    try {
      // Force to use the conversion file of the last version after an update
      if (await isNewVersion()) {
        storeConversionData(JSON.stringify(conversion));
      } else {
        const value = await AsyncStorage.getItem('unitstool_conversionDataJson');
        if(value === null) {
          storeConversionData(JSON.stringify(conversion));
        } else {
          storeConversionData(value);
        }
      }
    } catch(e) {
      storeConversionData(JSON.stringify(conversion));
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

  const displayCurrencyInfo = () => {
    Alert.alert(
      t('currencyInfoTitle'),
      t('currencyInfoMessage'),
      [
        { text: "OK" }
      ]
    );
  }

  useEffect(() => {
    if (!isInitialized.current) {
      initLanguage();
      initData();
      initThemeMode();
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
            headerStyle: {backgroundColor: theme.colors.primary },
            headerTintColor: theme.colors.white,
            headerRight: () => (
                <MainMenu currentLanguage={i18n.language} changeLanguage={changeLanguage} darkMode={darkMode} setDarkMode={setThemeMode}/>
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
                    options={{
                      title: t(conv.title),
                      headerStyle: {backgroundColor: theme.colors.primary },
                      headerTintColor: theme.colors.white,
                      headerRight: () => (
                        conv.category === 'currency'
                        ? <Button size='md' type='clear' color={theme.colors.white} onPress={displayCurrencyInfo}>
                            <Icon name="info" solid={false} size={24} color={theme.colors.white}/>
                          </Button>
                        : null
                      )
                    }}
                  >
                    {props => conv.category === 'currency' ? <ConvertCurrencyScreen {...props} /> : <ConvertScreen {...props} conversionData={conv} />}
                  </Stack.Screen>
          })
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;