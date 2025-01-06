
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useState, useRef } from "react";
import LottieView from "lottie-react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../utils/styles";
import TicketComponent from "../components/TicketComponent";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    Traveldate: "05 January",
    Travelday: "Sunday",
    Transportname: "ShivGanga Travels 2/2 AC,Sleeper",
    Departuretime: "4:00 am",
    DepartureAddress: "Satna",
    TimeDuration: "1hr:15mins",
    ArrivalTime: "5:15 am",
    ArrivalAddress: "Rewa",
    TicketNo: "TN6Q18603433",
    PNR: "PNR64ZAJC6P",
    Fare: "₹ 100.00",
    BusProvider: "Satna Rewa Express",
    BusType: "A/C Seater(2x2)",
    PickUpPoint:
      "Satna Railway Station, Satna",
    DropPoint: "New Bus Stand, Rewa",
  },
];
export default function ConfirmationPage() {
  // Create a ref for the LottieView
  const confettiRef = useRef();
  return (
    <>
      <LottieView
        ref={confettiRef}
        source={require("../assets/confetti.json")}
        autoPlay={false}
        loop={false}
        style={styles.lottie}
        resizeMode="cover"
      />
      <View style={styles.container}>
        <View style={styles.checkDiv}>
          <Icon name="checkbox-marked-circle" size={30} style={styles.check} />
          <Text style={styles.confirmation}>Your booking is confirmed!</Text>
        </View>
        <View>
          <TicketComponent
            Traveldate={DATA[0].Traveldate}
            Travelday={DATA[0].Travelday}
            Transportname={DATA[0].Transportname}
            Departuretime={DATA[0].Departuretime}
            DepartureAddress={DATA[0].DepartureAddress}
            TimeDuration={DATA[0].TimeDuration}
            ArrivalTime={DATA[0].ArrivalTime}
            ArrivalAddress={DATA[0].ArrivalAddress}
            TicketNo={DATA[0].TicketNo}
            PNR={DATA[0].PNR}
            Fare={DATA[0].Fare}
            BusProvider={DATA[0].BusProvider}
            BusType={DATA[0].BusType}
            PickUpPoint={DATA[0].PickUpPoint}
            DropPoint={DATA[0].DropPoint}
          />
        </View>
      </View>
      <View style={styles.share}>
        <TouchableOpacity style={styles.down}>
          <Icon name="cancel" size={20} style={styles.end} />
          <Text style={styles.cancel}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.down}>
          <Icon name="share-variant" size={20} style={styles.end} />
          <Text style={styles.cancel}>SHARE</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
