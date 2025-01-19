import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BookingData({ navContinue }) {
  const navigation = useNavigation();
  const { date_of_journey, selectedBus, selectedSeats } = useSelector(
    (state) => state.bus
  );
  const user = useSelector((state) => state.user);
  useEffect(() => {
    console.log(user);
  }, []);
  return null;
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
