import { View, Text } from "react-native";
import React from "react";
import { styles, DarkGray } from "../utils/styles";

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
          color: DarkGray,
          fontSize: 20,
          alignSelf: "center",
        }}
      >
       You have not saved any cards
      </Text>
    </View>
  );
}
