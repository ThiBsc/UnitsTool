import React from 'react';
import TouchableScale from 'react-native-touchable-scale';
import { Avatar, ListItem } from "@rneui/themed";
import { Text } from "react-native";

const ListUnitItem = ({ unit, value, isReferenceUnit, setRefUnitName }) => {
  return (
    <ListItem
      Component={TouchableScale}
      containerStyle={{ borderRadius: 10, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5 }}
      onLongPress={() => setRefUnitName(unit.name)}
      //onPress={() => console.log("onPress()")}
      pad={20}
    >
        <Avatar
          size={32}
          rounded
          title={unit.symbol}
          containerStyle={{ backgroundColor: 'coral' }}
        />
        <ListItem.Content>
          <ListItem.Title>
            <Text>{value}</Text>
          </ListItem.Title>
          <ListItem.Subtitle>
            <Text>{unit.name}</Text>
          </ListItem.Subtitle>
        </ListItem.Content>
        {
					isReferenceUnit
					? <ListItem.Chevron name='check-circle' size={32} color='palegreen'/>
					: null
        }
    </ListItem>
  );
}

export default ListUnitItem;