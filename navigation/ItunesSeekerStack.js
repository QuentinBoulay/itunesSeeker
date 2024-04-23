import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import ResultScreen from '../screens/ResultScreen';

const ItunesSeekerStack = createStackNavigator();

function ItunesSeekerStack() {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name="Search" component={<SearchScreen/>} />
      <Stack.Screen name="Results" component={<ResultScreen/>} />
    </Stack.Navigator>
  );
}