import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles, width } from "../utils/styles";
import { Divider } from "react-native-paper";
import Ionicons from 'react-native-vector-icons/Ionicons'
import PrimaryButton from "./buttons/PrimaryButton";



export default function TicketComponent({
  Traveldate,
  Travelday,
  Transportname,
  Departuretime,
  DepartureAddress,
  TimeDuration,
  ArrivalTime,
  ArrivalAddress,
  TicketNo,
  PNR,
  Fare,
  PickUpPoint,
  DropPoint,
  BusProvider,
  BusType,
  Toggle
}) {
  return (
    TimeDuration !== 'cancel' ?
      <View style={styles.ticketCard}>
        <View style={styles.ticketCardHeader}>
          {/* <Text>{date}</Text> */}
          <View style={[styles.row]}>
            <Text style={styles.stdText}>{Traveldate}</Text>
            <Text style={styles.stdText}>{BusProvider}</Text>
          </View>
          <View style={[styles.row, { paddingBottom: -5 }]}>
            <Text style={styles.stdText}>{Travelday}</Text>
            <Text style={[styles.stdText, { marginBottom: 25 }]}>{BusType}</Text>
          </View>

          {/* <Text style={[styles.stdText, { marginLeft: 170, marginTop: -25, marginBottom: 25, }]}>{Transportname}</Text> */}
          <Divider style={styles.dividerInTicket} />

          <View style={styles.row}>
            <Text style={[styles.stdText, { fontSize: 20 }]}>{Departuretime}</Text>
            <Text style={[styles.stdText, { textDecorationLine: "underline", }]}>{TimeDuration}</Text>
            <Text style={[styles.stdText, { marginLeft: 10, fontSize: 20 }]}>{ArrivalTime}</Text>
          </View>

          <View style={[styles.row, { width: 170, justifyContent: 'space-between' }]}>
            <View style={{ marginRight: 18 }}>
              <Text style={[styles.stdText, { fontSize: 14, marginTop: 8 }]}>{DepartureAddress}</Text>
              <Text style={[styles.stdText, { fontWeight: 600, fontSize: 12 }]}>{PickUpPoint}</Text>
            </View>
            <View>
              <Text style={[styles.stdText, { fontSize: 14, marginTop: 8 }]}>{ArrivalAddress}</Text>
              <Text style={[styles.stdText, { fontWeight: 600, fontSize: 12 }]}>{DropPoint}</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardDivider}>
          <View style={styles.circle} />
          <View style={styles.circle} />
        </View>
        <View style={styles.ticketCardFooter}>
          <View style={styles.row}>
            <View>
              <Text> Seat No</Text>
            </View>
            <View>
              <Text style={styles.Fare}>C1 - Sumit Ranjan</Text>
            </View>
          </View>
          <Divider style={styles.dividerthin} />
          <View style={[styles.row, styles.external]}>
            <Text>Ticket No.</Text>
            <Text style={styles.TicketNo}>{TicketNo}</Text>
          </View>
          <Divider style={styles.dividerthin} />
          <View style={[styles.row, styles.external]}>
            <Text>Fare :</Text>
            <Text style={styles.Fare}>{Fare}</Text>
          </View>
        </View>
      </View>
      :
      <>
        <View style={{ flex: 1, backgroundColor: '#fff', height: 200, padding: 5, borderRadius: 15 }}>
          <View style={[styles.row, { borderBottomColor: 'lightgrey', borderBottomWidth: 1, padding: 2 }]}>
            <View style={{ paddingVertical: 20, }}>
              <Ionicons style={{ paddingLeft: 30 }} name='calendar-number' size={45} />
              <Text style={{ marginTop: 25, fontSize: 21 }}>{Traveldate}</Text>
            </View>

            <View style={{ width: 195, }}>
              <View style={[styles.row,]}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', opacity: .6 }}>Bus Ticket</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', opacity: .6 }}>Cancelled</Text>
              </View>

              <Text style={{ marginTop: 15, fontSize: 23 }}>{DepartureAddress}  -  {ArrivalAddress}</Text>
              <Text style={{ marginTop: 15, marginLeft: 30, fontSize: 18, opacity: .6 }}> {Transportname} </Text>
            </View>
          </View>
          <View>
            <Text style={{ padding: 15, fontSize: 19 }}>MAY 2024</Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.buttonPrimary, { backgroundColor: '#fff' }]} onPress={() => Toggle(0)} >

          <Text style={[styles.buttonTextPrimary, { color: '#555' }]}>Show Bookings</Text>
        </TouchableOpacity>
      </>
  );
}
