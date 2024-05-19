import SearchScreen from "./screens/SearchScreen";
import TrackResult from "./screens/TrackResultScreen";
import ArtistResult from "./screens/ArtistResultScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import AlbumResult from "./screens/AlbumResultScreen";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/AntDesign";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

// Create a stack navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Define stack navigator */}
      <Stack.Navigator 
        initialRouteName="Search"
        screenOptions={{
          headerRight: () => {
            // Use navigation hook to navigate to Favorites screen
            const navigation = useNavigation();
            return (
              <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
                <View style={styles.headerRight}>
                  <Text style={styles.headerRightText}>Favoris</Text>
                  <Icon name="heart" size={20} />
                </View>
              </TouchableOpacity>
            );
          }
        }}
      >
        {/* Define screens */}
        <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Itunes Seeker' }} />
        <Stack.Screen name="TrackResult" component={TrackResult} />
        <Stack.Screen name="AlbumResult" component={AlbumResult} />
        <Stack.Screen name="ArtistResult" component={ArtistResult} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles for header right component
const styles = {
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  headerRightText: {
    marginRight: 10,
  },
};