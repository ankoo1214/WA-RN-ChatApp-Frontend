/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
  SafeAreaView,
} from 'react-native-safe-area-context';

import StackNav from './src/navigation/StackNav';
import { ThemeProvider } from './src/context/ThemeProvider';
import GlobalState from './src/context/index';
function App() {
  return (
    <GlobalState>
      <ThemeProvider>
        <SafeAreaView style={styles.container}>
          <StackNav />
        </SafeAreaView>
      </ThemeProvider>
    </GlobalState>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
