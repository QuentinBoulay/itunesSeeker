import React, { useState, useEffect } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResultScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const [isFavorite, setIsFavorite] = useState(false);
    const [rating, setRating] = useState(0);

    const toggleFavorite = async () => {
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
    };

    const handleRating = async (newRating) => {
        await AsyncStorage.setItem(`rating_${item.trackId}`, newRating.toString());
        setRating(newRating);
    };

    useEffect(() => {
        const fetchFavoritesAndRating = async () => {
            const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
            setIsFavorite(favorites.some(fav => fav.trackId === item.trackId));
            const storedRating = await AsyncStorage.getItem(`rating_${item.trackId}`);
            setRating(storedRating ? parseInt(storedRating, 10) : 0);
        };

        fetchFavoritesAndRating();
    }, []);

    return (
        <View style={styles.container}>
            <Text>{item.artistName} - {item.trackName}</Text>
            <Button title={isFavorite ? "Enlever des favoris" : "Ajouter aux favoris"} onPress={toggleFavorite} />
            <Text>Rating: {rating}</Text>
            {[1, 2, 3, 4, 5].map((rate) => (
                <Button key={rate} title={`Note ${rate}`} onPress={() => handleRating(rate)} />
            ))}
        </View>
    );
};

export default ResultScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});
