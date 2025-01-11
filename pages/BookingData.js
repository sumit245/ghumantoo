import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import dayjs from "dayjs";

export default function BookingData({ navContinue }) {
  const navigation = useNavigation();
  const { date_of_journey, selectedBus, selectedSeats } = useSelector(
    (state) => state.bus
  );
  const user = useSelector((state) => state.user);
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Pay ₹ </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Review booking</Text>
        <Text style={styles.seatInfo}>{selectedSeats.length} Seat</Text>
      </View>

      <View style={styles.details}>
        {/* <Text style={styles.travelCompany}>Satna bus stand</Text> */}

        <View style={styles.row}>
          <View>
            <Text style={styles.time}>
              {dayjs(date_of_journey).format("ddd,D MMM")} ·{" "}
              {selectedBus.start_time}
            </Text>
            <Text style={styles.location}>{selectedBus.originLocation},</Text>
            <Text style={styles.right}>{selectedBus.originCity}</Text>
          </View>
          <View>
            <Text style={styles.time}>
              {dayjs(date_of_journey).format("ddd,D MMM")} ·{" "}
              {selectedBus.end_time}
            </Text>
            <Text style={styles.location}>
              {selectedBus.destinationLocation},
            </Text>
            <Text style={styles.right}>{selectedBus.destinationCity}</Text>
          </View>
        </View>

        <Text style={styles.ticketLabel}>Your ticket will be sent to</Text>
        <Text style={styles.ticketNumber}>+91</Text>

        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>
            Name and gender is not required. Mobile number is sufficient to make
            a booking on this bus.
          </Text>
        </View>
      </View>

      <View style={styles.dealContainer}>
        <Text style={styles.dealText}>Exclusive deal applied </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <Icon name="lock" size={24} color="#555" />
          <Text style={styles.iconText}>Secure Payment</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="credit-card-alt" size={24} color="#555" />
          <Text style={styles.iconText}>Superfast Refunds</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="thumbs-up" size={24} color="#555" />
          <Text style={styles.iconText}>Trusted by 10K+ users</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // navigation.navigate(BookingData);
            navigation.navigate(navContinue);
          }}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  headerTime: {
    fontSize: 14,
    color: "#FF9500",
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  seatInfo: {
    fontSize: 14,
    color: "#777",
  },
  details: {
    padding: 16,
  },

  travelCompany: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 8,
    textAlign: "center",
    bottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    width: "100%",
  },

  time: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  location: {
    fontSize: 14,
    color: "#777",
  },
  ticketLabel: {
    fontSize: 14,
    color: "#000",
    marginTop: 16,
  },

  ticketNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  noteContainer: {
    backgroundColor: "pink",
    padding: 12,
    marginTop: 16,
    borderRadius: 10,
  },
  noteText: {
    fontSize: 12,
    color: "#000",
  },
  dealContainer: {
    backgroundColor: "lightcyan",
    padding: 12,
    alignItems: "center",
    marginHorizontal: 18,
    borderRadius: 10,
  },
  dealText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  iconContainer: {
    alignItems: "center",
  },
  icon: {
    fontSize: 24,
  },
  iconText: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
  },
  buttonContainer: {
    alignItems: "center",
    marginVertical: 50,
  },
  button: {
    backgroundColor: "#cf413a",
    paddingVertical: 10,
    width: "95%",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
