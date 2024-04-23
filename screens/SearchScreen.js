import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SearchScreen = ({ navigation }) => {
    const [searchArtist, setSearchArtist] = useState('');
    const [searchTrack, setSearchTrack] = useState('');
    const [results, setResults] = useState([]);

    const searchItunes = async () => {
        const query = `term=${encodeURIComponent(searchTrack)}+${encodeURIComponent(searchArtist)}&entity=musicTrack`;
        const response = await fetch(`https://itunes.apple.com/search?${query}`);
        const data = await response.json();
        setResults(data.results);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={searchArtist}
                onChangeText={setSearchArtist}
                placeholder="Search by Artist"
            />
            <TextInput
                style={styles.input}
                value={searchTrack}
                onChangeText={setSearchTrack}
                placeholder="Search by Track Name"
            />
            <Button title="Search" onPress={searchItunes} />
            <FlatList
                data={results}
                keyExtractor={item => item.trackId.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Results', { item })}>
                        <Text>{item.artistName} - {item.trackName}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        marginBottom: 20,
    },
});