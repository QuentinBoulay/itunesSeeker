import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFavorites = (item) => {

    const [favorites, setFavorites] = useState([]);
    const [isFavorite, setIsFavorite] = useState()

    useEffect(() => {
        const fetchFavorites = async () => {
            const favs = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
            setFavorites(favs);
        }

        const checkFavorite = async () => {
            if (favorites.some(fav => fav.trackId === item.trackId)) setIsFavorite(true)
            else setIsFavorite(false)
        }
        fetchFavorites();
        checkFavorite();
    }, [favorites]);

    const toggleFavorite = async () => {
        if (favorites.some(fav => fav.trackId === item.trackId)) {
            const newFavorites = favorites.filter(fav => fav.trackId !== item.trackId);
            await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
            setFavorites(newFavorites);
            setIsFavorite(false)
        } else {
            const newFavorites = [...favorites, item];
            await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
            setFavorites(newFavorites);
            setIsFavorite(true)
        }
    }

    const isInFavorites = async () => {
        if (favorites.some(fav => fav.trackId === item.trackId)) return true
        else return false
    }

  return { favorites, toggleFavorite, isFavorite };
}

export default useFavorites;
