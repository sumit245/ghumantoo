import { useState } from "react";
import {
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { styles, width } from "../utils/styles";
import { typography } from '../utils/typography'
import OTPComponent from "../components/OTPComponent";
import { useNavigation } from "@react-navigation/native";
import { PrimaryColor, WhiteColor } from "../utils/colors";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { verifyUserOTP } from "../actions/userActions";
import { spacing } from "../utils/spacing.styles";
import { ActivityIndicator } from "react-native-paper";

export default function OTPPage() {
  const navigation = useNavigation();
  const { mobile_number, message } = useSelector((state) => state.user);
  const [otp, setOtp] = useState(0);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  const verifyOTP = async () => {
    setLoading(true)
    const status = await dispatch(verifyUserOTP(mobile_number, otp));
    if (status === 200) {
      setLoading(false)
      navigation.navigate("Main");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/hero.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={{ marginVertical: 38, alignItems: "center" }}>
        <Text style={[styles.title, spacing.mt5, { textAlign: 'center' }]}>
          Please verify your mobile number
        </Text>
        <Text style={[typography.font16, spacing.mb4, { textAlign: 'center', flexWrap: 'wrap', maxWidth: '90%' }]}>A 6-digit {message}</Text>
      </View>

      <View style={[spacing.mh4, spacing.p2, { minHeight: 200 }]}>
        <Text
          style={{
            fontSize: 16,
            textTransform: "uppercase",
          }}
        >
          One time Password
        </Text>
        <OTPComponent digit={6} verifyOTP={(val) => setOtp(val)} />
        <PrimaryButton
          onClick={verifyOTP}
          style={{ width: width - 38, marginHorizontal: 0 }}
          title={
            loading ?
              <ActivityIndicator size="small" animating color={WhiteColor} /> :
              "Verify"}
        />
      </View>

      <View style={[spacing.mt4, { alignItems: "center" }]}>
        <Text style={[typography.font16]}>Didn't you receive any code?</Text>
        <TouchableOpacity onPress={() => alert("New code sent")}>
          <Text
            style={{ color: PrimaryColor, fontWeight: "bold", fontSize: 16 }}
          >
            Resend New Code
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
