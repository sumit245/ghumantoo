import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles as globalStyles } from '../../utils/styles'; // Assuming a global styles file

// --- Sub-component 1: TimeColumn (No changes) ---
const TimeColumn = ({ time, date }) => (
  <View style={styles.timeContainer}>
    <Text style={[globalStyles.stdTextBottomSheet, styles.boldText]}>{time}</Text>
    <Text style={styles.dateText}>{date}</Text>
  </View>
);

// --- Sub-component 2: LocationDetails (No changes) ---
const LocationDetails = ({ name, address }) => (
  <View style={styles.locationContainer}>
    <Text style={[globalStyles.stdTextBottomSheet, styles.boldText]}>{name}</Text>
    <Text style={styles.addressText}>{address}</Text>
  </View>
);

// --- Sub-component 3: TimelineIndicator (REFACTORED) ---
// This component now draws the dot and the line below it separately,
// allowing for precise alignment with the text in its row.
const TimelineIndicator = ({ isLast, isSinglePoint }) => {
  // For a single point, we only need the dot.
  if (isSinglePoint) {
    return (
      <View style={styles.indicatorContainer}>
        <View style={styles.dot} />
      </View>
    );
  }

  // For a list, we draw the dot and a connector line.
  return (
    <View style={styles.indicatorContainer}>
      {/* This view holds the dot and ensures it aligns with the first line of text */}
      <View style={styles.dotWrapper}>
        <View style={styles.dot} />
      </View>
      {/* The line connector fills the remaining vertical space in the row. */}
      {/* We don't render it for the very last item in the list. */}
      {!isLast && <View style={styles.lineConnector} />}
    </View>
  );
};

// --- Main Component: TravelPointsList (REFACTORED) ---
// Now maps over each point and renders a self-contained row.
const TravelPointsList = ({ points = [] }) => {
  const isSinglePoint = points.length === 1;

  return (
    <View style={styles.listContainer}>
      {points.map((point, index) => (
        <View key={point.name} style={styles.row}>
          <TimeColumn time={point.time} date={point.date} />
          <TimelineIndicator
            isLast={index === points.length - 1}
            isSinglePoint={isSinglePoint}
          />
          <LocationDetails name={point.name} address={point.address} />
        </View>
      ))}
    </View>
  );
};

// --- Styles (UPDATED) ---
const styles = StyleSheet.create({
  listContainer: {
    padding: 20, // Apply horizontal padding to the whole list
  },
  row: {
    flexDirection: 'row',
  },
  timeContainer: {
    marginRight: 10,
    paddingBottom: 25, // Adds vertical space between list items
  },
  boldText: {
    fontWeight: 'bold',
  },
  dateText: {
    opacity: 0.6,
  },
  // The container for the indicator ensures it has its own column.
  indicatorContainer: {
    width: 20,
    alignItems: 'center', // Center the dot/line horizontally
    marginRight: 10,
    marginTop: 1, // Aligns the dot with the first line of text
  },
  // A wrapper to vertically align the dot with the first line of text.
  dotWrapper: {
    height: 12, // Should be roughly the line-height of your title text
    justifyContent: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'black',
  },
  // The line that connects the dots between rows.
  lineConnector: {
    flex: 1, // Takes up all remaining vertical space in the row
    height:'auto',
    width: 2,
    backgroundColor: 'lightgrey',
  },
  locationContainer: {
    flex: 1, // Ensures this column takes up the remaining horizontal space
    paddingBottom: 25, // Adds vertical space between list items
  },
  addressText: {
    width: '100%', // Use percentage for better responsiveness
    flexWrap: 'wrap',
    fontSize: 12,
    opacity: 0.6,
    
  },
});

export default TravelPointsList;