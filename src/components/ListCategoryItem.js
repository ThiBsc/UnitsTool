import React from 'react';
import TouchableScale from 'react-native-touchable-scale';
import { Avatar, ListItem } from "@rneui/themed";
import { Text } from "react-native";
import { useTranslation } from 'react-i18next';

const ListCategoryItem = ({ navigation, conversion }) => {

  const { t } = useTranslation();

  return (
    <ListItem
      Component={TouchableScale}
      containerStyle={{ borderRadius: 10, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5 }}
      onPress={() => navigation.navigate(conversion.category)}
      pad={20}
    >
        <Avatar
          size={38}
          rounded
          icon={{ name: conversion.icon, type: 'font-awesome', color: 'white' }}
          containerStyle={{ backgroundColor: 'dodgerblue' }}
        />
        <ListItem.Content>
          <ListItem.Title>
            <Text>{t(conversion.title)}</Text>
          </ListItem.Title>
          <ListItem.Subtitle>
            <Text style={{color: 'grey'}}>({conversion.units.length} {t('units')})</Text>
          </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
  );
}

export default ListCategoryItem;