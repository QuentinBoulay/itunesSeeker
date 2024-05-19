import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import FlatListCustom from '../components/FlatListCustom';
import Icon from "react-native-vector-icons/AntDesign";

const ArtistResult = ({ route, navigation }) => {
    // Extract the item from the route parameters
    const { item } = route.params;
    
    // State to hold the track results and loading status
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // useEffect to fetch tracks when the component mounts
    useEffect(() => {
        setLoading(true);
        const artistName = item.artistName;

        // Function to fetch tracks by the artist from iTunes API
        const getTracks = async () => {
            const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(artistName)}&entity=song`);
            const data = await response.json();
            setResults(data.results);
            setLoading(false);
        };

        getTracks();
    }, [item.artistName]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                {/* Artist Information */}
                <View style={styles.artistInfoContainer}>
                    <Icon name="user" size={50} />
                    <View style={styles.artistDetails}>
                        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{item.artistName}</Text>
                        <Text>Genre : {item.primaryGenreName}</Text>
                    </View>
                </View>

                {/* Artist's Tracks */}
                <View style={styles.tracksContainer}>
                    <Text style={[styles.subtitle, { marginBottom: 20 }]}>Musiques de l'artiste</Text>
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

export default ArtistResult;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    artistInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        paddingHorizontal: 40,
    },
    artistDetails: {
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
        justifyContent: "center",
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