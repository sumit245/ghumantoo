import { View, Text, FlatList } from "react-native";
import { styles } from "../../utils/styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ratings from "../RatingComponent/Ratings";
import Review from "../RatingComponent/Review";
import PrimaryButton from "../buttons/PrimaryButton";

const ratingsData = {
  average: 4.6,
  total: 444,
  ratings: [
    { star: 5, percent: 83 },
    { star: 4, percent: 10 },
    { star: 3, percent: 2 },
    { star: 2, percent: 1 },
    { star: 1, percent: 4 },
  ],
};

const reviewData = [
  { icon: false, text: "Punctuality(351)", good: true },
  { icon: false, text: "Rest stop hygiene(199)", good: true },
  { icon: false, text: "Staff Behaviour(317)", good: true },
  { icon: false, text: "Driving(335)", good: true },
  { icon: false, text: "Cleanliness(301)", good: true },
];

const Reviews = () => {
  const renderRating = ({ item }) => {
    return <Ratings star={item.star} percent={item.percent} />;
  };

  const renderReview = ({ item }) => {
    return <Review icon={item.icon} text={item.text} good={item.good} />;
  };

  return (
    <View>
      <View style={styles.row}>
        <Text style={[styles.headerTitleText, { fontSize: 24 }]}>
          Reviews & Ratings
        </Text>
        <View>
          <Text
            style={[styles.headerTitleText, { fontSize: 24, color: "green" }]}
          >
            <AntDesign name="star" size={24} color="green" />{" "}
            {ratingsData.average}
          </Text>
          <Text style={{ marginTop: -9 }}>{ratingsData.total} Ratings</Text>
        </View>
      </View>

      <FlatList
        data={ratingsData.ratings}
        renderItem={renderRating}
        keyExtractor={(item, index) => index.toString()}
      />

      <FlatList
        style={[
          styles.row,
          {
            justifyContent: "none",
            flexWrap: "wrap",
            marginTop: 25,
            minHeight: 20,
          },
        ]}
        data={reviewData}
        renderItem={renderReview}
        keyExtractor={(item) => item.text}
      />

      <PrimaryButton
        style={{ opacity: 0.7, height: 40, marginTop: 35 }}
        title="Read All Reviews (381)"
      />
    </View>
  );
};

export default Reviews;
