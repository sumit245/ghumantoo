import React from 'react';
import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native';

// --- Import Refactored Components ---
// These are the new, reusable components we created.
import BusRoutes from './BottomSheetVerticalData/BusRoute';
import TravelPointsList from './BottomSheetVerticalData/Boarding';
import RestStopsInfo from './BottomSheetVerticalData/Rest';
import RatingsAndReviews from './BottomSheetVerticalData/Reviews';
import Cancellation from './BottomSheetVerticalData/Cancellation';
import OtherPolicies from './BottomSheetVerticalData/OtherPolicies';

import { restStopsData, ratingsInfoData, reviewsInfoData, travelerExperiencesData, totalReviewCountData } from '../faker/seatlayout'

// --- FAKE DATA FOR PROPS ---
// This data will be passed into our refactored components.



// --- Main Component Definition ---

const BottomSheetContent = () => {
    // The data for the FlatList now renders the refactored components with their props.
    const sheetSections = [
        {
            id: 'bus_route',
            component: <BusRoutes />,
        },
        {
            id: 'boarding_points',
            component: <TravelPointsList points={boardingPointsData} />,
        },
        {
            id: 'rest_stops',
            component: <RestStopsInfo restStops={restStopsData} travelerExperiences={travelerExperiencesData} />,
        },
        {
            id: 'reviews',
            component: (
                <RatingsAndReviews
                    ratingsData={ratingsInfoData}
                    reviewData={reviewsInfoData}
                    totalReviews={totalReviewCountData}
                />
            ),
        },
        {
            id: 'cancellation',
            component: <Cancellation />,
        },
        {
            id: 'other_policies',
            component: <OtherPolicies />,
        },
    ];

    const renderSection = ({ item }) => (
        <View style={styles.sectionContainer}>{item.component}</View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                style={styles.list}
                showsVerticalScrollIndicator={false}
                data={sheetSections}
                renderItem={renderSection}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingHorizontal: 20,
    },
    list: {
        marginBottom: 80,
    },
    sectionContainer: {
        paddingVertical: 20,
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 1,
    },
});

export default BottomSheetContent;
