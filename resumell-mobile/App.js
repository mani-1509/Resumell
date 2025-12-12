import { StyleSheet, View, Text } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import StackNavigator from './src/navigation/StackNavigation'
import { NavigationContainer } from '@react-navigation/native';
const App=() => {
  return (
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;