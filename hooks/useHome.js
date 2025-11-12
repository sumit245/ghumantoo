import { useState, useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useNetwork } from '../utils/PermissionManager';
import { getActiveCoupons, getBusOnRoute } from '../actions/busActions';
import dayjs from 'dayjs';

/**
 * Custom hook for Home screen business logic
 * 
 * Handles:
 * - Bus search form state management
 * - Location selection and swapping
 * - Date picker management
 * - Bus search execution
 * - Coupon fetching
 * - Network status monitoring
 * - Form validation
 * 
 * @returns {Object} Home screen state and methods
 */
export const useHome = () => {
    // Search form state
    const [searchQuery, setSearchQuery] = useState({
        date: dayjs(),
        pickup: '',
        destination: '',
    });

    // UI state
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [isCouponsLoading, setIsCouponsLoading] = useState(true);

    // Hooks
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isConnected = useNetwork();

    /**
     * Validate search form before submission
     * @returns {boolean} True if form is valid
     */
    const validateSearchForm = useCallback(() => {
        if (!searchQuery.pickup) {
            console.warn('Source of journey cannot be empty');
            return false;
        }

        if (!searchQuery.destination) {
            console.warn('Destination of journey cannot be empty');
            return false;
        }

        if (searchQuery.pickup === searchQuery.destination) {
            console.warn('Source and destination cannot be same');
            return false;
        }

        return true;
    }, [searchQuery]);

    /**
     * Search for buses based on selected criteria
     * Validates form, dispatches search action, navigates to results
     */
    const searchBus = useCallback(async () => {
        // Validate form
        if (!validateSearchForm()) {
            return;
        }

        // Format date for API
        const formattedDate = dayjs(searchQuery.date).format('YYYY-MM-DD');
        setIsSearching(true);

        try {
            // Dispatch bus search action
            await dispatch(getBusOnRoute(searchQuery.pickup, searchQuery.destination, formattedDate));

            // Navigate to search results screen
            navigation.navigate('SearchBus');
        } catch (err) {
            console.error('Search bus error:', err);
        } finally {
            setIsSearching(false);
        }
    }, [searchQuery, validateSearchForm, dispatch, navigation]);

    /**
     * Handle date selection from calendar
     * Updates search query and closes calendar modal
     */
    const handleDateChange = useCallback((selectedDate) => {
        setSearchQuery(prev => ({ ...prev, date: selectedDate }));
        setCalendarVisible(false);
    }, []);

    /**
     * Set pickup location
     * Updates search query and dispatches Redux action for city name
     */
    const setPickupLocation = useCallback((location) => {
        setSearchQuery(prev => ({ ...prev, pickup: location.id }));

        if (location) {
            dispatch({ type: 'SET_ORIGIN_CITY', payload: location.title });
        }
    }, [dispatch]);

    /**
     * Set destination location
     * Updates search query and dispatches Redux action for city name
     */
    const setDestinationLocation = useCallback((location) => {
        setSearchQuery(prev => ({ ...prev, destination: location.id }));

        if (location) {
            dispatch({ type: 'SET_DESTINATION_CITY', payload: location.title });
        }
    }, [dispatch]);

    /**
     * Swap pickup and destination locations
     * Also swaps city names in Redux store
     */
    const handleSwapLocations = useCallback(() => {
        setSearchQuery(prev => ({
            ...prev,
            pickup: prev.destination,
            destination: prev.pickup,
        }));

        // TODO: Implement Redux action to swap city names
        // dispatch({ type: 'SWAP_CITIES' });
    }, []);

    /**
     * Fetch active coupons from API
     * Runs once on component mount
     */
    const getCoupons = useCallback(async () => {
        setIsCouponsLoading(true);

        try {
            await dispatch(getActiveCoupons());
        } catch (error) {
            console.error('Failed to fetch coupons:', error);
            // Silently fail - coupons are not critical for app functionality
        } finally {
            setIsCouponsLoading(false);
        }
    }, [dispatch]);

    /**
     * Show/hide calendar modal
     */
    const toggleCalendar = useCallback(() => {
        setCalendarVisible(prev => !prev);
    }, []);

    // Fetch coupons on mount
    useEffect(() => {
        getCoupons();
    }, [getCoupons]);

    // Memoize calendar date range to avoid recalculation
    const calendarDateRange = useMemo(() => ({
        minDate: dayjs().toDate(),
        maxDate: dayjs().add(90, 'day').toDate(),
    }), []);

    return {
        // Search form state
        searchQuery,

        // UI state
        isCalendarVisible,
        isSearching,
        isCouponsLoading,

        // Calendar configuration
        calendarDateRange,

        // Methods
        searchBus,
        handleDateChange,
        setPickupLocation,
        setDestinationLocation,
        handleSwapLocations,
        getCoupons,
        toggleCalendar,
        setCalendarVisible,
    };
};
