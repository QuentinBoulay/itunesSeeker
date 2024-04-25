import React, { useState, useEffect } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import useFavorites from '../hooks/useFavorites';

const ArtistResult = ({ route, navigation }) => {
    const { item } = route.params;

    const { favorites } = useFavorites()

    return (
        <View style={styles.container}>
            <Text>{item.artistName}</Text>
        </View>
    );
};

export default ArtistResult;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});
