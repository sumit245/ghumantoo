import React from "react";
import {
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { styles, width, typography, spacing } from "../utils/styles";
import OTPComponent from "../components/OTPComponent";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { useOTPVerification } from "../hooks/useOTPVerification";

/**
 * OTP Verification Screen (Presentational Component)
 * 
 * Displays OTP input form for phone number verification
 * All business logic is handled by useOTPVerification custom hook
 * 
 * Features:
 * - 6-digit OTP input
 * - OTP verification with backend
 * - Resend OTP functionality
 * - Auto-navigation on success
 */
export default function OTPPage() {
  // Extract state and methods from custom hook
  const {
    otp,
    loading,
    mobile_number,
    message,
    verifyOTP,
    resendOTP,
    handleOTPChange,
  } = useOTPVerification();

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
        <Text style={[typography.font16, spacing.mb4, { textAlign: 'center', flexWrap: 'wrap', maxWidth: '90%', color: '#17171f' }]}>
          A 6-digit {message}
        </Text>
      </View>

      <View style={[spacing.mh4, spacing.p2, { minHeight: 200 }]}>
        <Text style={{ fontSize: 16, textTransform: "uppercase", marginVertical: 8, color: '#17171f' }}>
          One time Password
        </Text>
        <OTPComponent digit={6} verifyOTP={handleOTPChange} />
        <PrimaryButton
          onClick={verifyOTP}
          style={{ width: width - 38, marginHorizontal: 0 }}
          loading={loading}
          title="Verify"
        />
      </View>

      <View style={[spacing.mt4, { alignItems: "center" }]}>
        <Text style={[typography.font16, { color: '#17171f' }]}>
          Didn't you receive any code?
        </Text>
        <TouchableOpacity onPress={resendOTP}>
          <Text style={[typography.font16, typography.textBold, { color: '#f28b82' }]}>
            Resend New Code
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
