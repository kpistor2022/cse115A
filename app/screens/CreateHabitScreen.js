import React, { useState } from 'react';
import {StyleSheet, Text, View } from 'react-native';
import {Button} from 'react-native-elements';
import {auth, db} from "../../firebase";
import { useNavigation } from '@react-navigation/core';
import HabitInput from './createHabitComponents/HabitInput';
import PeriodButton from './createHabitComponents/PeriodButton';
import Counter from './createHabitComponents/Counter';
import SliderMinMax from './createHabitComponents/SliderMinMax';
import ScreenLayout from './createHabitComponents/ScreenLayout';
import Icon from 'react-native-vector-icons/FontAwesome';


function CreateHabitScreen(props) {
    const navigation = useNavigation();
    const [period, setPeriod] = useState('day');
    const [duration, setDuration] = useState(1);
    const [name, setName] = useState('');
    const [frequency, setFrequency] = useState(1);
    const [motivation, setMotivation] = useState('');

    const colors = {
        purple: "#BD9EEF", // BD9EEF, E3D1FC
    }

    const onClickSave = () => {
        const currentUID = auth.currentUser.uid;
        const habitData = {
            habitName: name,
            motivation: motivation,
            period: period, // 'day' or 'week'
            duration: duration, // between 1-90 days or 1-12 weeks
            frequency: frequency, // frequency for day is 1, frequency for week is 1-6 days in week
        }
        console.log(habitData);
        db
            .collection(currentUID)
            .doc(name)
            .set(habitData)
            .then(() => {
                console.log('collection added!');
                navigation.navigate('Profile');
            });
    }

    return (
        <ScreenLayout title="Create habit">
            <HabitInput
                placeholder='Name your habit'
                setInput={setName}
            />
            <HabitInput
                placeholder='State your motivation'
                setInput={setMotivation}
            />
            <View style={{flex: .5}}>
                <Text style={styles.createGoalText}>
                    Create a goal
                </Text>
            </View>
            <View style={styles.options}>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <PeriodButton
                        title="Daily"
                        onPress={()=>{
                            setPeriod('day')
                            setDuration(1)
                            setFrequency(1)
                        }}
                        borderColor={period == 'day' ? colors.purple : '#9c9c9c'}
                    />
                    <PeriodButton
                        title="Weekly"
                        onPress={()=>{
                            setPeriod('week')
                            setDuration(1)
                        }}
                        borderColor= {period == 'week' ? colors.purple : '#9c9c9c'}
                    />
                </View>
            </View>
            {period == "week" &&
            <View style={styles.options}>
                <Counter
                    currentCount={frequency}
                    min={1}
                    max={6}
                    setCount={setFrequency}
                />
            </View>}
            <View style={styles.options}>
                <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                    { period == "day" && 
                    <SliderMinMax
                        currVal={duration}
                        setCurrVal={setDuration}
                        min={1}
                        max={90}
                        thumb={true}
                        color={colors.purple}
                        margin={10}
                    />}
                    { period == "week" && 
                    <SliderMinMax
                        currVal={duration}
                        setCurrVal={setDuration}
                        min={1}
                        max={12}
                        thumb={true}
                        color={colors.purple}
                        margin={10}
                    />}
                    <Text 
                        style={{
                            marginHorizontal: 10, 
                            alignSelf: 'center',
                            fontFamily: 'AvenirNext-Regular',
                            color: colors.purple
                        }}>
                        {name == '' ? 'Do habit' : name} {period == 'week' ? frequency : ''}{period == 'week' ? ' times per week for' : ''} {duration} {period}s in a row
                    </Text>
                </View>
            </View>
            <View style={styles.save_button}>
                <Button
                    title="Save"
                    containerStyle = {{
                        flex: 1,
                        marginHorizontal: 10,
                        justifyContent: 'flex-end',
                        marginBottom: 50,
                    }}

                    buttonStyle= {{
                        backgroundColor: '#BD9EEF',
                    }}

                    titleStyle= {{
                        color: 'white',
                        fontFamily: 'AvenirNext-Bold'
                    }}
                    onPress={onClickSave}
                />
            </View>
        </ScreenLayout>

    );
}

const styles = StyleSheet.create({
    options: {
        flex: 1,
        marginLeft: 10,
        marginTop: 10,
        marginRight: 10,
    },
    save_button: {
        flex: 2,
        marginLeft: 10,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    createGoalText :{
        marginHorizontal: 20, 
        alignSelf: 'center',
        fontFamily: 'AvenirNext-Medium',
        fontSize: 20,
        color: "#BD9EEF"
    }
});

export default CreateHabitScreen;