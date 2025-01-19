import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Destinations } from "./Data";
import { styles } from "../utils/styles";
import { typography } from "../utils/typography";

export default function Card() {
  return (
    <>
      <View style={styles.headerTitle}>
        <Text style={[typography.font20, typography.textBold]}>
          Top Destinations
        </Text>
        <Text style={styles.labelStyle}>From Delhi</Text>
      </View>
      <ScrollView
        style={{ marginVertical: 12 }}
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
              <Text style={[styles.labelStyle]}>
                From
                <Text style={styles.title}> ₹{startingFrom}</Text>
              </Text>
            </View>
            <Text style={styles.headerText}>{availability}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}
