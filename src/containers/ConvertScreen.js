import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DraggableFlatList, { OpacityDecorator } from 'react-native-draggable-flatlist';
import UnitValue from '../components/UnitValue';
import ListUnitItem from '../components/ListUnitItem';
import { convert, fractionToNumber, getlowestfraction } from '../utils/conversion';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@rneui/themed';
import ShakingComponent from '../components/ShakingComponent';


const ConvertScreen = ({ navigation, conversionData }) => {

  const categoryOrderKey = `unitstool_${conversionData.category}_order`;
  const categoryFavoriteKey = `unitstool_${conversionData.category}_favorite`;
  const defaultUnit = conversionData.units.find(unit => unit.name == conversionData.reference);

  const isInitialized = useRef(false);
  const [refUnit, setRefUnit] = useState(defaultUnit);
  const [value, setValue] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [units, setUnits] = useState(conversionData.units);
  const { theme } = useTheme();

  const bgColor = theme.mode === 'light' ? theme.colors.disabled : theme.colors.background;

  const onDragEnd = ({data}) => {
    setUnits(data);
    saveCategoryOrder(data);
    setIsDragging(false);
  }
  
  const keyExtractor = (item, index) => item + index;

  const renderItem = ({ item, drag, isActive }) => {
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
  
    return (
      <OpacityDecorator activeOpacity={0.5}>
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={drag}
        >
          <ShakingComponent active={isDragging && isActive}>
            <ListUnitItem
              unit={item}
              value={unityValue}
              isReferenceUnit={isReferenceUnit}
              setRefUnit={saveCategoryFavorite}
            />
          </ShakingComponent>
        </TouchableOpacity>
      </OpacityDecorator>
    );
  }

  const loadCategoryOrder = async () => {
    try {
      const value = await AsyncStorage.getItem(categoryOrderKey);
      if (value !== null && value.length > 0) {
        const savedUnits = JSON.parse(value);
        const isCoherent =
          conversionData.units.length === savedUnits.length
          && conversionData.units.every(unit => savedUnits.some(sunit => unit.name == sunit.name));

        if (isCoherent) {
          setUnits(savedUnits);
        } else {
          await AsyncStorage.removeItem(categoryOrderKey);
        }
      }
    } catch(e) {
    }
  }

  const saveCategoryOrder = async (value) => {
    try {
      const jsonStrValue = JSON.stringify(value);
      await AsyncStorage.setItem(categoryOrderKey, jsonStrValue);
    } catch (e) {
      console.error(e);
    }
  }

  const loadCategoryFavorite = async () => {
    try {
      const value = await AsyncStorage.getItem(categoryFavoriteKey);
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
      await AsyncStorage.setItem(categoryFavoriteKey, jsonStrValue);
      setRefUnit(value);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (!isInitialized.current) {
      loadCategoryOrder();
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
        <View style={{flex: 1, width: '100%'}}>
          <DraggableFlatList
            data={units}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            onDragBegin={() => setIsDragging(true)}
            onDragEnd={onDragEnd}
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