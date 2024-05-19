import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFavorites = () => {
    // State to hold the list of favorite items
    const [favorites, setFavorites] = useState([]);

    // useEffect to fetch favorites from AsyncStorage when the component mounts or favorites change
    useEffect(() => {
        const fetchFavorites = async () => {
            const favs = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
            setFavorites(favs);
        };
        fetchFavorites();
    }, [favorites]);

    // Function to check if an item is a favorite
    const isFavorite = (item) => {
        return favorites.some(fav => fav.trackId === item.trackId);
    };

    // Function to toggle an item in the favorites list
    const toggleFavorite = async (item) => {
        let newFavorites;
        if (isFavorite(item)) {
            newFavorites = favorites.filter(fav => fav.trackId !== item.trackId);
        } else {
            newFavorites = [...favorites, item];
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
        setFavorites(newFavorites);
    };

    // Return the favorites list and the functions to toggle and check favorites
    return { favorites, toggleFavorite, isFavorite };
};

export default useFavorites;