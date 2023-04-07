import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Button, Input, useTheme } from '@rneui/themed';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';


const UnitValue = ({ value, setValue, unit }) => {

  const { t } = useTranslation();
  const { theme } = useTheme();
  const [showDivide, setShowDivide] = useState(false);
  const canDivide = value.includes('/');

  const divide = () => {
    setValue(value + '/');
  }

  return (
    <View style={{flex: 0, flexDirection: 'row', height: 60, alignItems: 'baseline'}}>
      <View style={{flex: 9}}>
        <Input
            placeholder={t('value')}
            keyboardType='numeric'
            clearButtonMode='always'
            onFocus={() => setShowDivide(true)}
            onBlur={() => setShowDivide(false)}
            value={value}
            onChangeText={value => setValue(value)}
            selectTextOnFocus={true}
            leftIcon={<Icon name='pencil-alt' size={32} color={theme.colors.grey0}/>}
        />
      </View>
      {
        showDivide &&
        <Button type='clear' disabled={canDivide} onPress={divide} buttonStyle={{borderRadius: 20}}>
          <Icon name="divide" solid size={24} color={canDivide ? theme.colors.grey4 : theme.colors.grey0}/>
        </Button>
      }
      <View style={{flex: 0, flexDirection: 'row', alignItems: 'center', marginLeft: 5, marginRight: 5}}>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: theme.colors.grey0}}>
          {unit?.symbol ?? ''}
          {unit?.emoji ? ` ${unit.emoji}` : ''}
        </Text>
      </View>
    </View>
  );
}

export default UnitValue;