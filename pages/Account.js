import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { styles, width } from "../utils/styles";
import {
  AccentColor,
  DangerColor,
  DarkGray,
  LightGray,
  PrimaryColor,
  PureWhite,
} from "../utils/colors";
import Wallet from "./Wallet";
import Cards from "./Cards";
import ReferAndEarn from "./ReferAndEarn";

const DATA = [
  {
    id: "2",
    title: "Booking for women ",
    icon: "woman-outline",
  },
  {
    id: "3",
    title: "Wallet",
    icon: "wallet-outline",
    whereTo: "Wallet",
  },
  {
    id: "4",
    title: "Cards",
    icon: "card-outline",
    whereTo: "Cards",
  },

  {
    id: "7",
    title: "Refer & Earn",
    icon: "share-social-outline",
    whereTo: "ReferAndEarn",
  },

  {
    id: "8",
    title: "Offers",
    icon: "ticket-outline",
  },
  {
    id: "11",
    title: "About Us",
    icon: "information-circle-outline",
  },
  {
    id: "12",
    title: "Settings",
    icon: "settings-outline",
  },
];

const Item = ({ title, icon, onPress }) => (
  <TouchableOpacity
    style={[
      styles.row,
      {
        marginVertical: 0.8,
        padding: 8,
        backgroundColor: PureWhite,
        height: 63,
        alignItems: "center",
      },
    ]}
    onPress={onPress}
  >
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Icon name={icon} color={PrimaryColor} size={24} style={{ padding: 8 }} />
      <Text>{title}</Text>
    </View>
    <Icon name="chevron-forward" color={DarkGray} size={24} />
  </TouchableOpacity>
);

export default function Account() {
  const { email_id, mobile_number, name } = useSelector((state) => state.user);

  const navigation = useNavigation();
  return (
    <SafeAreaView style={[styles.container, { marginHorizontal: 0 }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.headerTitle}>
        <Text style={styles.headerTitleText}>My Account</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.row,
          {
            marginVertical: 8,
            padding: 8,
            backgroundColor: PureWhite,
            height: 100,
            alignItems: "center",
          },
        ]}
        onPress={() => navigation.navigate("editProfile")}
      >
        <View
          style={[
            styles.row,
            {
              marginVertical: 0.8,
              padding: 8,
              backgroundColor: PureWhite,
              alignItems: "center",
            },
          ]}
        >
          <Icon name="person-circle-outline" size={48} color={PrimaryColor} />
          <View>
            <Text style={styles.labelStyle}>{name}</Text>
            <Text style={styles.labelStyle}>{mobile_number}</Text>
            <Text style={styles.labelStyle}>{email_id}</Text>
          </View>
        </View>
        <Icon name="chevron-forward" size={32} color={DarkGray} />
      </TouchableOpacity>

      {DATA.map((item) => (
        <Item
          key={item.id}
          title={item.title}
          icon={item.icon}
          onPress={() => navigation.navigate(item.whereTo)}
        />
      ))}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          marginTop:15
        }}
      >
        <Icon
          name="power"
          color={DangerColor}
          size={32}
          style={{ padding: 4 }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: DarkGray,
            padding: 4,
          }}
        >
          Log out
        </Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
