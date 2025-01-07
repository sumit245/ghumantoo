import { useEffect, useState } from "react";
import {
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "../utils/styles";
import OTPComponent from "../components/OTPComponent";
import { useNavigation } from "@react-navigation/native";
import { PrimaryColor } from "../utils/colors";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { verifyUserOTP } from "../actions/userActions";

export default function OTPPage() {
  const navigation = useNavigation();
  const { mobile_number, message } = useSelector((state) => state.user);
  const [otp, setOtp] = useState(0)
  const dispatch = useDispatch()

  const verifyOTP = async () => {
    const status = await dispatch(verifyUserOTP(mobile_number, otp))
    if (status === 200) {
      navigation.navigate("Main")
    }
  }

  return (
    <SafeAreaView
      style={[styles.container, {
        paddingHorizontal: 0,
        marginHorizontal: 0,
        justifyContent: "space-between",
      },]}
    >
      <Image
        source={require("../assets/hero.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={{ marginVertical: 12, alignItems: "center" }}>
        <Text style={[styles.title, { marginTop: 60 }]}>Please Verify you Mobiler number</Text>
        <Text style={styles.labelStyle}>A 6-digit {message}</Text>
      </View>

      <View style={{ minHeight: 200, marginHorizontal: 8 }}>
        <Text style={{ letterSpacing: 1.2, fontSize: 16, marginLeft: 8, textTransform: 'uppercase' }}>One time Password</Text>
        <OTPComponent digit={6} verifyOTP={(val) => setOtp(val)} />
        <PrimaryButton
          onClick={verifyOTP}
          title="Verify"
        />
      </View>

      <View style={{ alignItems: "center", paddingBottom: 60 }}>
        <Text style={styles.labelStyle}>Didn't you receive any code?</Text>

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
