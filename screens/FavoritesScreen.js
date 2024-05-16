import { View, StyleSheet, Text } from "react-native";
import FlatListCustom from "../components/FlatListCustom";
import useFavorites from "../hooks/useFavorites";

const FavoritesScreen = ({ navigation }) => {

    const { favorites } = useFavorites()

    return (
        <View style={styles.container}>
            {
                favorites.length === 0 ? <Text style={{ alignSelf: 'center', textAlign: 'center', paddingHorizontal: 20, fontSize: 16, fontWeight: 'bold' }} >Aucun favori pour le moment</Text> :
            <FlatListCustom data={favorites} category="musicTrack" navigation={navigation} />
            }
        </View>
    );

};

export default FavoritesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});
