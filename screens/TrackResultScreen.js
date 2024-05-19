import React, { useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFavorites from '../hooks/useFavorites';
import Icon from 'react-native-vector-icons/AntDesign';
import ActionButton from '../components/ActionButton';
import SelectDropdown from 'react-native-select-dropdown';

const TrackResult = ({ route, navigation }) => {
    const { item } = route.params;
    const [rating, setRating] = useState(0);

    // Rating options
    const ratingData = [1, 2, 3, 4, 5];

    // Hook to handle favorite tracks
    const { isFavorite, toggleFavorite } = useFavorites();

    // Function to handle rating selection
    const handleRating = async (newRating) => {
        await AsyncStorage.setItem(`rating_${item.trackId}`, newRating.toString());
        setRating(newRating);
    };

    // Effect to get the saved rating on mount
    useEffect(() => {
        const getRating = async () => {
            const savedRating = await AsyncStorage.getItem(`rating_${item.trackId}`);
            setRating(savedRating ? parseInt(savedRating) : 0);
        };

        getRating();
    }, [item.trackId]);

    return (
        <View style={styles.container}>
            <View style={styles.trackInfoContainer}>
                <Image source={{ uri: item.artworkUrl100 }} style={styles.image} />
                <View style={styles.trackDetails}>
                    <Text style={[styles.title, styles.marginBottom]} numberOfLines={1} ellipsizeMode="tail">{item.trackName}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail">Artiste : {item.artistName}</Text>
                    <ActionButton
                        style={styles.marginBottom}
                        title={isFavorite(item) ? "Enlever des favoris" : "Ajouter aux favoris"}
                        iconRight={isFavorite(item) ? <Icon name="heart" size={20} color="white" /> : <Icon name="hearto" size={20} color="white" />}
                        onPress={() => toggleFavorite(item)}
                    />
                    <View style={styles.ratingContainer}>
                        <Text>Ma note</Text>
                        <View style={styles.rating}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Icon key={star} name="star" size={24} color={rating >= star ? "orange" : "gray"} />
                            ))}
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.dropdownContainer}>
                <SelectDropdown
                    data={ratingData}
                    onSelect={(selectedItem, index) => handleRating(selectedItem)}
                    renderButton={(selectedItem, isOpened) => (
                        <View style={styles.dropdownButtonStyle}>
                            <Text style={styles.dropdownButtonTxtStyle}>{selectedItem || 'Note'}</Text>
                            <Icon name={isOpened ? 'up' : 'down'} style={styles.dropdownButtonArrowStyle} />
                        </View>
                    )}
                    renderItem={(item, index, isSelected) => (
                        <View style={[styles.dropdownItemStyle, isSelected && styles.selectedDropdownItem]}>
                            <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                />
            </View>
        </View>
    );
};

export default TrackResult;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    trackInfoContainer: {
        flexDirection: 'row',
        marginRight: 100,
        gap: 20,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    trackDetails: {
        gap: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    marginBottom: {
        marginBottom: 20,
    },
    ratingContainer: {
        gap: 10,
    },
    rating: {
        flexDirection: 'row',
    },
    dropdownContainer: {
        marginTop: 50,
    },
    dropdownButtonStyle: {
        flexGrow: 1,
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    selectedDropdownItem: {
        backgroundColor: '#D2D9DF',
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
});