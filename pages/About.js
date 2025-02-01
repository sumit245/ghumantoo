import React from "react";
import { Text, SafeAreaView, TouchableOpacity, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { typography } from "../utils/typography";
import { spacing } from "../utils/spacing.styles";

const AboutScreen = () => {
  const data = [
    { id: "1", title: "About your account" },
    { id: "2", title: "Privacy Policy" },
    { id: "3", title: "Terms of Use" },
    { id: "4", title: "Open source libraries" },
    { id: "5", title: "App updates" },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        spacing.p4,
        spacing.bw05,
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
      ]}
    >
      <Text style={[typography.font16]}>{item.title}</Text>
      <Ionicons name="chevron-forward" size={20} color="#000" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ marginTop: 10 }}
      />
    </SafeAreaView>
  );
};

export default AboutScreen;
