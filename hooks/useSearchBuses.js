import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getBusOnRoute } from '../actions/busActions';
import { SELECT_BUS, SET_ARRIVAL_TIME, SET_BUS_TYPE, SET_DEPARTURE_TIME, SET_RESULT_INDEX, SET_CANCEL_POLICY } from '../utils/constants';

/**
 * Custom hook for SearchBuses screen business logic
 * 
 * Handles:
 * - Bus list fetching and pagination
 * - Filtering by bus type and time
 * - Sorting by price and departure time
 * - Bus selection and navigation
 * - Loading states management
 * 
 * @returns {Object} Search buses state and methods
 */
export const useSearchBuses = () => {
    // Loading states for better UX
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // Pagination state
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // Filter and sort state
    const [activeFilters, setActiveFilters] = useState({
        fleetTypes: [],
        departureTime: null,
        price: null,
        sortBy: 'departure',
        sortOrder: 'asc',
    });

    // Ref to track initial mount
    const isInitialMount = useRef(true);

    // Redux selectors
    const {
        buses,
        date_of_journey,
        destinationId,
        pickupId,
        SearchTokenId,
        originCity,
        destinationCity
    } = useSelector((state) => state.bus);

    // Hooks
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();

    /**
     * Fetch bus data based on current filters and pagination
     * @param {number} pageNumber - Page number to fetch
     * @param {boolean} isRefresh - Whether this is a refresh operation
     */
    const fetchBusData = useCallback(async (pageNumber = 1, isRefresh = false) => {
        if (!pickupId || !destinationId) return;

        // Set appropriate loading state
        if (isRefresh && !isInitialMount.current) {
            setIsRefreshing(true);
        }

        try {
            const response = await dispatch(
                getBusOnRoute(pickupId, destinationId, date_of_journey, activeFilters, pageNumber)
            );

            // Update pagination state
            if (response?.pagination?.has_more_pages === false) {
                setHasMore(false);
            }
        } catch (err) {
            console.error('Fetch bus data error:', err);
            // TODO: Show error to user via snackbar
        } finally {
            setIsInitialLoading(false);
            setIsRefreshing(false);
            isInitialMount.current = false;
        }
    }, [pickupId, destinationId, date_of_journey, activeFilters, dispatch]);

    /**
     * Load more buses for pagination
     * Triggered when user scrolls to end of list
     */
    const handleLoadMore = useCallback(async () => {
        if (isLoadingMore || !hasMore) return;

        setIsLoadingMore(true);
        const nextPage = page + 1;

        try {
            const response = await dispatch(
                getBusOnRoute(pickupId, destinationId, date_of_journey, activeFilters, nextPage)
            );

            if (response?.pagination?.has_more_pages === false) {
                setHasMore(false);
            }

            if (!response?.trips || response.trips.length === 0) {
                setPage(nextPage);
            }
        } catch (err) {
            console.error('Load more error:', err);
        } finally {
            setIsLoadingMore(false);
        }
    }, [isLoadingMore, hasMore, page, pickupId, destinationId, date_of_journey, activeFilters, dispatch]);

    /**
     * Handle bus selection and navigate to seat selection
     * Dispatches all necessary bus info to Redux synchronously
     */
    const handleBusSelection = useCallback((bus) => {
        // Update Redux store with selected bus information
        dispatch({ type: SELECT_BUS, payload: bus.TravelName });
        dispatch({ type: SET_BUS_TYPE, payload: bus.BusType });
        dispatch({ type: SET_DEPARTURE_TIME, payload: bus.DepartureTime });
        dispatch({ type: SET_ARRIVAL_TIME, payload: bus.ArrivalTime });
        dispatch({ type: SET_RESULT_INDEX, payload: bus.ResultIndex });
        dispatch({ type: SET_CANCEL_POLICY, payload: bus.CancellationPolicies });

        // Navigate immediately (no async operations)
        navigation.navigate('selectSeat');
    }, [dispatch, navigation]);

    /**
     * Toggle bus type filter (AC, Non-AC, Sleeper, Seater)
     */
    const toggleFleetTypeFilter = useCallback((filterName) => {
        setActiveFilters(prev => ({
            ...prev,
            fleetTypes: prev.fleetTypes.includes(filterName)
                ? prev.fleetTypes.filter(name => name !== filterName)
                : [...prev.fleetTypes, filterName],
        }));

        // Reset pagination when filter changes
        setPage(1);
        setHasMore(true);
    }, []);

    /**
     * Handle sort by departure time or price
     * Toggles sort order if same key is clicked
     */
    const handleSort = useCallback((sortKey) => {
        setActiveFilters(prev => ({
            ...prev,
            sortBy: sortKey,
            sortOrder: prev.sortBy === sortKey && prev.sortOrder === 'asc' ? 'desc' : 'asc',
        }));

        // Reset pagination when sort changes
        setPage(1);
        setHasMore(true);
    }, []);

    /**
     * Navigate to advanced filter screen
     */
    const navigateToFilters = useCallback(() => {
        navigation.navigate('filterPage', {
            initialFilters: activeFilters,
            buses,
        });
    }, [navigation, activeFilters, buses]);

    // Fetch data when filters change
    useEffect(() => {
        fetchBusData(1, true);
    }, [activeFilters]);

    // Apply filters from advanced filter screen
    useEffect(() => {
        if (route.params?.appliedFilters) {
            setActiveFilters(prev => ({ ...prev, ...route.params.appliedFilters }));
        }
    }, [route.params?.appliedFilters]);

    return {
        // State
        buses,
        originCity,
        destinationCity,
        isInitialLoading,
        isRefreshing,
        isLoadingMore,
        activeFilters,

        // Methods
        handleLoadMore,
        handleBusSelection,
        toggleFleetTypeFilter,
        handleSort,
        navigateToFilters,
    };
};
