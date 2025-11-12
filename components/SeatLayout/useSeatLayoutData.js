import { useState, useEffect } from 'react';

/**
 * Custom hook for SeatLayout data management
 * 
 * Handles:
 * - Single vs double deck detection
 * - Seat data organization
 * - Layout configuration
 * 
 * @param {Object} lowerSeats - Lower deck seat data
 * @param {Object} upperSeats - Upper deck seat data
 * @returns {Object} Display configuration for decks
 */
export const useSeatLayoutData = (lowerSeats = {}, upperSeats = {}) => {
    const [displayData, setDisplayData] = useState({
        lower: null,
        upper: null,
        isDouble: false,
    });

    useEffect(() => {
        const hasLower = lowerSeats && Object.keys(lowerSeats).length > 0;
        const hasUpper = upperSeats && Object.keys(upperSeats).length > 0;

        if (hasLower && hasUpper) {
            // Double decker bus
            setDisplayData({
                lower: lowerSeats,
                upper: upperSeats,
                isDouble: true,
            });
        } else if (hasLower) {
            // Single deck (lower only)
            setDisplayData({
                lower: lowerSeats,
                upper: null,
                isDouble: false,
            });
        } else if (hasUpper) {
            // Single deck (upper only)
            setDisplayData({
                lower: upperSeats,
                upper: null,
                isDouble: false,
            });
        } else {
            // No seats available
            setDisplayData({
                lower: null,
                upper: null,
                isDouble: false,
            });
        }
    }, [lowerSeats, upperSeats]);

    return displayData;
};
