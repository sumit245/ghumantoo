import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { styles } from "../utils/styles";
import Icon from "react-native-vector-icons/Ionicons";
import { referral } from "./ReferralData";

export default function ReferralCards() {
  return (
    <ScrollView>
      <View style={[styles.container, { marginBottom: 12 }]}>
        {referral.map(({ heading, when, code, referToWhom }, index) => (
          <View style={styles.card1} key={index}>
            <View style={styles.row1}>
              <Image
                source={{
                  uri: "https://cdn.shopify.com/app-store/listing_images/9f4e3e81477167f5f583dc87e7d27f1d/icon/CPreiueSqfwCEAE=.png",
                }}
                style={[
                  styles.iconImage,
                  { alignSelf: "flex-start", marginLeft: 10 },
                ]}
              />
              <View>
                <Text style={styles.heading1}>{heading}</Text>
                <Text style={{ width: "60%", marginLeft: 10, marginTop: -10 }}>
                  {when}
                </Text>
              </View>
            </View>
            <View style={styles.referral}>
              <Text style={{ color: "red", fontWeight: "bold" }}>
                Your code: {code}
              </Text>
              <View style={[styles.row1]}>
                <Icon
                  name="copy-outline"
                  size={20}
                  color="dodgerblue"
                  style={{ marginRight: 2 }}
                />
                <Text style={{ color: "dodgerblue", fontWeight: "bold" }}>
                  COPY
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.referBtn}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {referToWhom}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={[styles.card1, { padding: 20, height: 300 }]}>
          <Text style={styles.heading}>How it works</Text>
          <View>
            <View
              style={[styles.row1, { alignItems: "center", marginVertical: 4 }]}
            >
              <Icon name="phone-portrait-outline" size={30} color="red" />
              <Text style={{ width: "80%", margin: 10 }}>
                Refer your friends to Ghumantoo by sharing your unique referral
                code with them
              </Text>
            </View>
            <View
              style={[styles.row1, { alignItems: "center", marginVertical: 4 }]}
            >
              <Icon name="star-sharp" size={30} color="green"></Icon>
              <Text style={{ width: "80%", margin: 10 }}>
                Your friend will earn reward when they sign up on Ghumantoo app
                using your referral code
              </Text>
            </View>
            <View
              style={[styles.row1, { alignItems: "center", marginVertical: 4 }]}
            >
              <Icon name="wallet-outline" size={30} color="pink" />
              <Text style={{ width: "80%", margin: 10 }}>
                You will get rewarded when your friends travel with Ghumantoo
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
