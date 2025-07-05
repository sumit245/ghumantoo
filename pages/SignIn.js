import React, { useState } from "react";
import { View, Text, Image, SafeAreaView } from "react-native";
import { styles, width } from "../utils/styles";
import { DangerColor, PureWhite, WhiteColor, } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { useDispatch } from "react-redux";
import { authFromMobile } from "../actions/userActions";
import GPhoneInput from "../components/GPhoneInput";
import TermsAndConditions from "../components/tnc/TermsAndConditions";
import { ActivityIndicator } from "react-native-paper";

export default function SignIn() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/hero.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.phone}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 8, marginBottom: 16 }}>Create Account or Sign in</Text>
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
