import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import FlatListCustom from '../components/FlatListCustom';
import Icon  from "react-native-vector-icons/AntDesign";

const ArtistResult = ({ route, navigation }) => {
    const { item } = route.params;
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(item);
        setLoading(true);
        const artistName = item.artistName;
        const getTracks = async () => {
            const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(artistName)}&entity=song`);
            const data = await response.json();
            setResults(data.results);
            setLoading(false);
        }

        getTracks();
    }, []);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <View style={{flexDirection: "row", alignItems: "center", gap: 20}}>
                    <Icon name="user" size={50} />
                    <View style={{flexDirection: "column", gap: 20 }}>
                        <Text style={styles.title}>{item.artistName}</Text>
                        <Text>Genre : {item.primaryGenreName}</Text>
                    </View>

                </View>
                
                <View style={{ marginTop: 100, borderTopWidth: 1, borderColor: "gray", paddingTop: 20}}>            
                    <Text style={[styles.subtitle, {marginBottom: 20}]}>Musique de l'artiste</Text>
                    <FlatListCustom data={results} category="musicTrack" navigation={navigation} />
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

    title: {
        fontSize: 24,
        fontWeight: "bold",
    },

    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
    }
});
