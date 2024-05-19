import { FlatList, Image, Pressable, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";
import useFavorites from "../hooks/useFavorites";

const FlatListCustom = ({ data, category, navigation }) => {
    // Hook to manage favorite items
    const { toggleFavorite, isFavorite } = useFavorites();

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => {
                return (
                    <View style={styles.itemContainer}>
                        {/* Touchable item leading to different screens based on category */}
                        <TouchableOpacity
                            style={styles.touchableItem}
                            onPress={() => {
                                if (category === 'musicTrack') {
                                    navigation.navigate('TrackResult', { item });
                                } else if (category === 'album') {
                                    navigation.navigate('AlbumResult', { item });
                                } else {
                                    navigation.navigate('ArtistResult', { item });
                                }
                            }}
                        >
                            {/* Display appropriate icon or image based on category */}
                            {category === 'musicArtist' ? (
                                <Icon name="user" size={20} />
                            ) : category === 'album' ? (
                                <Icon name="book" size={20} />
                            ) : (
                                <Image source={{ uri: item.artworkUrl100 }} style={styles.image} />
                            )}
                            {/* Display appropriate text based on category */}
                            <Text style={styles.text} numberOfLines={1}>
                                {category === 'musicArtist' ? item.artistName : category === 'album' ? item.collectionName : item.trackName}
                            </Text>
                        </TouchableOpacity>

                        {/* Heart icon to toggle favorite status for music tracks */}
                        {category === 'musicTrack' && (
                            <Pressable onPress={() => toggleFavorite(item)}>
                                {isFavorite(item) ? (
                                    <Icon name="heart" size={20} />
                                ) : (
                                    <Icon name="hearto" size={20} />
                                )}
                            </Pressable>
                        )}
                    </View>
                );
            }}
        />
    );
};

export default FlatListCustom;

const styles = {
    itemContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
        alignItems: "center",
    },
    touchableItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    text: {
        width: 250,
    },
};