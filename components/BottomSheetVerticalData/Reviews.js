import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles as globalStyles } from '../../utils/styles'; // Assuming global styles
import Ratings from '../RatingComponent/Ratings'; // Your existing Ratings bar component
import Review from '../RatingComponent/Review'; // Your existing Review tag component
import PrimaryButton from '../buttons/PrimaryButton';

// --- Sub-Component for the Header ---
// Displays the main title and the average rating score.
const RatingsHeader = ({ average, total }) => (
  <View style={styles.headerContainer}>
    <Text style={[globalStyles.headerTitleText, { fontSize: 24 }]}>
      Reviews & Ratings
    </Text>
    <View style={styles.averageRatingContainer}>
      <Text style={styles.averageRatingText}>
        <AntDesign name="star" size={24} color="green" /> {average}
      </Text>
      <Text style={styles.totalRatingsText}>{total} Ratings</Text>
    </View>
  </View>
);

// --- Main Component ---
// Accepts all data via props for maximum reusability.
const RatingsAndReviews = ({ ratingsData, reviewData, totalReviews }) => {
  return (
    // A ScrollView is better for this layout than nested FlatLists.
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <RatingsHeader average={ratingsData.average} total={ratingsData.total} />

      {/* Ratings Bars Section */}
      <View style={styles.ratingsListContainer}>
        {ratingsData.ratings.map((rating) => (
          // Assuming 'Ratings' is the component for a single bar
          <Ratings key={rating.star} star={rating.star} percent={rating.percent} />
        ))}
      </View>

      {/* Review Tags Section */}
      <View style={styles.reviewTagsContainer}>
        {reviewData.map((review) => (
          <View key={review.text} style={styles.reviewTagWrapper}>
            <Review icon={review.icon} text={review.text} good={review.good} />
          </View>
        ))}
      </View>

      {/* "Read All" Button */}
      <PrimaryButton
        style={styles.readAllButton}
        title={`Read All Reviews (${totalReviews})`}
      />
    </ScrollView>
  );
};

// --- Local Stylesheet ---
// Organizes all component-specific styles in one place.
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    ...globalStyles.row, // Re-uses the row style for flexbox behavior
    alignItems: 'flex-start', // Aligns children to the top
  },
  averageRatingContainer: {
    alignItems: 'flex-end', // Aligns the score and total count to the right
  },
  averageRatingText: {
    ...globalStyles.headerTitleText,
    fontSize: 24,
    color: 'green',
  },
  totalRatingsText: {
    marginTop: -9,
    fontSize: 14,
    color: '#6c757d', // A standard gray for secondary text
  },
  ratingsListContainer: {
    marginTop: 15,
  },
  reviewTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 25,
  },
  reviewTagWrapper: {
    // This wrapper ensures consistent spacing for each tag in the grid.
    marginRight: 10,
    marginBottom: 10,
  },
  readAllButton: {
    opacity: 0.7,
    height: 40,
    marginTop: 25,
  },
});

export default RatingsAndReviews;
