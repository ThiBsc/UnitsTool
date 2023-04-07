import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UnitValue from 'src/components/UnitValue';
import ListUnitItem from 'src/components/ListUnitItem';
import { convert, fractionToNumber, getlowestfraction } from 'src/utils/conversion';
import { StyleSheet, View, FlatList } from 'react-native';
import { useTheme } from '@rneui/themed';


const ConvertScreen = ({ navigation, conversionData }) => {

  const defaultUnit = conversionData.units.find(unit => unit.name == conversionData.reference);

  const isInitialized = useRef(false);
  const [refUnit, setRefUnit] = useState(defaultUnit);
  const [value, setValue] = useState(0);
  const { theme } = useTheme();

  const bgColor = theme.mode === 'light' ? theme.colors.disabled : theme.colors.background;
  
  const keyExtractor = (item, index) => item + index;

  const renderItem = ({ item }) => {
    const isReferenceUnit = (item.name == refUnit.name);

    let trueValue = value;
    const isFractional = value.toString().includes('/');
    if (isFractional) {
      trueValue = fractionToNumber(value);
    }

    let unityValue = isReferenceUnit ? parseFloat(trueValue) : convert(conversionData, refUnit.name, item.name, trueValue);
    if (isNaN(unityValue)) {
      unityValue = '?';
    } else {
      if (item.isFraction) {
        const fraction = getlowestfraction(unityValue);
        // If displayable as a readable fraction
        if (fraction.match(/^(\d+|\d\/\d)$/))
          unityValue = fraction;
      } else if (item.compositeUnits) {
        let buildedValue = '';
        unityValue.toString().split(/,|\./).forEach((val, idx) => {
          buildedValue += `${val}${item.symbols[idx]}`;
        });
        unityValue = buildedValue
      } else {
        unityValue = unityValue.toLocaleString();
      }
    }
  
    return <ListUnitItem
              unit={item}
              value={unityValue}
              isReferenceUnit={isReferenceUnit}
              setRefUnit={saveCategoryFavorite}
            />
  }

  const loadCategoryFavorite = async () => {
    try {
      const value = await AsyncStorage.getItem(`unitstool_${conversionData.category}_favorite`);
      if (value !== null && value.length > 0) {
        const savedUnit = JSON.parse(value);
        // check if favourite init exist in conversionData
        const exist = conversionData.units.some(unit => unit.name == savedUnit.name);
        setRefUnit(exist ? savedUnit : defaultUnit);
      }
    } catch(e) {
    }
  }

  const saveCategoryFavorite = async (value) => {
    try {
      const jsonStrValue = JSON.stringify(value);
      await AsyncStorage.setItem(`unitstool_${conversionData.category}_favorite`, jsonStrValue);
      setRefUnit(value);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (!isInitialized.current) {
      loadCategoryFavorite();
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
        {/*<Text>{conversionData.title}</Text>*/}
        <View style={{flex: 1, width: '100%'}}>
          <FlatList
            data={conversionData.units}
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

export default ConvertScreen;