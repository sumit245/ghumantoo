import React, { useState } from "react";
import {
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Alert, // Using Alert for now, but a custom modal/toast is better for production
} from "react-native";
import { styles, width } from "../utils/styles";
import { typography } from '../utils/typography'
import OTPComponent from "../components/OTPComponent";
import { PrimaryColor, WhiteColor } from "../utils/colors";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { verifyUserOTP } from "../actions/userActions";
import { spacing } from "../utils/spacing.styles";
import { ActivityIndicator } from "react-native-paper";
import { useAuth } from "../context/AuthContext"; // 1. Import the useAuth hook

export default function OTPPage() {
  const { mobile_number, message } = useSelector((state) => state.user);
  const [otp, setOtp] = useState(""); // Initialize OTP as a string
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { signIn } = useAuth(); // 2. Get the signIn function from our context

  const verifyOTP = async () => {
    console.log("Verifying OTP:", otp);
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter a 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      // 3. The Redux action should return the user's token upon success
      const response = await dispatch(verifyUserOTP(mobile_number, otp));

      // Assuming the action returns an object like { status: 200, token: '...' }
      if (response && response.status === 200 && response.token) {
        // 4. Call signIn with the token. This updates the global state and
        // automatically navigates the user to the main app stack.
        await signIn(response.token);
      } else {
        // Handle cases where OTP is incorrect or API fails
        Alert.alert("Verification Failed", response.message || "The OTP entered is incorrect. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      Alert.alert("An Error Occurred", "Something went wrong. Please try again later.");
      setLoading(false);
    }
    // No need to set loading to false here if signIn is successful,
    // as the component will unmount and be replaced by the loading screen from AuthContext.
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
        <Text style={[typography.font16, spacing.mb4, { textAlign: 'center', flexWrap: 'wrap', maxWidth: '90%' }]}>
          A 6-digit {message}
        </Text>
      </View>

      <View style={[spacing.mh4, spacing.p2, { minHeight: 200 }]}>
        <Text style={{ fontSize: 16, textTransform: "uppercase",marginVertical: 8 }}>
          One time Password
        </Text>
        <OTPComponent digit={6} verifyOTP={(val) => setOtp(val)} />
        <PrimaryButton
          onClick={verifyOTP}
          style={{ width: width - 38, marginHorizontal: 0 }}
          title={
            loading ? (
              <ActivityIndicator size="small" animating color={WhiteColor} />
            ) : (
              "Verify"
            )
          }
        />
      </View>

      <View style={[spacing.mt4, { alignItems: "center" }]}>
        <Text style={[typography.font16]}>Didn't you receive any code?</Text>
        <TouchableOpacity onPress={() => Alert.alert("Resend Code", "A new code has been sent.")}>
          <Text style={{ color: PrimaryColor, fontWeight: "bold", fontSize: 16 }}>
            Resend New Code
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
