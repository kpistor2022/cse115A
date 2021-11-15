import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SliderMinMax from './createHabitComponents/SliderMinMax';
import { useNavigation } from '@react-navigation/core';

// passing props to habit page through navigation
function HabitButton({title, data}) {
    const [value, setValue] = useState((data.duration/2));
    const navigation = useNavigation();

    return (
        <View style={styles.item}>
            <TouchableOpacity  onPress={() => navigation.navigate('Habits', {habitData: data})}>
                <Text style={styles.title}>{title}</Text>
                <Text>{data.period === 'day' ? 'Daily' : data.frequency + 'x per week'}</Text>
                <SliderMinMax
                    currVal={value}
                    setCurrVal={setValue}
                    min={0}
                    max={data.duration}
                    color='#2e2d2d'
                    margin={4}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 25,
    },
    title: {
        fontSize: 32,
    },
});

export default HabitButton;