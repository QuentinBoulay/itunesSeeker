import React, { useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFavorites from '../hooks/useFavorites';

const TrackResult = ({ route, navigation }) => {
    const { item } = route.params;
    const [rating, setRating] = useState(0);

    const { isFavorite, toggleFavorite } = useFavorites()

    const handleRating = async (newRating) => {
        await AsyncStorage.setItem(`rating_${item.trackId}`, newRating.toString());
        setRating(newRating);
    };

    return (
        <View style={styles.container}>
            <Text>{item.artistName} - {item.trackName}</Text>
            <Button title={isFavorite ? "Enlever des favoris" : "Ajouter aux favoris"} onPress={() => toggleFavorite()} />
            <Text>Rating: {rating}</Text>
            {[1, 2, 3, 4, 5].map((rate) => (
                <Button key={rate} title={`Note ${rate}`} onPress={() => handleRating(rate)} />
            ))}
        </View>
    );
};

export default TrackResult;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});
