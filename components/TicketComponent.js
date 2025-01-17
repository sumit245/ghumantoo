import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles, width } from "../utils/styles";
import { Divider } from "react-native-paper";
import Ionicons from 'react-native-vector-icons/Ionicons'
import PrimaryButton from "./buttons/PrimaryButton";



export default function TicketComponent({
  Traveldate,
  Travelday,
  Departuretime,
  DepartureAddress,
  TimeDuration,
  ArrivalTime,
  ArrivalAddress,
  seats,
  passenger_name,
  PNR,
  Fare,
}) {
  return (
    <View style={styles.ticketCard}>
      <View style={styles.ticketCardHeader}>
        <Text style={styles.stdText}>{Traveldate}</Text>
        <Text style={styles.stdText}>{Travelday}</Text>
        <Divider style={styles.dividerInTicket} />
        <View style={[styles.row, { marginVertical: 12 }]}>
          <Text style={[styles.stdText, { fontSize: 20 }]}>{Departuretime}</Text>
          <Text style={[styles.stdText, { textDecorationLine: "underline", }]}>{TimeDuration}</Text>
          <Text style={[styles.stdText, { marginLeft: 10, fontSize: 20 }]}>{ArrivalTime}</Text>
        </View>
        <View style={[styles.row, { marginVertical: 12 }]}>
          <Text style={[styles.stdText, { fontSize: 14, maxWidth: width / 2.6, flexWrap: 'wrap' }]}>From: {DepartureAddress}</Text>
          <Text style={[styles.stdText, { fontSize: 14, maxWidth: width / 2.6, flexWrap: 'wrap' }]}>To: {ArrivalAddress}</Text>
        </View>
      </View>

      <View style={styles.cardDivider}>
        <View style={styles.circle} />
        <View style={styles.circle} />
      </View>

      <View style={styles.ticketCardFooter}>
        <View style={styles.row}>
          <Text> Seat(s)</Text>
          <Text style={styles.Fare}>{seats}- {passenger_name} </Text>
        </View>
        <Divider style={styles.dividerthin} />
        <View style={[styles.row, styles.external]}>
          <Text>PNR </Text>
          <Text style={styles.Fare}>{PNR}</Text>
        </View>
        <Divider style={styles.dividerthin} />
        <View style={[styles.row, styles.external]}>
          <Text>Total Fare :</Text>
          <Text style={styles.Fare}>{Fare}</Text>
        </View>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Ticket Details are sent to your whatsapp 😍</Text>
      </View>
    </View>
  );
}
