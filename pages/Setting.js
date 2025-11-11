import React from "react";
import { Text, SafeAreaView, TouchableOpacity } from "react-native";
import Ionicons  from "react-native-vector-icons/Ionicons";
import { typography, spacing, PureWhite, DangerColor } from "../utils/styles";
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
          style={[typography.font16, typography.textBold, { color: DangerColor }]}
        >
          Logout
        </Text>
        <Ionicons name="log-out-outline" size={20} color={DangerColor} />
      </TouchableOpacity>
    </>
  );
};

export default Setting;
