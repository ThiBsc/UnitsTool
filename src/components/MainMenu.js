import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import translation from 'src/utils/translation.json';
import { FlatList, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { Divider, Text, useTheme, useThemeMode } from '@rneui/themed';
import { useTranslation } from 'react-i18next';


const MainMenu = ({ currentLanguage, changeLanguage, darkMode, setDarkMode }) => {

  const { t } = useTranslation();
  const { theme } = useTheme();
  const keyExtractor = (item, index) => item + index;

  const renderItem = ({ item }) => {
    const isCurrentLanguage = item.iso === currentLanguage;
    return <MenuOption
            value={item.iso}
            style={{
              borderLeftWidth: isCurrentLanguage ? 5 : null,
              borderLeftColor: isCurrentLanguage ? theme.colors.black : null
            }}
            onSelect={value => changeLanguage(value)}
          >
            <Text style={{fontSize: 24}}>{`${item.emoji} ${item.name}`}</Text>
          </MenuOption>
  }

  return (
    <View>
      <Menu>
        <MenuTrigger children={<Icon name='bars' size={32} color={theme.colors.white}/>}/>
        <MenuOptions style={{backgroundColor: theme.colors.white}}>
          <FlatList
            data={translation}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
          <Divider/>
          <MenuOption onSelect={() => setDarkMode(!darkMode)}>
            <View style={{flexDirection: 'row'}}>
              <Icon name={darkMode ? 'sun' : 'moon'} size={28} color={theme.colors.black} solid/>
              <Text style={{fontSize: 24}}>{' '}{t(darkMode ? 'lightmode' : 'darkmode')}</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
}

export default MainMenu;