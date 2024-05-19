import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import FlatListCustom from '../components/FlatListCustom';
import Icon from "react-native-vector-icons/AntDesign";

const AlbumResult = ({ route, navigation }) => {
    // Extract the album item from the route parameters
    const { item } = route.params;

    // State to hold the track results and loading status
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // useEffect to fetch tracks when the component mounts
    useEffect(() => {
        setLoading(true);
        const collectionId = item.collectionId;

        // Function to fetch tracks from the album using iTunes API
        const getTracks = async () => {
            const query = `lookup?id=${collectionId}&entity=song`;
            const response = await fetch(`https://itunes.apple.com/${query}`);
            const data = await response.json();
            setResults(data.results);
            setLoading(false);
        };

        getTracks();
    }, [item.collectionId]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                {/* Album Information */}
                <View style={styles.albumInfoContainer}>
                    <Icon name="book" size={50} />
                    <View style={styles.albumDetails}>
                        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{item.collectionName}</Text>
                        <Text>Artiste : {item.artistName}</Text>
                        <Text>Genre : {item.primaryGenreName}</Text>
                        <Text>Prix : {item.collectionPrice}</Text>
                    </View>
                </View>

                {/* Album's Tracks */}
                <View style={styles.tracksContainer}>
                    <Text style={[styles.subtitle, { marginBottom: 20 }]}>Musiques de l'album</Text>
                    <View style={styles.tracksListContainer}>
                        {loading ? (
                            <ActivityIndicator size="large" color="black" />
                        ) : (
                            <FlatListCustom data={results} category="musicTrack" navigation={navigation} />
                        )}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AlbumResult;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    albumInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        paddingHorizontal: 40
    },
    albumDetails: {
        flexDirection: "column",
        gap: 20,
        paddingHorizontal: 20
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    tracksContainer: {
        marginTop: 100,
        borderTopWidth: 1,
        borderColor: "gray",
        paddingTop: 20,
        flex: 1,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    tracksListContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});