/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Suspense } from 'react';
import RootNavigation from './containers/RootNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MenuProvider } from 'react-native-popup-menu';
import { ThemeProvider } from '@rneui/themed';

const App = () => {

  return (
    <Suspense fallback="Loading...">
      <SafeAreaProvider>
        <ThemeProvider>
          <MenuProvider>
            <RootNavigation/>
          </MenuProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </Suspense>
  );
}

export default App;
 