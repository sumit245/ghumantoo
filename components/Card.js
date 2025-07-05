import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Destinations } from "./Data";
import { styles } from "../utils/styles";
import { typography } from "../utils/typography";
import { spacing } from "../utils/spacing.styles";

export default function Card() {
  return (
    <>

      <Text style={[typography.font24, typography.textBold, spacing.ml4]}>
        Top Destinations
      </Text>
      <Text style={[typography.font16, spacing.ml4]}>From Rewa</Text>

      <ScrollView
        style={[spacing.mv3, spacing.ml3]}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {Destinations.map(({ id, name, startingFrom, availability, color }) => (
          <TouchableOpacity
            key={id}
            style={{ ...styles.extra, backgroundColor: color }}
          >
            <View style={styles.card}>
              <Text style={styles.title}>{name}</Text>
              <Text style={[typography.font16]}>
                From
                <Text style={styles.title}> ₹{startingFrom}</Text>
              </Text>
            </View>
            <Text
              style={[
                typography.font16,
                typography.textBold,
                { textAlign: "center" },
              ]}
            >
              {availability}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}
