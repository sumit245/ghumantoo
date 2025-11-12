import { useState, useMemo, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import SeatLayout from '../components/SeatLayout/SeatLayout';
import { useSelector, useDispatch } from 'react-redux';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { height, PrimaryColor, WhiteColor, BlackColor, LightGray, DangerColor, PureWhite, White1Color, typography, spacing, layouts, HighlightYellow, BorderLight, ButtonBgGray, TextMuted } from '../utils/styles';
import Cancellation from '../components/BottomSheetVerticalData/Cancellation';
import OtherPolicies from '../components/BottomSheetVerticalData/OtherPolicies';
import { useNavigation } from '@react-navigation/native';
import { getAvailableSeats, getBoardingAndDroppingPoints } from '../actions/busActions';



// --- Sub-Component: BookingSummarySheet ---
// This is the new expandable bottom sheet component.
const BottomSheetContent = ({
    selectedSeats,
    selectedBus,
    selectedBusType,
    totalPrice,
    origin,
    destination,
    date
}) => {
    const sheetHeight = height * 0.6; // Max height of the sheet
    const collapsedHeight = 160; // Height when collapsed
    const translateY = useSharedValue(0);
    const { date_of_journey } = useSelector(state => state.bus);

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

            {/* --- Collapsed View Content & Action Buttons --- */}
            {selectedSeats.length > 0 && (
                <>
                    <View style={[styles.summaryContainer, styles.highlighted]}>
                        <View style={styles.routeInfo}>
                            <Text style={styles.label}>{selectedBus}</Text>
                            <Text style={styles.label}>{selectedBusType}</Text>
                            <Text style={styles.value}>{origin}-{destination}</Text>
                            <Text style={styles.label}>Date: <Text style={styles.value}>{date}</Text></Text>
                        </View>
                        <View style={styles.priceInfo}>
                            <Text style={styles.seatsLabel}>Seats: {selectedSeats.map(s => s.seat_id).join(', ')}</Text>
                            <Text style={styles.priceValue}>₹{totalPrice}</Text>
                        </View>
                    </View>

                </>
            )}

            {/* --- Expanded View Content --- */}
            <ScrollView style={styles.expandedContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>Know Your Seat</Text>
                <Text style={styles.sectionText}>Details about seat types, legroom, and amenities would go here.</Text>
                <Text style={styles.sectionTitle}>Cancellation Policy*</Text>
                <Cancellation dateOfJourney={date_of_journey} />
                <Text style={styles.sectionTitle}>Other Policies*</Text>
                <OtherPolicies />
            </ScrollView>
        </Animated.View>
    );
};


// --- Main Screen: SeatSelection ---
export default function SeatSelection() {
    // Assuming origin, destination, and date are in the bus reducer
    const {
        seatLayout, originCity, destinationCity, date_of_journey, selectedBus,
        selectedBusType, SearchTokenId, resultIndex, policiesCancellation, isSeatsLoading
    } = useSelector(state => state.bus);

    const [selectedSeats, setSelectedSeats] = useState([]);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // Fetch seat data when the component mounts and all required data is available
    useEffect(() => {
        if (resultIndex && SearchTokenId && policiesCancellation) {
            dispatch(getAvailableSeats(resultIndex, SearchTokenId, policiesCancellation));
        }
    }, [dispatch, resultIndex, SearchTokenId, policiesCancellation]);

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

    const handleProceed = async () => {
        // Navigate to passenger details screen with selected data
        await dispatch(getBoardingAndDroppingPoints(resultIndex, SearchTokenId, selectedSeats, totalPrice));
        navigation.navigate('SelectBoardDrop', { selectedSeats, totalPrice });
    };

    // Show a loading indicator while fetching seats
    if (isSeatsLoading || !seatLayout) {
        return (
            <View style={styles.loaderContainer}><ActivityIndicator size="large" color={PrimaryColor} /></View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <SeatLayout
                lowerSeats={seatLayout?.lower_deck?.rows}
                upperSeats={seatLayout?.upper_deck?.rows}
                selectedSeats={selectedSeats}
                handleSeatSelection={handleSeatSelection}
            />

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
            {
                selectedSeats.length > 0 && (
                    <View style={styles.buttonContainer}>
                        {/* TODO: This is a SecondaryButton use from components/buttons/SecondaryButton */}
                        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
                            <Text style={styles.resetButtonText}>Reset</Text>
                        </TouchableOpacity>
                        {/* TODO: This is a PrimaryButton use from components/buttons/PrimaryButton */}
                        <TouchableOpacity style={[styles.button, styles.proceedButton]} onPress={handleProceed}>
                            <Text style={styles.proceedButtonText}>Proceed</Text>
                        </TouchableOpacity>
                    </View>
                )
            }

        </SafeAreaView>
    );
}

// Component-specific seat selection sheet styles
const styles = StyleSheet.create({
    container: {
        ...layouts.container,
        backgroundColor: White1Color,
    },
    loaderContainer: {
        ...layouts.container,
        ...layouts.colCenter,
        backgroundColor: White1Color,
    },
    sheetContainer: {
        position: 'absolute',
        bottom: -height * 0.6 + 160,
        width: '100%',
        backgroundColor: PureWhite,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        ...spacing.ph5,
        elevation: 2,
        shadowColor: BlackColor,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    header: {
        alignItems: 'center',
        ...spacing.pv25,
    },
    handle: {
        width: 50,
        height: 4,
        backgroundColor: LightGray,
        ...spacing.br1,
    },
    summaryContainer: {
        ...layouts.rowBetween,
        ...spacing.pb25,
    },
    highlighted: {
        backgroundColor: HighlightYellow,
        marginHorizontal: -20,
        ...spacing.ph5,
        ...spacing.pt25,
        borderBottomWidth: 1,
        borderBottomColor: BorderLight,
    },
    routeInfo: {
        flex: 1,
    },
    priceInfo: {
        alignItems: 'flex-end',
    },
    label: {
        ...typography.font14,
        color: LightGray,
        ...spacing.mb1,
    },
    value: {
        ...typography.textBold,
        color: BlackColor,
    },
    priceLabel: {
        ...typography.font14,
        color: LightGray,
    },
    priceValue: {
        ...typography.font24,
        ...typography.textBold,
        color: PrimaryColor,
    },
    seatsLabel: {
        ...typography.font12,
        color: LightGray,
        ...spacing.mt1,
    },
    expandedContent: {
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: LightGray,
        ...spacing.pt25,
    },
    sectionTitle: {
        ...typography.font16Bold,
        ...spacing.mt2,
        marginBottom: 5,
        color: BlackColor,
    },
    sectionText: {
        ...typography.font14,
        color: TextMuted,
        lineHeight: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        ...spacing.pv25,
        backgroundColor: HighlightYellow,
        marginHorizontal: -20,
        ...spacing.ph5,
    },
    button: {
        flex: 1,
        ...spacing.pv3,
        ...spacing.br2,
        ...layouts.colCenter,
    },
    resetButton: {
        backgroundColor: ButtonBgGray,
        ...spacing.mr2,
    },
    resetButtonText: {
        ...typography.font16Bold,
        color: DangerColor,
    },
    proceedButton: {
        backgroundColor: PrimaryColor,
    },
    proceedButtonText: {
        ...typography.font16Bold,
        color: WhiteColor,
    },
});
