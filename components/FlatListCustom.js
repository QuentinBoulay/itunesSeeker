import { FlatList, Image, Pressable, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon  from "react-native-vector-icons/AntDesign";

const FlatListCustom = ({ data, category, navigation }) => {

    const [isFavorite, setIsFavorite] = useState(false);

    console.log(data)

    const toggleFavorite = async (item) => {
        const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
        if (favorites.some(fav => fav.trackId === item.trackId)) {
            const newFavorites = favorites.filter(fav => fav.trackId !== item.trackId);
            await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
            setIsFavorite(false);
        } else {
            favorites.push(item);
            await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
            setIsFavorite(true);
        }
    }

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                    <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, alignItems: "center"}}>
                        <TouchableOpacity style={{flexDirection: "row", alignItems: "center", gap: 20, }} onPress={() => navigation.navigate('Results', { item })}>
                            {
                                category === 'musicArtist' ? <Icon name="user" size={20} /> : <Image source={{uri: item.artworkUrl100}} style={{width: 50, height: 50, borderRadius: 25}} />
                            }
                            <Text style={{width: 250}} numberOfLines={1}>{category === 'musicArtist' ? item.artistName : item.trackName}</Text>
                        </TouchableOpacity>

                        { category === 'musicTrack' && <Pressable onPress={() => toggleFavorite(item)} >
                                { isFavorite ? <Icon name="heart" size={20} /> : <Icon name="hearto" size={20} /> } 
                            </Pressable>
                        }
                    </View>
            )}
        />
    );
}

export default FlatListCustom;
