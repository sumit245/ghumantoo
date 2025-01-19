import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../utils/styles";
import { PrimaryColor } from "../utils/colors";
import ReferralCards from "../components/ReferralCards";

export default function ReferAndEarn() {
  const [tabIndex, setTabIndex] = useState(0);

  const toggleTabIndex = () => {
    setTabIndex((prevTabIndex) => (prevTabIndex === 0 ? 1 : 0));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://www.shoppre.com/img/refer-and-earn/refer-and-earn-shoppre-shipping.png",
          }}
          style={styles.iconImage}
        />
        <Text style={styles.headline}>
          Earn upto Rs 1000 by referring friends!
        </Text>
        <Text style={styles.subheading}>
          Invite friends who not tried Ghumantoo before, use the bonus to get
          discounts on tickets.
        </Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            styles.tab,
            {
              borderBottomColor: tabIndex === 0 ? PrimaryColor : "#ededed",
              borderBottomWidth: tabIndex === 0 ? 4 : 0,
            },
          ]}
          onPress={toggleTabIndex}
        >
          <Text style={[styles.tabLink, { fontSize: 15, fontWeight: "bold" }]}>
            refer and earn
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            {
              borderBottomColor: tabIndex === 1 ? PrimaryColor : "#ededed",
              borderBottomWidth: tabIndex === 1 ? 4 : 0,
            },
          ]}
          onPress={toggleTabIndex}
        >
          <Text style={[styles.tabLink, { fontSize: 15, fontWeight: "bold" }]}>
            referral history
          </Text>
        </TouchableOpacity>
      </View>

      {tabIndex === 0 ? (
        <ReferralCards />
      ) : (
        <View style={styles.noBookings}>
          <Text style={{ textAlign: "center" }}>
            You have no referral history
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}
