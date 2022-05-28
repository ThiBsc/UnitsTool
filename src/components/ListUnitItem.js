import React from 'react';
import TouchableScale from 'react-native-touchable-scale';
import { Avatar, ListItem } from "@rneui/themed";
import { Text } from "react-native";
import { useTranslation } from 'react-i18next';

const ListUnitItem = ({ unit, value, isReferenceUnit, setRefUnit }) => {
  
  const { t } = useTranslation();

  return (
    <ListItem
      Component={TouchableScale}
      containerStyle={{ borderRadius: 10, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5 }}
      onLongPress={() => setRefUnit(unit)}
      pad={20}
    >
        <Avatar
          size={32}
          rounded
          title={unit.symbol}
          containerStyle={{ backgroundColor: 'dodgerblue' }}
        />
        <ListItem.Content>
          <ListItem.Title>
            <Text>{value}</Text>
          </ListItem.Title>
          <ListItem.Subtitle>
            <Text>{t(unit.name)}</Text>
          </ListItem.Subtitle>
        </ListItem.Content>
        {
					isReferenceUnit
					? <ListItem.Chevron name='star' size={32} color='orange'/>
					: null
        }
    </ListItem>
  );
}

export default ListUnitItem;