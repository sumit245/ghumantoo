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
import { useDispatch,useSelector } from 'react-redux';
import { verifyUserOTP } from '../actions/userActions';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { spacing } from "../utils/spacing.styles";
import { ActivityIndicator } from "react-native-paper";

export default function OTPPage() {
  const { mobile_number, message } = useSelector((state) => state.user);
  const [otp, setOtp] = useState(""); // Initialize OTP as a string
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { signIn } = useAuth();
  const navigation = useNavigation();

  const verifyOTP = async () => {
    setLoading(true);
    try {
      const result = await dispatch(verifyUserOTP(mobile_number, otp));
      // result => { status, token, user }
      if (result && result.status === 200 && result.token) {
        // persist token + user (AuthContext will update redux as well)
        await signIn(result.token, result.user);
        // navigate to main/home screen
        navigation.replace('Main'); // adjust route name to your app
      } else {
        Alert.alert('Verification failed', 'Please check the OTP and try again.');
      }
    } catch (e) {
      Alert.alert('Error', 'OTP verification failed. Try again.');
      console.error(e);
    } finally {
      setLoading(false);
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
        <Text style={[typography.font16, spacing.mb4, { textAlign: 'center', flexWrap: 'wrap', maxWidth: '90%' }]}>
          A 6-digit {message}
        </Text>
      </View>

      <View style={[spacing.mh4, spacing.p2, { minHeight: 200 }]}>
        <Text style={{ fontSize: 16, textTransform: "uppercase", marginVertical: 8 }}>
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
