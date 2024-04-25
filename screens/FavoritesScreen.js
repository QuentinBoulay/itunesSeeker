import { View, StyleSheet } from "react-native";
import FlatListCustom from "../components/FlatListCustom";
import useFavorites from "../hooks/useFavorites";

const FavoritesScreen = ({ navigation }) => {

    const { favorites } = useFavorites()

    return (
        <View style={styles.container}>
            <FlatListCustom data={favorites} category="musicTrack" navigation={navigation} />
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
