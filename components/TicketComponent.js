import { View, Text } from "react-native";
import React from "react";
import { styles, width } from "../utils/styles";
import { Divider } from "react-native-paper";
import { spacing } from "../utils/spacing.styles";
import { typography } from "../utils/typography";

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
        <Divider style={[spacing.mv2]} />
        <View style={[styles.row, spacing.mv2]}>
          <Text style={[styles.stdText, typography.font20]}>
            {Departuretime}
          </Text>
          <Text style={[styles.stdText, { textDecorationLine: "underline" }]}>
            {TimeDuration}
          </Text>
          <Text style={[styles.stdText, { marginLeft: 10, fontSize: 20 }]}>
            {ArrivalTime}
          </Text>
        </View>
        <View style={[styles.row, { marginVertical: 12 }]}>
          <Text
            style={[
              styles.stdText,
              { fontSize: 14, maxWidth: width / 2.6, flexWrap: "wrap" },
            ]}
          >
            From: {DepartureAddress}
          </Text>
          <Text
            style={[
              styles.stdText,
              { fontSize: 14, maxWidth: width / 2.6, flexWrap: "wrap" },
            ]}
          >
            To: {ArrivalAddress}
          </Text>
        </View>
      </View>

      <View style={styles.cardDivider}>
        <View style={styles.circle} />
        <View style={styles.circle} />
      </View>

      <View style={styles.ticketCardFooter}>
        <View style={styles.row}>
          <Text> Seat(s)</Text>

          <Text>
            {seats} - {passenger_name}{" "}
          </Text>
        </View>
        <Divider />
        <View style={[styles.row]}>
          <Text>PNR </Text>
          <Text>{PNR}</Text>
        </View>
        <Divider />
        <View style={[styles.row]}>
          <Text>Total Fare :</Text>
          <Text>{Fare}</Text>
        </View>
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Ticket Details are sent to your whatsapp 😍
        </Text>
      </View>
    </View>
  );
}
