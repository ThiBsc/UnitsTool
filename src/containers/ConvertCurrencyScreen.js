import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UnitValue from 'src/components/UnitValue';
import ListUnitItem from 'src/components/ListUnitItem';
import Snackbar from 'react-native-snackbar';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, useTheme } from '@rneui/themed';
import { convertCurrency, getEuropeanCentralBankRates } from 'src/utils/currencies';
import { useTranslation } from 'react-i18next';


const ConvertCurrencyScreen = ({ navigation }) => {

  const defaultUnit = {iso: 'EUR', name: 'Euro', symbol: '€', emoji: '🇪🇺'};

  const { t } = useTranslation();
  const isInitialized = useRef(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refUnit, setRefUnit] = useState(defaultUnit);
  const [value, setValue] = useState(0);
  const [fxRate, setFxRate] = useState([]);
  const { theme } = useTheme();

  const bgColor = theme.mode === 'light' ? theme.colors.disabled : theme.colors.background;
  
  const keyExtractor = (item, index) => item + index;

  const renderItem = ({ item }) => {
    const isReferenceUnit = item.iso == refUnit.iso;
    let unityValue = isReferenceUnit ? value : convertCurrency(refUnit, item, value);
    if (isNaN(unityValue)) unityValue = '?';

    return <ListUnitItem
              unit={item}
              value={unityValue}
              isReferenceUnit={isReferenceUnit}
              setRefUnit={saveCurrencyFavorite}
            />
  }

  const initFxRate = async () => {
    const savedFxRate = await AsyncStorage.getItem(`unitstool_currency_fxRate`);
    if (savedFxRate !== null) {
      const objFxRate = JSON.parse(savedFxRate);
      const now = new Date();
      const today = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate()}`;
      const isWeekend = now.getDay() === 0 || now.getDay() === 6;
      // The BCE doesn't update the week-end, so check it
      if (objFxRate.day === undefined || (!isWeekend && today !== objFxRate.day)) {
        fetchFxRate();
      } else {
        setFxRate(JSON.parse(savedFxRate));
      }
    } else {
      fetchFxRate();
    }
  }

  const fetchFxRate = async () => {
    setIsRefreshing(true);
    
    let lastFxRate = await getEuropeanCentralBankRates();
    if (lastFxRate.day !== undefined) {
      saveFxRate(lastFxRate);
    } else {
      Snackbar.show({
        text: t('failToFetchCurrency'),
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: 'OK',
          textColor: theme.colors.success
        },
      });
    }

    setIsRefreshing(false);
  }

  const loadCurrencyFavorite = async () => {
    try {
      const value = await AsyncStorage.getItem(`unitstool_currency_favorite`);
      if (value !== null && value.length > 0) {
        setRefUnit(JSON.parse(value));
      }
    } catch(e) {
    }
  }

  const saveCurrencyFavorite = async (value) => {
    try {
      const jsonStrValue = JSON.stringify(value);
      await AsyncStorage.setItem(`unitstool_currency_favorite`, jsonStrValue);
      setRefUnit(value);
    } catch (e) {
      console.error(e);
    }
  }

  const saveFxRate = async (value) => {
    try {
      const jsonStrValue = JSON.stringify(value);
      await AsyncStorage.setItem(`unitstool_currency_fxRate`, jsonStrValue);
      setFxRate(value);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (!isInitialized.current) {
      initFxRate();
      loadCurrencyFavorite();
    }

    return () => {
      isInitialized.current = true;
    };
  }, []);

  return (
    <View style={[ styles.container, {
      alignItems: 'center',
      backgroundColor: bgColor
    }]}>
        <UnitValue
          value={value.toString()}
          setValue={setValue}
          unit={refUnit}
        />
        <Text>{t('update')}: {fxRate.day} ({t('sourceECB')})</Text>
        <View style={{flex: 1, width: '100%'}}>
          <FlatList
            data={fxRate.rates}
            onRefresh={fetchFxRate}
            refreshing={isRefreshing}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default ConvertCurrencyScreen;