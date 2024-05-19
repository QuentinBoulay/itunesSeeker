import { View, StyleSheet, Text } from "react-native";
import FlatListCustom from "../components/FlatListCustom";
import useFavorites from "../hooks/useFavorites";

const FavoritesScreen = ({ navigation }) => {
    // Get the list of favorite items using the custom hook
    const { favorites } = useFavorites();

    return (
        <View style={styles.container}>
            {favorites.length === 0 ? (
                // Display message if no favorites are found
                <Text style={styles.noFavoritesText}>
                    Aucun favori pour le moment
                </Text>
            ) : (
                // Display the list of favorite items
                <FlatListCustom data={favorites} category="musicTrack" navigation={navigation} />
            )}
        </View>
    );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    noFavoritesText: {
        alignSelf: 'center',
        textAlign: 'center',
        paddingHorizontal: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
});