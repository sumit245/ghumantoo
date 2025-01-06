import { View, Text } from "react-native";
import React from "react";
import { styles } from "../utils/styles";

export default function Cards() {
  return (
    <View
      style={[
        styles.container,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <Text
        style={{
          color: "grey",
          fontSize: 20,
          alignSelf: "center",
        }}
      >
       You have not saved any cards
      </Text>
    </View>
  );
}
