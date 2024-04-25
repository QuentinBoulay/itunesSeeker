import SearchScreen from "./screens/SearchScreen";
import TrackResult from "./screens/TrackResultScreen";
import ArtistResult from "./screens/ArtistResultScreen";
import FavoritesScreen from "./screens/FavoritesScreen";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Icon  from "react-native-vector-icons/AntDesign";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Search" component={SearchScreen} options={{ 
          title: 'Itunes Seeker', 
          headerRight: () => {
            const navigation = useNavigation()
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
                <View style={{flexDirection: "row", alignItems: "center", marginRight: 10}}>
                  <Text style={{marginRight: 10}}>Favoris</Text>
                  <Icon name="heart" size={20} />
                </View>
              </TouchableOpacity>
            )} 
         }} />
        <Stack.Screen name="TrackResult" component={TrackResult} />
        <Stack.Screen name="ArtistResult" component={ArtistResult} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

