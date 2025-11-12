import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { PrimaryColor, WhiteColor, LightGray, DarkGray, typography, spacing, layouts, ButtonBgGray } from '../utils/styles';
import { DEPARTURE_TIMES, FLEET_TYPES } from '../utils/filterConstants';
import FilterSection from '../components/Filter/FilterSection';
import DepartureTimeOption from '../components/Filter/DepartureTimeOption';
import FleetTypeOption from '../components/Filter/FleetTypeOption';
import { useFilterScreen } from '../hooks/useFilterScreen';

export default function FilterScreen() {
    const {
        departureTime,
        selectedFleetTypes,
        price,
        maxPrice,
        toggleFleetType,
        handleApplyFilters,
        handleResetFilters,
        handleDepartureTimeSelect,
        handlePriceChange,
    } = useFilterScreen();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <FilterSection title="Departure Time">
                    <View style={styles.optionsContainer}>
                        {DEPARTURE_TIMES.map(time => (
                            <DepartureTimeOption
                                key={time.id}
                                time={time}
                                isSelected={departureTime === time.id}
                                onPress={() => handleDepartureTimeSelect(time.id)}
                            />
                        ))}
                    </View>
                </FilterSection>

                {/* Fleet Type Section */}
                <FilterSection title="Bus Type">
                    <View style={styles.optionsContainer}>
                        {FLEET_TYPES.map(type => (
                            <FleetTypeOption
                                key={type}
                                type={type}
                                isSelected={selectedFleetTypes.includes(type)}
                                onPress={() => toggleFleetType(type)}
                            />
                        ))}
                    </View>
                </FilterSection>

                {/* Price Range Section */}
                <FilterSection title="Max Price">
                    <View style={styles.priceHeader}>
                        <Text style={styles.priceValue}>₹ {Math.round(price)}</Text>
                    </View>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={maxPrice}
                        step={50}
                        value={price}
                        onValueChange={handlePriceChange}
                        minimumTrackTintColor={PrimaryColor}
                        maximumTrackTintColor={LightGray}
                        thumbTintColor={PrimaryColor}
                    />
                </FilterSection>
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

// Component-specific filter styles
const styles = StyleSheet.create({
    container: {
        ...layouts.container,
        backgroundColor: WhiteColor,
    },
    scrollView: {
        ...layouts.container,
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    priceHeader: {
        alignItems: 'flex-end',
    },
    priceValue: {
        ...typography.font16Bold,
        color: PrimaryColor,
    },
    slider: {
        width: '100%',
        height: 40,
        ...spacing.mt2,
    },
    footer: {
        ...layouts.footer,
        borderTopColor: LightGray,
        ...spacing.p3,
    },
    footerButton: {
        flex: 1,
        ...spacing.pv3,
        ...spacing.br2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resetButton: {
        backgroundColor: ButtonBgGray,
        ...spacing.mr2,
    },
    resetButtonText: {
        ...typography.font16Bold,
        color: DarkGray,
    },
    applyButton: {
        backgroundColor: PrimaryColor,
    },
    applyButtonText: {
        ...typography.font16Bold,
        color: WhiteColor,
    },
});
