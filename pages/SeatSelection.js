import { useState, useMemo } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SeatLayout from '../components/SeatLayout/SeatLayout';
import { useSelector } from 'react-redux';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { PrimaryColor, WhiteColor, BlackColor, LightGray, DangerColor, PureWhite } from '../utils/colors';
import { height, width } from '../utils/styles';
import Cancellation from '../components/BottomSheetVerticalData/Cancellation';
import OtherPolicies from '../components/BottomSheetVerticalData/OtherPolicies';
import { useNavigation } from '@react-navigation/native';


// --- Sub-Component: BookingSummarySheet ---
// This is the new expandable bottom sheet component.
const BottomSheetContent = ({
    selectedSeats,
    selectedBus,
    selectedBusType,
    totalPrice,
    origin,
    destination,
    date,
    onReset,
    onProceed,
}) => {
    const sheetHeight = height * 0.6; // Max height of the sheet
    const collapsedHeight = 160; // Height when collapsed
    const translateY = useSharedValue(0);
    const {date_of_journey} = useSelector(state => state.bus);

    // Pan gesture to control the sheet's position
    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            // Allow dragging up from the collapsed state
            if (translateY.value + event.translationY < 0 && translateY.value + event.translationY > -sheetHeight + collapsedHeight) {
                translateY.value += event.translationY;
            }
        })
        .onEnd(() => {
            // Snap to either fully expanded or collapsed state
            if (translateY.value < -sheetHeight / 2) {
                translateY.value = withSpring(-sheetHeight + collapsedHeight, { damping: 15 });
            } else {
                translateY.value = withSpring(0, { damping: 15 });
            }
        });

    // Animated style for the sheet's vertical translation
    const animatedSheetStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    return (
        <Animated.View style={[styles.sheetContainer, { height: sheetHeight }, animatedSheetStyle]}>
            <GestureDetector gesture={panGesture}>
                <View style={styles.header}>
                    <View style={styles.handle} />
                </View>
            </GestureDetector>

            {/* --- Collapsed View Content --- */}
            {
                selectedSeats.length > 0 && (
                    <View style={styles.summaryContainer}>
                        <View style={styles.routeInfo}>
                            <Text style={styles.label}>{selectedBus }</Text>
                            <Text style={styles.label}>{ selectedBusType}</Text>
                            <Text style={styles.value}>{origin}-{destination}</Text>
                            <Text style={styles.label}>Date: <Text style={styles.value}>{date}</Text></Text>
                        </View>
                        <View style={styles.priceInfo}>
                            <Text style={styles.seatsLabel}>Seats: {selectedSeats.map(s => s.seat_id).join(', ')}</Text>
                            {/* <Text style={styles.priceLabel}>Total Price</Text> */}
                            <Text style={styles.priceValue}>₹{totalPrice}</Text>
                        </View>
                    </View>

                )
            }

            {/* --- Expanded View Content --- */}
            <ScrollView style={styles.expandedContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>Know Your Seat</Text>
                <Text style={styles.sectionText}>Details about seat types, legroom, and amenities would go here.</Text>
                <Text style={styles.sectionTitle}>Cancellation Policy*</Text>
                <Cancellation dateOfJourney={date_of_journey} />
                <Text style={styles.sectionTitle}>Other Policies*</Text>
                <OtherPolicies />
            </ScrollView>

            {/* --- Action Buttons --- */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={onReset}>
                    <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.proceedButton, { backgroundColor: selectedSeats.length > 0 ? PrimaryColor : LightGray }]}
                    disabled={selectedSeats.length === 0}
                    onPress={onProceed}>
                    <Text style={styles.proceedButtonText}>Proceed</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};


// --- Main Screen: SeatSelection ---
export default function SeatSelection() {
    // Assuming origin, destination, and date are in the bus reducer
    const { seatLayout, originCity, destinationCity, date_of_journey,selectedBus,selectedBusType } = useSelector(state => state.bus);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const navigation = useNavigation();

    const handleSeatSelection = (seat) => {
        setSelectedSeats(prevSelected => {
            const isAlreadySelected = prevSelected.some(s => s.seat_id === seat.seat_id);
            if (isAlreadySelected) {
                return prevSelected.filter(s => s.seat_id !== seat.seat_id);
            } else {
                // Add a check for max seats if needed
                return [...prevSelected, seat];
            }
        });
    };

    // Calculate total price whenever selected seats change
    const totalPrice = useMemo(() => {
        return selectedSeats.reduce((sum, seat) => sum + (seat.price || 0), 0);
    }, [selectedSeats]);

    const handleReset = () => {
        setSelectedSeats([]);
    };

    const handleProceed = () => {
        // Navigate to passenger details screen with selected data
        console.log("Proceeding with seats:", selectedSeats);
        console.log("Total Price:", totalPrice);
        navigation.navigate('SelectBoardDrop', { selectedSeats, totalPrice });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 180 }}>
                <SeatLayout
                    lowerSeats={seatLayout?.lower_deck?.rows}
                    upperSeats={seatLayout?.upper_deck?.rows}
                    selectedSeats={selectedSeats}
                    handleSeatSelection={handleSeatSelection}
                />
            </ScrollView>

            <BottomSheetContent
                selectedSeats={selectedSeats}
                selectedBus={selectedBus}
                selectedBusType={selectedBusType}
                totalPrice={totalPrice}
                origin={originCity || 'Origin'} // Use placeholder if data not available
                destination={destinationCity || 'Destination'}
                date={date_of_journey || 'Date'}
                onReset={handleReset}
                onProceed={handleProceed}
            />
        </SafeAreaView>
    );
}

// --- StyleSheet ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    sheetContainer: {
        position: 'absolute',
        bottom: -height * 0.6 + 160, // Start in collapsed position
        width: width,
        backgroundColor: PureWhite,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    handle: {
        width: 50,
        height: 4,
        backgroundColor: LightGray,
        borderRadius: 2,
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },
    routeInfo: {
        flex: 1,
    },
    priceInfo: {
        alignItems: 'flex-end',
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    value: {
        fontWeight: 'bold',
        color: BlackColor,
    },
    priceLabel: {
        fontSize: 14,
        color: '#666',
    },
    priceValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: PrimaryColor,
    },
    seatsLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    expandedContent: {
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    sectionText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    buttonContainer: {
        // position: 'sticky',
        // top: 90, // Position above the sheet
        // left: 12,
        flexDirection: 'row',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        // backgroundColor: WhiteColor,
    },
    button: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resetButton: {
        backgroundColor: '#f1f1f1',
        marginRight: 10,
    },
    resetButtonText: {
        color: DangerColor,
        fontSize: 16,
        fontWeight: 'bold',
    },
    proceedButton: {
        backgroundColor: PrimaryColor,
    },
    proceedButtonText: {
        color: WhiteColor,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
