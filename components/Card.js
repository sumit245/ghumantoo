import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Destinations } from "./Data";
import { styles, typography, spacing } from "../utils/styles";

export default function Card() {
  return (
    <>

      <Text style={[typography.font24, typography.textBold, spacing.ml4, { color: '#17171f' }]}>
        Top Destinations
      </Text>
      <Text style={[typography.font16, spacing.ml4, { color: '#17171f' }]}>From Rewa</Text>

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
              <Text style={[typography.font16, { color: '#17171f' }]}>
                From
                <Text style={styles.title}> ₹{startingFrom}</Text>
              </Text>
            </View>
            <Text
              style={[
                typography.font16,
                typography.textBold,
                { textAlign: "center", color: '#17171f' },
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
