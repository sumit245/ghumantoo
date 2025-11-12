import { useState, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

export const useFilterScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    // Get initial filter values and bus data from the previous screen
    const { initialFilters = {}, buses = [] } = route.params || {};

    // Calculate max price from the bus list once
    const maxPrice = useMemo(() => {
        if (buses.length === 0) return 1000; // Default max price if no buses are passed
        return Math.ceil(Math.max(...buses.map(bus => bus?.BusPrice?.PublishedPrice || 0)));
    }, [buses]);

    // State for managing filters
    const [departureTime, setDepartureTime] = useState(initialFilters.departureTime || null);
    const [selectedFleetTypes, setSelectedFleetTypes] = useState(initialFilters.fleetTypes || []);
    const [price, setPrice] = useState(
        initialFilters.price !== null && initialFilters.price !== undefined
            ? initialFilters.price
            : maxPrice
    );

    // Handler for toggling fleet types
    const toggleFleetType = (type) => {
        setSelectedFleetTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    // Handler to apply all filters and navigate back
    const handleApplyFilters = () => {
        navigation.navigate('SearchBus', {
            appliedFilters: {
                departureTime,
                fleetTypes: selectedFleetTypes,
                price,
            },
        });
    };

    // Handler to reset all filters to their default state
    const handleResetFilters = () => {
        setDepartureTime(null);
        setSelectedFleetTypes([]);
        setPrice(maxPrice);
    };

    // Handler for departure time selection
    const handleDepartureTimeSelect = (timeId) => {
        setDepartureTime(timeId);
    };

    // Handler for price change
    const handlePriceChange = (value) => {
        setPrice(value);
    };

    return {
        // Filter state
        departureTime,
        selectedFleetTypes,
        price,
        maxPrice,

        // Handlers
        toggleFleetType,
        handleApplyFilters,
        handleResetFilters,
        handleDepartureTimeSelect,
        handlePriceChange,
    };
};
