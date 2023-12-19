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
import { ThemeProvider, createTheme } from '@rneui/themed';

const theme = createTheme({});

const App = () => {

  return (
    <Suspense fallback="Loading...">
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <MenuProvider>
            <RootNavigation/>
          </MenuProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </Suspense>
  );
}

export default App;
 