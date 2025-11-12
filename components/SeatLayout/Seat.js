import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { LightGray, spacing, typography, layouts } from '../../utils/styles';
import SeaterIcon from '../../assets/icons/SeaterIcon';
import SleeperIcon from '../../assets/icons/HSleeperIcon';
import { SEAT_COLORS, SEAT_TYPES, SEAT_DIMENSIONS } from './constants';

/**
 * Seat Component (Memoized)
 * 
 * Renders individual seat with appropriate styling and icon
 * Handles seat selection and displays seat availability
 * 
 * @param {Object} seat - Seat data object
 * @param {Function} onSelect - Callback when seat is selected
 * @param {Boolean} isSelected - Whether seat is currently selected
 */
const Seat = React.memo(({ seat, onSelect, isSelected }) => {
    const isAvailable = seat.is_available;
    const isFemale = SEAT_TYPES.FEMALE.includes(seat.type);
    const isVertical = SEAT_TYPES.VERTICAL.includes(seat.type);
    const isSeater = SEAT_TYPES.SEATER.includes(seat.type);

    // Determine seat color based on state
    let seatColors;
    if (!isAvailable) {
        seatColors = SEAT_COLORS.disabled;
    } else if (isSelected) {
        seatColors = SEAT_COLORS.selected;
    } else if (isFemale) {
        seatColors = SEAT_COLORS.female;
    } else {
        seatColors = SEAT_COLORS.available;
    }

    // Calculate seat dimensions based on type
    const seatStyle = {
        width: isVertical ? SEAT_DIMENSIONS.VERTICAL.width : SEAT_DIMENSIONS.SEATER.width,
        height: isVertical
            ? SEAT_DIMENSIONS.VERTICAL.height
            : isSeater
                ? SEAT_DIMENSIONS.SEATER.height
                : SEAT_DIMENSIONS.SLEEPER.height,
    };

    return (
        <TouchableOpacity
            style={[layouts.colCenter, spacing.m1, seatStyle]}
            onPress={() => onSelect(seat)}
            disabled={!isAvailable}
        >
            {/* Render appropriate icon based on seat type */}
            {seat.is_sleeper ? (
                <SleeperIcon
                    bgColor={seatColors.bg}
                    borderColor={seatColors.border}
                    width={seatStyle.width}
                    height={seatStyle.height}
                    selected={isSelected}
                    isVertical={isVertical}
                />
            ) : (
                <SeaterIcon
                    bgColor={seatColors.bg}
                    borderColor={seatColors.border}
                    selected={isSelected}
                    width={SEAT_DIMENSIONS.SEATER.width}
                    height={SEAT_DIMENSIONS.SEATER.height}
                />
            )}

            {/* Display seat ID for available seats */}
            {isAvailable && (
                <Text
                    style={[
                        typography.font12,
                        typography.textBold,
                        {
                            color: LightGray,
                            position: 'absolute',
                            top: isVertical ? '35%' : '20%',
                        },
                    ]}
                >
                    {seat.seat_id}
                </Text>
            )}
        </TouchableOpacity>
    );
});

Seat.displayName = 'Seat';

export default Seat;
