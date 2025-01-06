import { View, Text, Image } from "react-native";
import React from "react";
import { styles } from "../utils/styles";
import Icon from "react-native-vector-icons/Ionicons";

export default function Wallet() {
  return (
    <View style={{ backgroundColor: "lightgrey", flex: 1 }}>
      <View style={[styles.header, { height: 200 }]}></View>
      <View style={[styles.header2]}>
        <View style={styles.row1}>
          <Icon
            name="wallet"
            size={60}
            color="black"
            style={{ marginHorizontal: 10, marginVertical: 10, paddingTop: 10 }}
          />
          <Text style={{ color: "gray", marginTop: 25 }}>
            TOTAL WALLET BALANCE
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 23,
              marginLeft: 80,
              marginTop: -35,
            }}
          >
            Rs 0.00
          </Text>
          <View
            style={[
              styles.wallet,
              styles.row1,
              { justifyContent: "space-around" },
            ]}
          >
            <View
              style={{
                justifyContent: "center",
                borderRightWidth: 1,
                paddingRight: 18,
                marginLeft: 20,
              }}
            >
              <Text>Your Cash</Text>
              <Text style={{ fontWeight: "bold" }}>Rs 0.0</Text>
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text>Offer Cash</Text>
              <Text style={{ fontWeight: "bold" }}>Rs 0.0</Text>
            </View>
            <Icon
              name="information-circle-outline"
              size={25}
              style={{ justifyContent: "center" }}
            />
          </View>
          <View
            style={[
              styles.header2,
              { marginTop: 30, height: 150, marginHorizontal: -2 },
            ]}
          >
            <View style={styles.row1}>
              <Image
                source={{
                  uri: "https://dataisgood.com/wp-content/uploads/2022/10/RE-1024x535.png",
                }}
                style={{
                  height: 100,
                  width: 150,
                  marginHorizontal: 8,
                  marginVertical: 14,
                  borderRadius: 8,
                }}
              />
              <View>
                <Text style={{ fontWeight: "bold", padding: 10 }}>
                  Refer friends
                </Text>
                <Text style={{ width: "60%", marginLeft: 10, marginTop: -4 }}>
                  Refer friends and earn wallet money!
                </Text>
                <Text
                  style={{
                    color: "dodgerblue",
                    padding: 10,
                    fontWeight: "bold",
                  }}
                >
                  REFER NOW
                </Text>
              </View>
            </View>
          </View>
          <Text style={{ fontWeight: "bold", padding: 10 }}>
            RECENT ACTIVITY
          </Text>
        </View>
      </View>
    </View>
  );
}
