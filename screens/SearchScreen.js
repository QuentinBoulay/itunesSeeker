import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState, useEffect } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SearchScreen = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [selectedSearch, setSelectedSearch] = useState('musicArtist');
    const [results, setResults] = useState([]);

    const categories = [
        {name: 'Artiste', value: 'musicArtist'},
        {name: 'Musique', value: 'musicTrack'},
        {name: 'Album', value: 'album'}
      ];

    const searchItunes = async () => {
        const query = `term=${encodeURIComponent(search)}&entity=${selectedSearch}`;
        const response = await fetch(`https://itunes.apple.com/search?${query}`);
        const data = await response.json();
        setResults(data.results);
    };

    useEffect(() => {
        searchItunes()
    }, [search, selectedSearch]);

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <TextInput
                    style={styles.input}
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Recherche..."
                />
                <SelectDropdown
                    data={categories}
                    onSelect={(selectedItem, index) => {
                        setSelectedSearch(selectedItem.value);
                    }}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <View style={styles.dropdownButtonStyle}>
                            {selectedItem && (
                                <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
                            )}
                            <Text style={styles.dropdownButtonTxtStyle}>
                                {(selectedItem && selectedItem.name) || 'Catégorie'}
                            </Text>
                            <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                            </View>
                        );
                    }}
                    renderItem={(item, index, isSelected) => {
                        return (
                            <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                                <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
                                <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                            </View>
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={styles.dropdownMenuStyle}
                />
            </View>

            <FlatList
                data={results}
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
    searchBarContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20,
        gap: 10,
    },
    input: {
        width: 200,
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
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