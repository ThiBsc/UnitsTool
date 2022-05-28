import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import translation from 'src/utils/translation.json';
import { FlatList, Text, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';


const LanguageMenu = ({ currentLanguage, changeLanguage }) => {

  const keyExtractor = (item, index) => item + index;

  const renderItem = ({ item }) => {
    const isCurrentLanguage = item.iso === currentLanguage;
    return <MenuOption
            value={item.iso}
            style={{
              borderLeftWidth: isCurrentLanguage ? 5 : null,
              borderLeftColor: isCurrentLanguage ? 'slategrey' : null
            }}
          >
            <Text>{`${item.emoji} ${item.name}`}</Text>
          </MenuOption>
  }

  return (
    <View>
      <Menu onSelect={value => changeLanguage(value)}>
        <MenuTrigger children={<Icon name='language' size={32} color='steelblue'/>}/>
        <MenuOptions>
          <FlatList
            data={translation}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        </MenuOptions>
      </Menu>
    </View>
  );
}

export default LanguageMenu;