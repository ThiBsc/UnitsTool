import React, { useState } from 'react';
import ListCategoryItem from 'src/components/ListCategoryItem';
import EmptyDataComponent from 'src/components/EmptyDataComponent';
import { FlatList, StyleSheet, View } from 'react-native';


const HomeScreen = ({ navigation, conversionsData, saveData }) => {

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshConversionJson = () => {
    setIsRefreshing(true);

    fetch('https://raw.githubusercontent.com/ThiBsc/UnitsTool/main/src/utils/conversion.json')
      .then((response) => response.text())
      .then((json) => saveData(json))
      .catch((_) => console.error('Unable to fetch conversion.json'))
      .finally(() => setIsRefreshing(false));
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
        ListEmptyComponent={EmptyDataComponent}
        contentContainerStyle={conversionsData.length === 0 && styles.centerEmptySet}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerEmptySet: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
});

export default HomeScreen;