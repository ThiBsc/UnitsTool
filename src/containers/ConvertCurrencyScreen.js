import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UnitValue from 'src/components/UnitValue';
import ListUnitItem from 'src/components/ListUnitItem';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, useTheme } from '@rneui/themed';
import { getEuropeanCentralBankRates } from 'src/utils/currencies';
import { convertCurrency } from '../utils/currencies';


const ConvertCurrencyScreen = ({ navigation }) => {

  const defaultUnit = {iso: 'EUR', name: 'Euro', symbol: '€'};

  const isInitialized = useRef(false);
  const [refUnit, setRefUnit] = useState(defaultUnit);
  const [value, setValue] = useState(0);
  const [fxRate, setFxRate] = useState([]);
  const { theme } = useTheme();

  const bgColor = theme.mode === 'light' ? theme.colors.disabled : theme.colors.background;
  
  const keyExtractor = (item, index) => item + index;

  const renderItem = ({ item }) => {
    const isReferenceUnit = item.iso == refUnit.iso;
    let unityValue = isReferenceUnit ? value : convertCurrency(refUnit, item, value);
    return <ListUnitItem
              unit={item}
              value={unityValue}
              isReferenceUnit={isReferenceUnit}
              setRefUnit={saveCurrencyFavorite}
            />
  }

  const initFxRate = async () => {
    const fxRate = await getEuropeanCentralBankRates();
    setFxRate(fxRate);
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
        <Text>Last update: {fxRate.day} (from ECB)</Text>
        <View style={{flex: 1, width: '100%'}}>
          <FlatList
            data={fxRate.rates}
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