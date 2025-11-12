import { SafeAreaView, View, StyleSheet } from 'react-native';
import { White1Color, spacing, layouts, GrayBackground, HighlightYellow } from '../utils/styles';
import SeatLayout from '../components/SeatLayout/SeatLayout';
import Loader from '../components/customs/Loader';
import Header from '../components/customs/Header';
import PrimaryButton from '../components/buttons/PrimaryButton';
import SecondaryButton from '../components/buttons/SecondaryButton';
import ButtonContainer from '../components/buttons/ButtonContainer';
import BookingSummarySheet from '../components/BookingSummarySheet';
import { useSeatSelection } from '../hooks/useSeatSelection';
import dayjs from 'dayjs';

/**
 * SeatSelection Screen (Presentational Component)
 * 
 * Displays seat layout with selection capability.
 * All business logic extracted to useSeatSelection custom hook.
 */
export default function SeatSelection() {
    // Extract all state and methods from custom hook
    const {
        selectedSeats,
        isLoading,
        lowerSeats,
        upperSeats,
        originCity,
        destinationCity,
        date_of_journey,
        selectedBus,
        selectedBusType,
        departureTime,
        totalPrice,
        handleSeatSelection,
        handleReset,
        handleProceed,
    } = useSeatSelection();

    // Show loader while fetching seats
    if (isLoading) {
        return <Loader style={{ backgroundColor: White1Color }} />;
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: GrayBackground }]}>
            <Header
                title={`${originCity} → ${destinationCity}`}
                subtitle={`${dayjs(date_of_journey).format('ddd DD MMM YYYY')}, ${dayjs(departureTime).format('hh:mm A') || ""} | ${selectedBus}`}
            />

            <SeatLayout
                lowerSeats={lowerSeats}
                upperSeats={upperSeats}
                selectedSeats={selectedSeats}
                handleSeatSelection={handleSeatSelection}
            />

            <BookingSummarySheet
                selectedSeats={selectedSeats}
                selectedBus={selectedBus}
                selectedBusType={selectedBusType}
                totalPrice={totalPrice}
                origin={originCity || 'Origin'}
                destination={destinationCity || 'Destination'}
                date={date_of_journey || 'Date'}
            />

            {selectedSeats.length > 0 && (
                <View style={styles.buttonContainer}>
                    <ButtonContainer>
                        <SecondaryButton onClick={handleReset} title="Reset" />
                        <PrimaryButton onClick={handleProceed} title="Proceed" style={{ flex: 1 }} />
                    </ButtonContainer>
                </View>
            )}
        </SafeAreaView>
    );
}

// Component-specific styles
const styles = StyleSheet.create({
    container: {
        ...layouts.container,
    },
    buttonContainer: {
        backgroundColor: HighlightYellow,
        ...spacing.p2,
    },
});
