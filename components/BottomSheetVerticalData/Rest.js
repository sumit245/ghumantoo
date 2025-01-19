import React from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "../../utils/styles";
import Review from "../RatingComponent/Review";

const restStops = [
  { name: "Hotel Paradise", time: "12:30 AM", duration: "20 Mins Stop" },
];

const travelerExperiences = [
  { text: "Washroom Hygiene", good: true },
  { text: "Safety", good: true },
  { text: "Food Quality", good: false },
  { text: "Service", good: false },
  { text: "Comfort", good: true },
];

const Rest = () => {
  // Filter travelerExperiences into good and bad arrays
  const goodExperiences = travelerExperiences.filter((exp) => exp.good);
  const badExperiences = travelerExperiences.filter((exp) => !exp.good);

  // Concatenate good and bad arrays
  const allExperiences = [...goodExperiences, ...badExperiences];

  const renderRestStopItem = ({ item }) => (
    <View>
      <Text
        style={[
          styles.stdTextBottomSheet,
          { fontWeight: "bold", marginTop: 15 },
        ]}
      >
        {item.name}
      </Text>
      <View style={[styles.row, { width: 200, marginTop: 5 }]}>
        <Text style={[styles.subHeadingBottomSheet]}>{item.time}</Text>
        <View
          style={{
            height: 3,
            width: 3,
            borderRadius: 50,
            backgroundColor: "black",
          }}
        />
        <Text style={[styles.subHeadingBottomSheet, { color: "red" }]}>
          {item.duration}
        </Text>
      </View>
    </View>
  );

  const renderTravelerExperienceItem = ({ item }) => (
    <Review icon={true} text={item.text} good={item.good} />
  );

  return (
    <View>
      <Text style={styles.headerTitleText}>Rest Stops</Text>
      <FlatList
        data={restStops}
        renderItem={renderRestStopItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <Text
        style={[
          styles.stdTextBottomSheet,
          { marginTop: 15, fontWeight: "bold" },
        ]}
      >
        Traveller Experience
      </Text>
      <FlatList
        style={[styles.row, { justifyContent: "none", flexWrap: "wrap" }]}
        data={allExperiences}
        renderItem={renderTravelerExperienceItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Rest;
