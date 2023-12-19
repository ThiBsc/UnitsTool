import React from 'react';
import { Icon } from "@rneui/themed";
import { ListItem, Text, useTheme } from "@rneui/themed";
import { useTranslation } from 'react-i18next';
import { currencyCount } from '../utils/currencies';

const ListCategoryItem = ({ navigation, conversion }) => {

  const { t } = useTranslation();
  const { theme } = useTheme();

  const bgColor = theme.mode === 'light' ? theme.colors.background : theme.colors.searchBg;

  return (
    <ListItem
      containerStyle={{ borderRadius: 10, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5, backgroundColor: bgColor }}
      onPress={() => navigation.navigate(conversion.category)}
      pad={20}
    >
      <Icon name={conversion.icon} size={18} color='dodgerblue' type='font-awesome-5' containerStyle={{margin: 0}} reverse/>
      <ListItem.Content>
        <ListItem.Title>
          <Text>{t(conversion.title)}</Text>
        </ListItem.Title>
        <ListItem.Subtitle>
          {
            conversion.category === 'currency'
            ? <Text style={{color: theme.colors.grey2}}>({currencyCount} {t('currencies')})</Text>
            : <Text style={{color: theme.colors.grey2}}>({conversion.units.length} {t('units')})</Text>
          }
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

export default ListCategoryItem;