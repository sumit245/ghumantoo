import React from "react";
import { Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { typography } from "../utils/typography";
import { spacing } from "../utils/spacing.styles";
import { PureWhite } from "../utils/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Setting = ({ navigation }) => {
  const logout = async () => {
    await AsyncStorage.clear()
    navigation.goBack()
  }
  return (
    <>

      <TouchableOpacity
        style={[
          spacing.p3,
          spacing.mt2,
          spacing.mh2,
          spacing.br2,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: PureWhite,
          },
        ]}
        onPress={logout}
      >
        <Text
          style={[typography.font16, typography.textBold, { color: "#d32f2f" }]}
        >
          Logout
        </Text>
        <Ionicons name="log-out-outline" size={20} color="#d32f2f" />
      </TouchableOpacity>
    </>
  );
};

export default Setting;
