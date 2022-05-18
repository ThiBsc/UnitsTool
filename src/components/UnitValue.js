import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Input } from '@rneui/themed';


const UnitValue = ({ value, setValue }) => {

  return (
    <Input
        placeholder='Valeur'
        keyboardType='numeric'
        clearButtonMode='always'
        value={value}
        onChangeText={value => setValue(value)}
        leftIcon={<Icon name='pencil-alt' size={32} color='black'/>}
    />
  );
}

export default UnitValue;