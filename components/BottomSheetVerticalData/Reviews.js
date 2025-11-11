import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles as globalStyles, BlackColor, layouts, spacing, typography, DarkGray, SuccessColor } from '../../utils/styles';
import Ratings from '../RatingComponent/Ratings';
import Review from '../RatingComponent/Review';
import PrimaryButton from '../buttons/PrimaryButton';

// --- Sub-Component for the Header ---
// Displays the main title and the average rating score.
const RatingsHeader = ({ average, total }) => (
  <View style={[globalStyles.row, { alignItems: 'flex-start' }]}>
    <Text style={[globalStyles.headerTitleText, typography.font24, { color: BlackColor }]}>
      Reviews & Ratings
    </Text>
    <View style={{ alignItems: 'flex-end' }}>
      <Text style={[globalStyles.headerTitleText, typography.font24, { color: SuccessColor }]}>
        <AntDesign name="star" size={24} color={SuccessColor} /> {average}
      </Text>
      <Text style={[typography.font14, { marginTop: -9, color: DarkGray }]}>{total} Ratings</Text>
    </View>
  </View>
);

// --- Main Component ---
// Accepts all data via props for maximum reusability.
const RatingsAndReviews = ({ ratingsData, reviewData, totalReviews }) => {
  return (
    // A ScrollView is better for this layout than nested FlatLists.
    <ScrollView style={layouts.container}>
      {/* Header Section */}
      <RatingsHeader average={ratingsData.average} total={ratingsData.total} />

      {/* Ratings Bars Section */}
      <View style={spacing.mt4}>
        {ratingsData.ratings.map((rating) => (
          <Ratings key={rating.star} star={rating.star} percent={rating.percent} />
        ))}
      </View>

      {/* Review Tags Section */}
      <View style={[layouts.rowCenter, { flexWrap: 'wrap', marginTop: 25 }]}>
        {reviewData.map((review) => (
          <View key={review.text} style={[spacing.mr2, spacing.mb2]}>
            <Review icon={review.icon} text={review.text} good={review.good} />
          </View>
        ))}
      </View>

      {/* "Read All" Button */}
      <PrimaryButton
        style={[spacing.mt5, { opacity: 0.7, height: 40 }]}
        title={`Read All Reviews (${totalReviews})`}
      />
    </ScrollView>
  );
};

export default RatingsAndReviews;
