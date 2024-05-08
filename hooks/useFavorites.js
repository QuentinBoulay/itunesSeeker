import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFavorites = () => {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const favs = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
            setFavorites(favs);
        }
        fetchFavorites();
    }, [favorites]);

    const isFavorite = (item) => {
        return favorites.some(fav => fav.trackId === item.trackId);
    };

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

  return { favorites, toggleFavorite, isFavorite };
}

export default useFavorites;
