import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Input } from '@rneui/themed';
import { Text, View } from 'react-native';


const UnitValue = ({ value, setValue, unit }) => {

  return (
    <View style={{flex: 0, flexDirection: 'row', height: 60}}>
      <View style={{flex: 9}}>
        <Input
            placeholder='Valeur'
            keyboardType='numeric'
            clearButtonMode='always'
            value={value}
            onChangeText={value => setValue(value)}
            leftIcon={<Icon name='pencil-alt' size={32} color='black'/>}
        />
      </View>
      <View style={{flex: 0, flexDirection: 'row', alignItems: 'center', marginRight: 5}}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>{unit.symbol}</Text>
      </View>
    </View>
  );
}

export default UnitValue;