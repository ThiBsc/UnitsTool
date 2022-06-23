import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Input, useTheme } from '@rneui/themed';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';


const UnitValue = ({ value, setValue, unit }) => {

  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <View style={{flex: 0, flexDirection: 'row', height: 60}}>
      <View style={{flex: 9}}>
        <Input
            placeholder={t('value')}
            keyboardType='numeric'
            clearButtonMode='always'
            value={value}
            onChangeText={value => setValue(value)}
            selectTextOnFocus={true}
            leftIcon={<Icon name='pencil-alt' size={32} color={theme.colors.grey0}/>}
        />
      </View>
      <View style={{flex: 0, flexDirection: 'row', alignItems: 'center', marginRight: 5}}>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: theme.colors.grey0}}>{unit?.symbol ?? ''}</Text>
      </View>
    </View>
  );
}

export default UnitValue;