import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import FlatListCustom from '../components/FlatListCustom';
import Icon  from "react-native-vector-icons/AntDesign";

const AlbumResult = ({ route, navigation }) => {
    const { item } = route.params;
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        console.log(item);
        const collectionId = item.collectionId;

        const getTracks = async () => {
            const query = `lookup?id=${collectionId}&entity=song`
            const response = await fetch(`https://itunes.apple.com/${query}`);
            const data = await response.json();
            setResults(data.results);
            setLoading(false);
        };

        getTracks();
    }, []);

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <View style={{flexDirection: "row", alignItems: "center", gap: 20, paddingHorizontal: 20}}>
                    <Icon name="book" size={50} />
                    <View style={{flexDirection: "column", gap: 20 }}>
                        <Text style={styles.title}>{item.collectionName}</Text>
                        <Text>Artiste : {item.artistName}</Text>
                        <Text>Genre : {item.primaryGenreName}</Text>
                        <Text>Prix : {item.collectionPrice}</Text>
                    </View>

                </View>
                
                <View style={{ marginTop: 100, borderTopWidth: 1, borderColor: "gray", paddingTop: 20, flex: 1 }}>            
                    <Text style={[styles.subtitle, {marginBottom: 20}]}>Musiques de l'album</Text>
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        {
                            loading ? <ActivityIndicator size="large" color="black" /> : <FlatListCustom data={results} category="musicTrack" navigation={navigation} />
                        }
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

    title: {
        fontSize: 24,
        fontWeight: "bold",
    },

    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
    }
});
