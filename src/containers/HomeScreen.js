import React, { useState } from 'react';
import ListCategoryItem from 'src/components/ListCategoryItem';
import { FlatList, StyleSheet, View } from 'react-native';


const HomeScreen = ({ navigation, conversionsData }) => {

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshConversionJson = () => {
  }

  const keyExtractor = (item, index) => item + index;

  const renderItem = ({ item }) => (
    <ListCategoryItem
      navigation={navigation}
      conversion={item}
    />
  );

  return (
    <View style={[ styles.container ]}>
      <FlatList
        data={conversionsData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onRefresh={refreshConversionJson}
        refreshing={isRefreshing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default HomeScreen;