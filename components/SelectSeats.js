import React, { useEffect, useState, useRef } from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet, Touchable, TouchableOpacity, } from 'react-native'
import { styles } from '../utils/styles'
import SeatLayout from './SeatLayout/SeatLayout';
import { SeatMaps } from '../faker/busmap';
import RBSheet from 'react-native-raw-bottom-sheet';
import PrimaryButton from './buttons/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { SecondaryColor } from '../utils/colors';
import { FlatList } from 'react-native-gesture-handler';


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

const Data = [
    {
        id: '1',
        title: 'Why book tis bus?',
    },
    {
        id: '2',
        title: 'Bus route',
    },
    {
        id: '3',
        title: 'Boarding Point',
    },
    {
        id: '4',
        title: 'Dropping points',
    },
    {
        id: '5',
        title: 'Rest Stops',
    },
    {
        id: '6',
        title: 'Amenities',
    },
    {
        id: '7',
        title: 'Reviews',
    },
    {
        id: '8',
        title: 'Cancellation policy',
    },
    {
        id: '9',
        title: 'Other Policies',
    },
]

const renderItem = ({ item }) => {
    return (
        <View>
            <Text>{item.title}</Text>
        </View>
    )
}


export default function SelectSeats({ route }) {
    const { bus_id } = route.params
    const [lowerSeatMap, setLowerSeatMap] = useState([])
    const [upperSeatMap, setUpperSeatMap] = useState([])

    const refBottomSheet = useRef()

    useEffect(() => {
        fetchSeatLayout(bus_id)
    }, [bus_id])


    useEffect(() => {
        refBottomSheet.current.open()
    }, [])


    const navigation = useNavigation();


    const fetchSeatLayout = (bus_id) => {
        const { lowerDeck, upperDeck } = SeatMaps.find((seatMap) => seatMap.bus_id === bus_id)
        setLowerSeatMap(lowerDeck)
        setUpperSeatMap(upperDeck)
    }

    return (
        <SafeAreaView style={[styles.container, { paddingHorizontal: 0 }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ScrollView horizontal={true} showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <SeatLayout isDoubleDecker={true} driverPosition='right' seatMap={lowerSeatMap} isSleeper={true} />
                        <SeatLayout isDoubleDecker={true} deckPosition={1} driverPosition='right' seatMap={upperSeatMap} isSleeper={true} />
                    </View>

                </ScrollView>

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

            {/* TODO: Redesign this part for complete action */}
            <RBSheet
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

            </RBSheet>

            <View style={[styles.tableRow, { backgroundColor: '#fff', height: 80, alignItems: 'center' }]}>
                <Text><Text style={{ fontWeight: 'bold' }}>Selected Seats</Text>(2)</Text>
                <PrimaryButton style={{ backgroundColor: SecondaryColor }} onClick={() => navigation.navigate('AddPassenger')} title='Continue' />
            </View>
        </SafeAreaView>

    )
}

