import { useEffect, useState } from 'react'
// import { seatLayout } from '../faker/seatlayout'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { styles } from '../utils/styles'
import SeatLayout from '../components/SeatLayout/SeatLayout'
import { spacing } from '../utils/spacing.styles'
import { useSelector } from 'react-redux'

export default function SeatSelection() {
    const { total_seats, seatLayout } = useSelector(state => state.bus)

    return (
        <SafeAreaView style={[spacing.p2]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SeatLayout
                    lowerSeats={seatLayout?.lower_deck.rows}
                    upperSeats={seatLayout?.upper_deck.rows}
                    handleSeatSelection={(val) => console.log(`Selected Seat is ${val}`)}
                />
            </ScrollView>
        </SafeAreaView>
    )
}