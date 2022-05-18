import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, View } from 'react-native';
import { Button } from '@rneui/base';


const HomeScreen = ({ navigation, conversionsData }) => {
  return (
    <View style={[ styles.container ]}>
      {
        conversionsData.map( (conv, index) => {
          //console.log('HOMESCREEN', index, conv);
          return <Button
                    key={index}
                    containerStyle={{flex: 1}}
                    type='solid'
                    iconPosition='top'
                    title={conv.title}
                    icon={<Icon name={conv.icon} size={32} color='white'/>}
                    onPress={() => navigation.navigate(conv.category)}
                  />
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default HomeScreen;