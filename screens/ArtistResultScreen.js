import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import FlatListCustom from '../components/FlatListCustom';
import Icon  from "react-native-vector-icons/AntDesign";

const ArtistResult = ({ route, navigation }) => {
    const { item } = route.params;
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const artistName = item.artistName;
        const getTracks = async () => {
            const response = await fetch(`https://itunes.apple.com/search?term=${artistName}&entity=musicTrack`);
            const data = await response.json();
            console.log(data.results);
            setResults(data.results);
            setLoading(false);
        }

        getTracks();
    }, []);

    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", alignItems: "center", gap: 20}}>
                <Icon name="user" size={50} />
                <Text style={styles.title}>{item.artistName}</Text>
            </View>
            
            <View style={{ marginTop: 100, borderTopWidth: 1, borderColor: "gray", paddingTop: 20, flex: 1 }}>            
                <Text style={[styles.subtitle, {marginBottom: 20}]}>Musique de l'artiste</Text>
                {
                    loading ? <View style={{justifyContent: 'center', flex: 1}}><ActivityIndicator size="large" color="black" /></View> : <FlatListCustom data={results} category="musicTrack" navigation={navigation} />
                }
            </View>

        </View>
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
