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
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const theme = createTheme({});

const App = () => {

  return (
    <Suspense fallback="Loading...">
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <MenuProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <RootNavigation/>
            </GestureHandlerRootView>
          </MenuProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </Suspense>
  );
}

export default App;
 