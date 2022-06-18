import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import TouchableScale from 'react-native-touchable-scale';
import { ListItem } from "@rneui/themed";
import { Button } from '@rneui/base';
import { Text } from "react-native";
import { useTranslation } from 'react-i18next';

const ListUnitItem = ({ unit, value, isReferenceUnit, setRefUnit }) => {
  
  const { t } = useTranslation();

  return (
    <ListItem
      Component={TouchableScale}
      containerStyle={{ borderRadius: 10, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5 }}
      pad={20}
    >
      <ListItem.Content>
        <ListItem.Title>
          <Text style={{fontWeight: 'bold'}}>{value}</Text>
          {' '}
          <Text>{unit.symbol}</Text>
        </ListItem.Title>
        <ListItem.Subtitle>
          <Text style={{color: 'grey'}}>{t(unit.name)}</Text>
        </ListItem.Subtitle>
      </ListItem.Content>

      <Button size='md' type='clear' color={'white'} disabled={isReferenceUnit} onPress={() => setRefUnit(unit)}>
        <Icon name="star" solid={isReferenceUnit} size={24} color={isReferenceUnit ? 'orange' : 'gainsboro'}/>
      </Button>
    </ListItem>
  );
}

export default ListUnitItem;