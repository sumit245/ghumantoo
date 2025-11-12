import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { width, LightGray, PureWhite, BlackColor, spacing, typography, layouts, height } from '../../utils/styles';
import Steering from '../../assets/icons/Steering';
import Seat from './Seat';
import { AISLE_WIDTH } from './constants';

/**
 * Deck Component (Memoized)
 * 
 * Renders a deck (lower or upper) with seats arranged in rows
 * Handles aisle spacing and seat layout logic
 * 
 * @param {String} deckType - Display name for the deck
 * @param {Object} seatsData - Seat data organized by rows
 * @param {Function} onSeatSelect - Callback when seat is selected
 * @param {Boolean} showSteering - Whether to show steering wheel icon
 * @param {Array} selectedSeats - Array of currently selected seats
 */
const Deck = React.memo(({ deckType, seatsData, onSeatSelect, showSteering, selectedSeats }) => {
    /**
     * Generate seat layout with aisle spacing
     * Memoized to avoid recalculation on every render
     */
    const renderedSeats = useMemo(() => {
        if (!seatsData || Object.keys(seatsData).length === 0) return null;

        // Get row keys and sort them
        let rowKeys = Object.keys(seatsData).map(Number).sort((a, b) => a - b);
        const isContinuous = rowKeys.every((key, i, arr) => i === 0 || key - arr[i - 1] === 1);
        const totalRows = isContinuous ? rowKeys.length + 1 : Math.max(...rowKeys);
        let finalRowKeys = [];

        // Insert aisle in the middle for continuous rows
        if (isContinuous) {
            const mid = Math.ceil(rowKeys.length / 2);
            rowKeys.forEach((key, i) => {
                if (i === mid) finalRowKeys.push('aisle');
                finalRowKeys.push(key);
            });
        } else {
            // Fill gaps with aisles for non-continuous rows
            for (let i = 1; i <= totalRows; i++) {
                finalRowKeys.push(rowKeys.includes(i) ? i : 'aisle');
            }
        }

        return (
            <View style={{ marginTop: 10, flexDirection: 'row-reverse' }}>
                {finalRowKeys.map((rowKey, index) => {
                    // Render aisle space
                    if (rowKey === 'aisle') {
                        return <View key={`aisle-${index}`} style={{ width: AISLE_WIDTH }} />;
                    }

                    // Render column of seats
                    const columnSeats = seatsData[rowKey] || [];
                    return (
                        <View
                            key={`col-${rowKey}`}
                            style={{
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }}
                        >
                            {columnSeats.map((seat) => {
                                const isSelected = selectedSeats.some((s) => s.seat_id === seat.seat_id);
                                return (
                                    <View key={seat.seat_id} style={{ margin: 2 }}>
                                        <Seat seat={seat} onSelect={onSeatSelect} isSelected={isSelected} />
                                    </View>
                                );
                            })}
                        </View>
                    );
                })}
            </View>
        );
    }, [seatsData, onSeatSelect, selectedSeats]);

    return (
        <View
            style={[
                spacing.p1,
                spacing.mh1,
                {
                    minWidth: width / 1.8,
                    backgroundColor: PureWhite,
                    borderRadius: 16,
                    justifyContent: 'flex-start',
                    maxHeight: height * 0.7,
                },
            ]}
        >
            {/* Deck Header */}
            <View
                style={[
                    layouts.rowBetween,
                    spacing.pb1,
                    {
                        borderBottomWidth: 0.5,
                        borderBottomColor: LightGray,
                        height: 38,
                    },
                ]}
            >
                <Text style={[typography.font14, { color: BlackColor }]}>{deckType}</Text>
                {showSteering && <Steering style={{ height: 34, width: 36 }} width={36} height={36} />}
            </View>

            {/* Seats Layout */}
            {renderedSeats}
        </View>
    );
});

Deck.displayName = 'Deck';

export default Deck;
