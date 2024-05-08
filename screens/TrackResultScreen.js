import React, { useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFavorites from '../hooks/useFavorites';
import Icon from 'react-native-vector-icons/AntDesign';
import ActionButton from '../components/ActionButton';
import SelectDropdown from 'react-native-select-dropdown'

const TrackResult = ({ route, navigation }) => {
    const { item } = route.params;
    const [rating, setRating] = useState(0);

    const ratingData = [1,2,3,4,5];

    const { isFavorite, toggleFavorite } = useFavorites()

    const handleRating = async (newRating) => {
        await AsyncStorage.setItem(`rating_${item.trackId}`, newRating.toString());
        setRating(newRating);
    };

    useEffect(() => {
        const getRating = async () => {
            setRating(await AsyncStorage.getItem(`rating_${item.trackId}`));
        }

        getRating()
    }, [])

    return (
        <View style={styles.container}>
            <View style={{flexDirection: "row", marginRight: 100, gap: 20, alignItems: "center"}}>
                <Image source={{uri: item.artworkUrl100}} style={{width: 100, height: 100, borderRadius: 100}} />
                <View>
                    <Text style={[styles.title, {marginBottom: 20}]}>{item.artistName} - {item.trackName}</Text>
                    <ActionButton style={{marginBottom: 20}} title={isFavorite(item) ? "Enlever des favoris" : "Ajouter aux favoris"} iconRight={isFavorite(item) ? <Icon name="heart" size={20} color={"white"} /> : <Icon name="hearto" size={20} color={"white"} /> } onPress={() => toggleFavorite(item)} />
                    <View style={{gap: 10}}>
                        <Text>Ma note</Text>
                        <View style={styles.rating}>
                            <Icon name="star" size={24} color={rating >= 1 ? "orange" : "gray"} />
                            <Icon name="star" size={24} color={rating >= 2 ? "orange" : "gray"} />
                            <Icon name="star" size={24} color={rating >= 3 ? "orange" : "gray"} />
                            <Icon name="star" size={24} color={rating >= 4 ? "orange" : "gray"} />
                            <Icon name="star" size={24} color={rating >= 5 ? "orange" : "gray"} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.ratingContainer}>
                <SelectDropdown
                    data={ratingData}
                    onSelect={(selectedItem, index) => {
                        handleRating(selectedItem);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <View style={styles.dropdownButtonStyle}>
                                {selectedItem && (
                                    <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                                )}
                                <Text style={styles.dropdownButtonTxtStyle}>
                                    {(selectedItem && selectedItem) || 'Note'}
                                </Text>
                                <Icon name={isOpened ? 'up' : 'down'} style={styles.dropdownButtonArrowStyle} />
                            </View>
                        );
                    }}
                    renderItem={(item, index, isSelected) => {
                        return (
                            <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                                <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                            </View>
                        );
                    }}
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

    title: {
        fontSize: 24,
        fontWeight: "bold",
    },

    rating: {
        flexDirection: "row"
    },

    ratingContainer: {
        marginTop: 50
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
      dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
      },
      dropdownItemIconStyle: {
        fontSize: 28
      },
});
