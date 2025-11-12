import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getAvailableSeats, getBoardingAndDroppingPoints } from '../actions/busActions';

/**
 * Custom hook for SeatSelection screen business logic
 * 
 * Handles:
 * - Seat selection state management
 * - Fetching seat layout data
 * - Price calculation
 * - Navigation to next screen
 * 
 * @returns {Object} Seat selection state and methods
 */
export const useSeatSelection = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);

    const {
        seatLayout,
        originCity,
        destinationCity,
        date_of_journey,
        selectedBus,
        selectedBusType,
        SearchTokenId,
        resultIndex,
        policiesCancellation,
        isSeatsLoading,
        departureTime,
    } = useSelector((state) => state.bus);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    /**
     * Fetch seat data when component mounts
     */
    useEffect(() => {
        if (resultIndex && SearchTokenId && policiesCancellation) {
            dispatch(getAvailableSeats(resultIndex, SearchTokenId, policiesCancellation));
        }
    }, [dispatch, resultIndex, SearchTokenId, policiesCancellation]);

    /**
     * Handle seat selection/deselection
     * @param {Object} seat - Seat object to toggle
     */
    const handleSeatSelection = useCallback((seat) => {
        setSelectedSeats((prevSelected) => {
            const isAlreadySelected = prevSelected.some((s) => s.seat_id === seat.seat_id);

            if (isAlreadySelected) {
                // Deselect seat
                return prevSelected.filter((s) => s.seat_id !== seat.seat_id);
            } else {
                // Select seat (add max seat limit check if needed)
                return [...prevSelected, seat];
            }
        });
    }, []);

    /**
     * Calculate total price of selected seats
     * Memoized to avoid recalculation on every render
     */
    const totalPrice = useMemo(() => {
        return selectedSeats.reduce((sum, seat) => sum + (seat.price || 0), 0);
    }, [selectedSeats]);

    /**
     * Reset all selected seats
     */
    const handleReset = useCallback(() => {
        setSelectedSeats([]);
    }, []);

    /**
     * Proceed to boarding/dropping point selection
     */
    const handleProceed = useCallback(async () => {
        await dispatch(
            getBoardingAndDroppingPoints(resultIndex, SearchTokenId, selectedSeats, totalPrice)
        );
        navigation.navigate('SelectBoardDrop', { selectedSeats, totalPrice });
    }, [dispatch, navigation, resultIndex, SearchTokenId, selectedSeats, totalPrice]);

    /**
     * Get lower and upper deck seats
     */
    const deckSeats = useMemo(() => ({
        lower: seatLayout?.lower_deck?.rows,
        upper: seatLayout?.upper_deck?.rows,
    }), [seatLayout]);

    return {
        // State
        selectedSeats,
        isLoading: isSeatsLoading || !seatLayout,

        // Seat layout
        lowerSeats: deckSeats.lower,
        upperSeats: deckSeats.upper,

        // Bus info
        originCity,
        destinationCity,
        date_of_journey,
        selectedBus,
        selectedBusType,
        departureTime,

        // Pricing
        totalPrice,

        // Methods
        handleSeatSelection,
        handleReset,
        handleProceed,
    };
};
