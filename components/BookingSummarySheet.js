import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { height, PrimaryColor, PureWhite, BlackColor, LightGray, typography, spacing, layouts, HighlightYellow, BorderLight } from '../utils/styles';
import Cancellation from './BottomSheetVerticalData/Cancellation';
import OtherPolicies from './BottomSheetVerticalData/OtherPolicies';

/**
 * BookingSummarySheet Component
 * 
 * Expandable bottom sheet showing:
 * - Selected seats summary (collapsed view)
 * - Cancellation policy (expanded view)
 * - Other policies (expanded view)
 */
const BookingSummarySheet = ({
    selectedSeats,
    selectedBus,
    selectedBusType,
    totalPrice,
    origin,
    destination,
    date,
}) => {
    const sheetHeight = height * 0.6; // Max height of the sheet
    const collapsedHeight = 160; // Height when collapsed
    const translateY = useSharedValue(0);

    // Pan gesture to control the sheet's position
    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            // Allow dragging up from the collapsed state
            const newTranslateY = translateY.value + event.translationY;
            const maxExpanded = -sheetHeight + collapsedHeight;

            if (newTranslateY < 0 && newTranslateY > maxExpanded) {
                translateY.value = newTranslateY;
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
    const animatedSheetStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    // Don't show sheet if no seats selected
    if (selectedSeats.length === 0) {
        return null;
    }

    return (
        <Animated.View style={[styles.sheetContainer, { height: sheetHeight }, animatedSheetStyle]}>
            {/* Drag Handle */}
            <GestureDetector gesture={panGesture}>
                <View style={styles.header}>
                    <View style={styles.handle} />
                </View>
            </GestureDetector>

            {/* Collapsed View: Booking Summary */}
            <View style={[styles.summaryContainer, styles.highlighted]}>
                <View style={styles.routeInfo}>
                    <Text style={styles.label}>{selectedBus}</Text>
                    <Text style={styles.label}>{selectedBusType}</Text>
                    <Text style={styles.value}>
                        {origin}-{destination}
                    </Text>
                    <Text style={styles.label}>
                        Date: <Text style={styles.value}>{date}</Text>
                    </Text>
                </View>
                <View style={styles.priceInfo}>
                    <Text style={styles.seatsLabel}>
                        Seats: {selectedSeats.map((s) => s.seat_id).join(', ')}
                    </Text>
                    <Text style={styles.priceValue}>₹{totalPrice}</Text>
                </View>
            </View>

            {/* Expanded View: Policies */}
            <ScrollView style={styles.expandedContent} showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>Know Your Seat</Text>
                <Text style={styles.sectionText}>
                    Details about seat types, legroom, and amenities would go here.
                </Text>

                <Text style={styles.sectionTitle}>Cancellation Policy*</Text>
                <Cancellation dateOfJourney={date} />

                <Text style={styles.sectionTitle}>Other Policies*</Text>
                <OtherPolicies />
            </ScrollView>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
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
        color: LightGray,
        lineHeight: 20,
    },
});

export default BookingSummarySheet;
