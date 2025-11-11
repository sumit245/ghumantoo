import React, { useState } from "react";
import { View, Text, Image, SafeAreaView, ActivityIndicator, TouchableOpacity } from "react-native";
import { styles, width, DangerColor, PureWhite, WhiteColor } from "../utils/styles";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { useDispatch } from "react-redux";
import { authFromMobile } from "../actions/userActions";
import GPhoneInput from "../components/GPhoneInput";
import TermsAndConditions from "../components/tnc/TermsAndConditions";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { skipForNow } = useAuth();

  const sendOTP = async () => {
    setLoading(true)
    if (phoneNumber.length !== 13) {
      setError(true)
      return
    }
    const actualNumber = phoneNumber.slice(3); // Removes "+91"
    await dispatch(authFromMobile(actualNumber));
    setLoading(false)
    navigation.navigate("verification");
  };

  const handleSkip = async () => {
    setLoading(true);
    await skipForNow();
    setLoading(false);
    navigation.navigate("Main", { screen: "Home" });
  }
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
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 8, marginBottom: 16, color: '#17171f' }}>Create Account or Sign in</Text>
        <GPhoneInput onChangeText={setPhoneNumber} />
        {
          error && <Text style={{ fontSize: 12, color: DangerColor, textAlign: 'left', width: width - 60, marginBottom: 12 }}>Please enter a valid phone number</Text>
        }
        <PrimaryButton
          style={{ width: width - 38 }}
          onClick={sendOTP}
          title={
            loading ?
              <ActivityIndicator size="small" animating color={WhiteColor} /> :
              "Send OTP"}
        />
      </View>
      <View style={styles.bottomContainer}>
        <TermsAndConditions text="By logging in, you agree to our " />
      </View>
    </SafeAreaView>
  );
}
