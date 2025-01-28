import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../utils/styles";
import { PrimaryColor, PureWhite, BlackColor } from "../utils/colors";
import ReferralCards from "../components/ReferralCards";
import { typography } from "../utils/typography";
import { spacing } from "../utils/spacing.styles";

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
        <Text
          style={[
            typography.font18,
            typography.textBold,
            { color: PureWhite, textAlign: "center" },
          ]}
        >
          Earn upto Rs 1000 by referring friends!
        </Text>

        <Text style={[{ color: PureWhite, textAlign: "center" }]}>
          Invite friends new to Ghumantoo and use the bonus for ticket
          discounts!
        </Text>

        <View
          style={[
            spacing.p1,
            spacing.br2,
            spacing.m1,
            spacing.ph3,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "white",
              width: "80%",
              alignSelf: "center",
            },
          ]}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={[
                typography.textBold,
                spacing.br1,
                spacing.ph2,
                spacing.bw1,
                {
                  color: BlackColor,
                  borderStyle: "dotted",
                  backgroundColor: "yellow",
                },
              ]}
            >
              redmyari
            </Text>

            <Text style={[typography.font14, { color: BlackColor }]}>
              Your referral code
            </Text>
          </View>

          <Text
            style={[
              spacing.br4,
              spacing.ph3,
              spacing.p1,
              {
                color: PureWhite,
                textAlign: "center",
                backgroundColor: PrimaryColor,
              },
            ]}
          >
            Copy
          </Text>
        </View>
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
          <Text
            style={[
              typography.font14,
              typography.textBold,
              {
                textAlign: "center",
                textTransform: "uppercase",
              },
            ]}
          >
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
          <Text
            style={[
              typography.font14,
              typography.textBold,
              {
                textAlign: "center",
                textTransform: "uppercase",
              },
            ]}
          >
            referral history
          </Text>
        </TouchableOpacity>
      </View>

      {tabIndex === 0 ? (
        <ReferralCards />
      ) : (
        <View>
          <View
            style={[
              spacing.p4,
              spacing.br3,
              spacing.m2,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: PureWhite,
                elevation: 1,
              },
            ]}
          >
            <Text style={[typography.font24, typography.textBold, {}]}>
              ₹ 00.00
            </Text>

            <Image
              source={{
                uri: "https://i.pinimg.com/736x/38/cd/39/38cd3989b25d6f19de68028266273ac4.jpg",
              }}
              style={[
                spacing.br4,
                {
                  width: 70,
                  height: 70,
                },
              ]}
              resizeMode="cover"
            />
          </View>

          <View>
            <Text
              style={[
                typography.font20,
                typography.textBold,
                spacing.p4,
                { textAlign: "center" },
              ]}
            >
              No referrals yet
            </Text>
            <Text
              style={[
                typography.font16,
                spacing.p2,
                {
                  textAlign: "center",
                },
              ]}
            >
              Refer your friends and start earning rewards today!
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.referBtn,
              {
                justifyContent: "center",
                alignItems: "center",
                marginTop: 90,
              },
            ]}
          >
            <Text style={[typography.font20, { color: PureWhite }]}>
              REFER NOW
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
