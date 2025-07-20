import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { styles as globalStyles } from '../../utils/styles'; // Assuming global styles
import Review from '../RatingComponent/Review'; // Your existing Review component

// --- Sub-Component for a single Rest Stop ---
// This makes the main component cleaner and this part reusable.
const RestStopItem = ({ name, time, duration }) => (
  <View style={styles.restStopContainer}>
    <Text style={styles.restStopName}>{name}</Text>
    <View style={styles.detailsRow}>
      <Text style={globalStyles.subHeadingBottomSheet}>{time}</Text>
      <View style={styles.dotSeparator} />
      <Text style={[globalStyles.subHeadingBottomSheet, styles.durationText]}>
        {duration}
      </Text>
    </View>
  </View>
);

// --- Main Component ---
// It now accepts data via props and is structured for better readability.
const RestStopsInfo = ({ restStops = [], travelerExperiences = [] }) => {
  // useMemo ensures this sorting logic only runs when travelerExperiences data changes,
  // not on every re-render.
  const sortedExperiences = useMemo(() => {
    const good = travelerExperiences.filter((exp) => exp.good);
    const bad = travelerExperiences.filter((exp) => !exp.good);
    return [...good, ...bad];
  }, [travelerExperiences]);

  return (
    // Using a ScrollView is safer than nested FlatLists for this layout.
    <ScrollView style={styles.container}>
      {/* Rest Stops Section */}
      <Text style={globalStyles.headerTitleText}>Rest Stops</Text>
      {restStops.length > 0 ? (
        restStops.map((stop, index) => (
          <RestStopItem
            key={index.toString()}
            name={stop.name}
            time={stop.time}
            duration={stop.duration}
          />
        ))
      ) : (
        <Text style={styles.noDataText}>No rest stops available.</Text>
      )}

      {/* Traveller Experience Section */}
      <Text style={styles.experienceHeader}>Traveller Experience</Text>
      <View style={styles.experienceGrid}>
        {sortedExperiences.map((item) => (
          <View key={item.text} style={styles.reviewWrapper}>
            <Review icon={true} text={item.text} good={item.good} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// --- Local Stylesheet ---
// Consolidating all component-specific styles here improves organization.
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  restStopContainer: {
    marginTop: 5,
  },
  restStopName: {
    ...globalStyles.stdTextBottomSheet,
    fontWeight: 'bold',
    marginTop: 15,
  },
  detailsRow: {
    ...globalStyles.row,
    width: 200,
    marginTop: 5,
    justifyContent: 'flex-start', // Align items to the start
    alignItems: 'center',
  },
  dotSeparator: {
    height: 4,
    width: 4,
    borderRadius: 2,
    backgroundColor: 'black',
    marginHorizontal: 8, // Gives space around the dot
  },
  durationText: {
    color: 'red',
  },
  experienceHeader: {
    ...globalStyles.stdTextBottomSheet,
    marginTop: 25, // More space between sections
    fontWeight: 'bold',
    marginBottom: 15,
  },
  experienceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  reviewWrapper: {
    // This wrapper helps control the layout of each Review item in the grid.
    width: '33.33%', // Creates a 3-column layout
    paddingRight: 10, // Adds spacing between items
    marginBottom: 10,
  },
  noDataText: {
    ...globalStyles.stdTextBottomSheet,
    marginTop: 10,
    opacity: 0.6,
  },
});

export default RestStopsInfo;
