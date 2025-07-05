import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { styles } from "../utils/styles";
import TabBarComponent from "../components/tabBar/TabBarComponent";
import { typography } from "../utils/typography";
import { spacing } from "../utils/spacing.styles";

export default function Bookings() {
  const [tabs] = useState([
    {
      index: 0,
      name: "Completed",
    },
    {
      index: 1,
      name: "Cancelled",
    },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[typography.font24, typography.textBold, spacing.p2, spacing.ml4]}>
        My Bookings
      </Text>
      <TabBarComponent tabs={tabs} />
    </SafeAreaView>
  );
}
