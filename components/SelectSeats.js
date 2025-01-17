import React, { useEffect, useState, useRef } from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Touchable, TouchableOpacity, } from 'react-native'
import { styles } from '../utils/styles'
import SeatLayout from './SeatLayout/SeatLayout';
import RBSheet from 'react-native-raw-bottom-sheet';
import PrimaryButton from './buttons/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { SecondaryColor } from '../utils/colors';
import { useDispatch } from 'react-redux';
import { setPassengerSeats } from '../actions/busActions';


const knowYourSeat = [
    {
        id: 1,
        seat_type: 1,
        seater_description: 'Some random information',
        sleeper_description: 'Some random text information'
    },
    {
        id: 2,
        seat_type: 2,
        seater_description: 'lorem ipsum',
        sleeper_description: 'sit dolor amet'
    },
    {
        id: 3,
        seat_type: 3,
        seater_description: 'Some random information ',
        sleeper_description: 'lorem ipsum sit dolor amet'
    },
    {
        id: 4,
        seat_type: 4,
        seater_description: 'Some random information',
        sleeper_description: 'Some random text information'
    }
]

export default function SelectSeats() {
    const [selectedSeatCount, setSelectedSeatCount] = useState(0)
    const [selectedSeats, setSelectedSeats] = useState([])
    // const refBottomSheet = useRef()

    // useEffect(() => {
    //     refBottomSheet.current.open()
    // }, [])


    const navigation = useNavigation();
    const dispatch = useDispatch()

    const handleSeatSelection = (val) => {
        setSelectedSeats(val)
        setSelectedSeatCount(Array.isArray && val.length)
    }

    const handlePassengerInformation = () => {
        dispatch(setPassengerSeats(selectedSeats))
        navigation.navigate('AddPassenger')
    }


    return (
        <SafeAreaView style={[styles.container, { paddingHorizontal: 0 }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SeatLayout isDoubleDecker={false} isSleeper={false} handleSeatSelection={(val) => handleSeatSelection(val)} />

                <View style={{ paddingHorizontal: 16, marginVertical: 12 }}>
                    <Text style={styles.headerTitleText}>Know your seat type</Text>

                    <View style={styles.roundedTable}>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableHeading, { width: '20%' }]}>Type</Text>
                            <Text style={[styles.tableDivision, { width: '40%', fontWeight: '600', textAlign: 'center' }]}>Seater</Text>
                            <Text style={[styles.tableDivision, { width: '40%', fontWeight: '600', textAlign: 'center' }]}>Sleeper</Text>
                        </View>
                        {
                            knowYourSeat.map((seat, index) =>
                                <View style={[styles.tableRow, { paddingVertical: 8, }]} key={index}>
                                    <Text style={[styles.tableHeading, { marginRight: 55 }]}>{seat.seat_type}</Text>
                                    <Text style={[styles.tableDivision, { width: '40%', fontWeight: '400', textAlign: 'center' }]}>{seat.seater_description}</Text>
                                    <Text style={[styles.tableDivision, { width: '40%', fontWeight: '400', textAlign: 'right' }]}>{seat.sleeper_description}</Text>
                                </View>
                            )
                        }


                    </View>
                </View>
            </ScrollView>
            <View style={[styles.tableRow, { backgroundColor: '#fff', height: 80, alignItems: 'center' }]}>
                <Text><Text style={{ fontWeight: 'bold' }}>Selected Seats</Text>({selectedSeatCount})</Text>
                <PrimaryButton style={{ backgroundColor: SecondaryColor }} onClick={handlePassengerInformation} title='Continue' />
            </View>
            {/* TODO: Redesign this part for complete action */}
            {/* <RBSheet
                ref={refBottomSheet}
                useNativeDriver={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'transparent',
                    },
                    container: {
                        backgroundColor: '#fff',
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,
                        elevation: 2,
                        padding: 20
                    },

                    draggableIcon: {
                        backgroundColor: '#777',
                    },
                }}
                customModalProps={{
                    animationType: 'slide',
                    statusBarTranslucent: true,
                }}
                draggable={true}
                customAvoidingViewProps={{
                    enabled: false,
                }}
            >

            </RBSheet> */}
        </SafeAreaView>

    )
}

