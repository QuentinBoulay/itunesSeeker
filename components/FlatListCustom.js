import { FlatList, Image, Pressable, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon  from "react-native-vector-icons/AntDesign";
import useFavorites from "../hooks/useFavorites";

const FlatListCustom = ({ data, category, navigation }) => {

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => {
                const { favorites, toggleFavorite, isFavorite } = useFavorites(item);

                return (
                    <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, alignItems: "center"}}>
                        <TouchableOpacity style={{flexDirection: "row", alignItems: "center", gap: 20, }} onPress={() => { category === 'musicTrack' ? navigation.navigate('TrackResult', { item }) : navigation.navigate('ArtistResult', { item }) }}>
                            {
                                category === 'musicArtist' ? <Icon name="user" size={20} /> : <Image source={{uri: item.artworkUrl100}} style={{width: 50, height: 50, borderRadius: 25}} />
                            }
                            <Text style={{width: 250}} numberOfLines={1}>{category === 'musicArtist' ? item.artistName : item.trackName}</Text>
                        </TouchableOpacity>

                        { category === 'musicTrack' && <Pressable onPress={toggleFavorite} >
                            { isFavorite ? <Icon name="heart" size={20} /> : <Icon name="hearto" size={20} /> }
                        </Pressable>
                        }
                    </View>
                );
            }}
        />
    );
}

export default FlatListCustom;
