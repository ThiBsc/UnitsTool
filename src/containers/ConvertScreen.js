import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UnitValue from 'src/components/UnitValue';
import ListUnitItem from 'src/components/ListUnitItem';
import { convert } from 'src/utils/conversion';
import { StyleSheet, View , Text, FlatList } from 'react-native';


const ConvertScreen = ({ navigation, conversionData }) => {

  const defaultUnit = conversionData.units.find(unit => unit.name == conversionData.reference);

  const isInitialized = useRef(false);
  const [refUnit, setRefUnit] = useState(defaultUnit);
  const [value, setValue] = useState(0);
  
  const keyExtractor = (item, index) => item + index;

  const renderItem = ({ item }) => {
    const isReferenceUnit = (item.name == refUnit.name);
    let unityValue = isReferenceUnit ? value : convert(conversionData, refUnit.name, item.name, value);
    if (isNaN(unityValue)) unityValue = '?';
  
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
        setRefUnit(JSON.parse(value));
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
      alignItems: 'center'
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