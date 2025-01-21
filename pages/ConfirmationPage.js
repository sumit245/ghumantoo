import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
} from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../utils/styles";
import TicketComponent from "../components/TicketComponent";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

export default function ConfirmationPage({ route, navigation }) {
  // Create a ref for the LottieView
  const {
    boarding_details,
    date_of_journey,
    destination_name,
    drop_off_details,
    passenger_name,
    pnr,
    seats,
    source_name,
  } = route.params?.details;
  const { selectedBus } = useSelector((state) => state.bus);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  useEffect(() => {
    const backhandler = BackHandler.addEventListener("hardwareBackPress", () =>
      navigation.navigate("Main")
    );
    return () => backhandler.remove();
  }, []);

  useEffect(() => {
    const { end_time, start_time, originCity, destinationCity } = selectedBus;
    console.log(selectedBus);
    setFrom(destinationCity);
    setTo(originCity);
    setDepartureTime(start_time);
    setArrivalTime(end_time);
  }, [selectedBus]);
  return (
    <SafeAreaView
      style={[styles.container, { justifyContent: "space-between" }]}
    >
      <View style={styles.checkDiv}>
        <Icon
          name="checkbox-marked-circle"
          size={30}
          style={{ color: "green" }}
        />
        <Text style={styles.confirmation}>
          Hey {passenger_name}, your booking from {from} to {to} is confirmed!
        </Text>
      </View>
      <TicketComponent
        Traveldate={dayjs(date_of_journey).format("DD-MMM-YYYY")}
        Travelday={dayjs(date_of_journey).format("ddd")}
        passenger_name={passenger_name}
        Departuretime={departureTime}
        DepartureAddress={boarding_details}
        // TimeDuration={"time_duration"}
        ArrivalTime={arrivalTime}
        ArrivalAddress={drop_off_details}
        PNR={pnr}
        Fare={100}
        seats={seats}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Main")}
        style={styles.buttonPrimary}
      >
        <Text style={styles.buttonTextPrimary}>Continue Booking</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
