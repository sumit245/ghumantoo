import { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

/**
 * Custom hook for SelectBoardDrop screen business logic
 * 
 * Handles:
 * - Boarding/dropping point selection
 * - Tab switching
 * - Search filtering
 * - Point selection state management
 * - Navigation to passenger screen
 * 
 * @returns {Object} Board/Drop selection state and methods
 */
export const useSelectBoardDrop = () => {
    const [activeTab, setActiveTab] = useState('boarding');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBoardingPoint, setSelectedBoardingPoint] = useState(null);
    const [selectedDroppingPoint, setSelectedDroppingPoint] = useState(null);

    const {
        boardingPoints,
        droppingPoints,
        originCity,
        destinationCity,
        date_of_journey,
        selectedBus,
        departureTime,
    } = useSelector((state) => state.bus);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const isBoardingTab = activeTab === 'boarding';

    /**
     * Filter points based on search query
     * Memoized to prevent re-calculation on every render
     */
    const filteredData = useMemo(() => {
        const data = isBoardingTab ? boardingPoints : droppingPoints;
        if (!searchQuery) {
            return data;
        }
        return data.filter(
            (item) =>
                item.CityPointName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.CityPointAddress.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, isBoardingTab, boardingPoints, droppingPoints]);

    /**
     * Handle point selection
     * Auto-switches to dropping tab after boarding selection
     */
    const handleSelect = useCallback(
        (item) => {
            if (isBoardingTab) {
                setSelectedBoardingPoint(item);
                setActiveTab('dropping'); // Auto-switch to dropping tab
                setSearchQuery(''); // Clear search when switching tabs
            } else {
                setSelectedDroppingPoint(item);
            }
        },
        [isBoardingTab]
    );

    /**
     * Reset all selections
     */
    const handleReset = useCallback(() => {
        setSelectedBoardingPoint(null);
        setSelectedDroppingPoint(null);
        setActiveTab('boarding');
        setSearchQuery('');
    }, []);

    /**
     * Proceed to passenger details
     * Dispatches selected points to Redux and navigates
     */
    const handleProceed = useCallback(async () => {
        await dispatch({
            type: 'SET_SELECTED_BOARDING_POINT',
            payload: selectedBoardingPoint,
        });
        await dispatch({
            type: 'SET_SELECTED_DROPPING_POINT',
            payload: selectedDroppingPoint,
        });

        navigation.navigate('AddPassenger', {
            boardingPoint: selectedBoardingPoint,
            droppingPoint: selectedDroppingPoint,
        });
    }, [dispatch, navigation, selectedBoardingPoint, selectedDroppingPoint]);

    /**
     * Switch between boarding and dropping tabs
     */
    const switchTab = useCallback((tab) => {
        setActiveTab(tab);
        setSearchQuery(''); // Clear search when switching tabs
    }, []);

    /**
     * Check if point is selected
     */
    const isPointSelected = useCallback(
        (item) => {
            if (isBoardingTab) {
                return selectedBoardingPoint?.CityPointIndex === item.CityPointIndex;
            }
            return selectedDroppingPoint?.CityPointIndex === item.CityPointIndex;
        },
        [isBoardingTab, selectedBoardingPoint, selectedDroppingPoint]
    );

    return {
        // State
        activeTab,
        searchQuery,
        selectedBoardingPoint,
        selectedDroppingPoint,
        filteredData,
        isBoardingTab,

        // Bus info
        originCity,
        destinationCity,
        date_of_journey,
        selectedBus,
        departureTime,

        // Methods
        setSearchQuery,
        handleSelect,
        handleReset,
        handleProceed,
        switchTab,
        isPointSelected,

        // Computed
        canProceed: selectedBoardingPoint && selectedDroppingPoint,
    };
};
