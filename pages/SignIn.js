import React from "react";
import { View, Text, Image, SafeAreaView, TouchableOpacity } from "react-native";
import { styles, width, DangerColor, spacing } from "../utils/styles";
import PrimaryButton from "../components/buttons/PrimaryButton";
import GPhoneInput from "../components/GPhoneInput";
import TermsAndConditions from "../components/tnc/TermsAndConditions";
import { useSignIn } from "../hooks/useSignIn";

/**
 * SignIn Screen (Presentational Component)
 * 
 * Displays sign-in form with phone number input and OTP sending
 * All business logic is handled by useSignIn custom hook
 * 
 * Features:
 * - Phone number input with country code
 * - OTP sending
 * - Guest mode (skip for now)
 * - Form validation
 */
export default function SignIn() {
  // Extract state and methods from custom hook
  const {
    phoneNumber,
    error,
    loading,
    sendOTP,
    handleSkip,
    handlePhoneChange,
  } = useSignIn();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* Use this as container and place the skip for now button on top right corner on image */}
        <Image
          source={require("../assets/hero.png")}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.phone}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 8, marginBottom: 16, color: '#17171f' }}>
          Create Account or Sign in
        </Text>

        <GPhoneInput onChangeText={handlePhoneChange} />

        {error && (
          <Text style={{ fontSize: 12, color: DangerColor, textAlign: 'left', width: width - 60, marginBottom: 12 }}>
            Please enter a valid phone number
          </Text>
        )}
        <PrimaryButton style={[{ width: width - 38 }, spacing.mt4]} onClick={sendOTP} loading={loading} title="Send OTP" />
      </View>
      <View style={styles.bottomContainer}>
        <TermsAndConditions text="By logging in, you agree to our " />
      </View>
    </SafeAreaView>
  );
}
