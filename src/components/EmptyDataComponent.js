import React from 'react';
import { Text, View } from 'react-native';


const EmptyDataComponent = ({}) => {

  return (
    <Text style={{textAlign: 'center', fontSize: 24}}>
        It seems you have no data !
        {'\n'}
        Please Pull down to refresh
        {'\n'}
        👇
    </Text>
  );
}

export default EmptyDataComponent;