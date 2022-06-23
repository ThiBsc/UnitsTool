import React from 'react';
import TouchableScale from 'react-native-touchable-scale';
import { Avatar, ListItem, Text, useTheme } from "@rneui/themed";
import { useTranslation } from 'react-i18next';

const ListCategoryItem = ({ navigation, conversion }) => {

  const { t } = useTranslation();
  const { theme } = useTheme();

  const bgColor = theme.mode === 'light' ? theme.colors.background : theme.colors.searchBg;

  return (
    <ListItem
      Component={TouchableScale}
      containerStyle={{ borderRadius: 10, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5, backgroundColor: bgColor }}
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
            <Text style={{color: theme.colors.grey2}}>({conversion.units.length} {t('units')})</Text>
          </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
  );
}

export default ListCategoryItem;