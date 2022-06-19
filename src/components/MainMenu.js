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
  const { _, setMode } = useThemeMode();
  const keyExtractor = (item, index) => item + index;

  const setThemeMode = (dark) => {
    setMode(dark ? 'dark' : 'light');
    setDarkMode(dark);
  }

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
            <Text style={{fontSize: 20}}>{`${item.emoji} ${item.name}`}</Text>
          </MenuOption>
  }

  return (
    <View>
      <Menu>
        <MenuTrigger children={<Icon name='bars' size={32} color='steelblue'/>}/>
        <MenuOptions style={{backgroundColor: theme.colors.white}}>
          <FlatList
            data={translation}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
          <Divider/>
          <MenuOption onSelect={() => setThemeMode(!darkMode)}>
            <View style={{flexDirection: 'row'}}>
              <Icon name={darkMode ? 'sun' : 'moon'} size={24} color={darkMode ? 'yellow' : 'black'} solid/>
              <Text style={{fontSize: 20}}>{' '}{t(darkMode ? 'lightmode' : 'darkmode')}</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
}

export default MainMenu;