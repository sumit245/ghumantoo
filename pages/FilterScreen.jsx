import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PrimaryColor, WhiteColor, LightGray, BlackColor, GrayColor } from '../utils/colors'; // Adjust path as needed
import { spacing } from '../utils/spacing.styles'; // Adjust path as needed

// Filter options - can be moved to a constants file
const DEPARTURE_TIMES = [
    { id: 'morning', label: 'Morning', time: '(6am-12pm)', iconName: 'weather-sunny' },
    { id: 'afternoon', label: 'Afternoon', time: '(12pm-6pm)', iconName: 'weather-partly-cloudy' },
    { id: 'evening', label: 'Evening', time: '(6pm-12am)', iconName: 'weather-sunset' },
    { id: 'night', label: 'Night', time: '(12am-6am)', iconName: 'weather-night' },
];

const FLEET_TYPES = ['AC', 'Non-AC', 'Sleeper', 'Seater'];

export default function FilterScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    // Get initial filter values and bus data from the previous screen
    const { initialFilters = {}, buses = [] } = route.params || {};

    // Calculate max price from the bus list once
    const maxPrice = useMemo(() => {
        if (buses.length === 0) return 1000; // Default max price if no buses are passed
        const maxPrice = Math.ceil(Math.max(...buses.map(bus => bus?.BusPrice?.PublishedPrice || 0)));
        return maxPrice
    }, [buses]);

    // State for managing filters within this screen
    const [departureTime, setDepartureTime] = useState(initialFilters.departureTime || null);
    const [selectedFleetTypes, setSelectedFleetTypes] = useState(initialFilters.fleetTypes || []);
    // Ensure the initial price is not null and defaults to maxPrice
    const [price, setPrice] = useState(initialFilters.price !== null && initialFilters.price !== undefined ? initialFilters.price : maxPrice);

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

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Departure Time</Text>
                    <View style={styles.optionsContainer}>
                        {DEPARTURE_TIMES.map(time => (
                            <TouchableOpacity
                                key={time.id}
                                style={[styles.timeOptionButton, departureTime === time.id && styles.optionButtonSelected]}
                                onPress={() => setDepartureTime(time.id)}
                            >
                                <Icon
                                    name={time.iconName}
                                    size={24}
                                    color={departureTime === time.id ? WhiteColor : PrimaryColor}
                                />
                                <View>
                                    <Text style={[styles.optionText, departureTime === time.id && styles.optionTextSelected]}>{time.label}</Text>
                                    <Text style={[styles.timeText, departureTime === time.id && styles.timeTextSelected]}>{time.time}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Fleet Type Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Bus Type</Text>
                    <View style={styles.optionsContainer}>
                        {FLEET_TYPES.map(type => (
                            <TouchableOpacity
                                key={type}
                                style={[styles.optionButton, selectedFleetTypes.includes(type) && styles.optionButtonSelected]}
                                onPress={() => toggleFleetType(type)}
                            >
                                <Text style={[styles.optionText, selectedFleetTypes.includes(type) && styles.optionTextSelected]}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Price Range Section */}
                <View style={styles.section}>
                    <View style={styles.priceHeader}>
                        <Text style={styles.sectionTitle}>Max Price</Text>
                        <Text style={styles.priceValue}>₹ {Math.round(price)}</Text>
                    </View>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={maxPrice}
                        step={50}
                        value={price}
                        onValueChange={setPrice}
                        minimumTrackTintColor={PrimaryColor}
                        maximumTrackTintColor={LightGray}
                        thumbTintColor={PrimaryColor}
                    />
                </View>

            </ScrollView>

            {/* Footer with Apply and Reset buttons */}
            <View style={styles.footer}>
                <TouchableOpacity style={[styles.footerButton, styles.resetButton]} onPress={handleResetFilters}>
                    <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.footerButton, styles.applyButton]} onPress={handleApplyFilters}>
                    <Text style={styles.applyButtonText}>Apply Filters</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

// Styles for the FilterScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WhiteColor,
    },
    scrollView: {
        flex: 1,
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: BlackColor,
        marginBottom: 15,
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    optionButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: LightGray,
        backgroundColor: '#fafafa'
    },
    timeOptionButton: {
        flexBasis: '48%', // Creates a 2-column layout with a small gap
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: LightGray,
        backgroundColor: '#fafafa',
        justifyContent: 'flex-start',

    },
    optionButtonSelected: {
        backgroundColor: PrimaryColor,
        borderColor: PrimaryColor,
    },
    optionText: {
        color: BlackColor,
        fontSize: 14,
        fontWeight: 'bold',
    },
    optionTextSelected: {
        color: WhiteColor,
        fontWeight: 'bold',
    },
    timeText: {
        color: GrayColor,
        fontSize: 12,
    },
    timeTextSelected: {
        color: WhiteColor,
        opacity: 0.9,
    },
    priceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: PrimaryColor,
    },
    slider: {
        width: '100%',
        height: 40,
        marginTop: 10,
    },
    footer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: LightGray,
        padding: 15,
        backgroundColor: WhiteColor,
    },
    footerButton: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resetButton: {
        backgroundColor: '#f1f1f1',
        marginRight: 10,
    },
    resetButtonText: {
        color: GrayColor,
        fontSize: 16,
        fontWeight: 'bold',
    },
    applyButton: {
        backgroundColor: PrimaryColor,
    },
    applyButtonText: {
        color: WhiteColor,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
