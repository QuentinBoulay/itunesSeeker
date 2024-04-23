import SearchScreen from "./screens/SearchScreen";
import ResultScreen from "./screens/ResultScreen";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import HeartIcon from "./assets/icons/HeartIcon";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Itunes Seeker', headerRight: () => (<HeartIcon />) }} />
        <Stack.Screen name="Results" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

