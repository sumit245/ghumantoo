import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

function getBlueShade(index) {
  const blueShades = ["#87CEEB", "pink", "#5F9EA0", "#00BFFF", "#1E90FF"];
  return blueShades[index % blueShades.length];
}

export default function BusCard({ bus, onClick }) {
  return (
    <TouchableOpacity onPress={onClick} style={styles.card}>
      <View style={styles.vehicleInfo}>
        <Text style={styles.vehicleNumber}>{bus.vehicle}</Text>
        <Text style={styles.busStand}>{bus.origin}</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.timing}>
          <Text style={styles.departureTime}>{bus.start_from}</Text>
          <Text style={styles.separator}>—</Text>
          <Text style={styles.arrivalTime}>{bus.end_at}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.timing}>
          <Text style={styles.time}>{bus.time}</Text>
          <Text style={styles.separato}></Text>
          <Text style={styles.time}>{bus.seats[0]?.seat} seats</Text>
        </View>
      </View>

      <View style={[styles.row, styles.priceRatingRow]}>
        <View>
          <Text style={styles.priceSubText}>From ₹ {bus.price}</Text>
        </View>
        <View style={styles.rating}>
          <Icon name="star" size={12} color="#ffffff" />
          <Text style={styles.ratingText}>
            {parseFloat(bus.ratings).toFixed(1)}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <View>
          <Text style={styles.providerName}>{bus.name}</Text>
          <Text style={styles.busType}>
            {bus.busType}, {bus.seat_layout}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.offerContainer,
          { flexDirection: "row", flexWrap: "nowrap" },
        ]}
      >
        {bus.facilities.map((facility, index) => (
          <View
            key={index}
            style={[
              styles.facilityBox,
              { backgroundColor: getBlueShade(index) },
            ]}
          >
            <Text style={styles.offerText}>{facility}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: "#000",
    paddingHorizontal: 16,
    elevation: 3,
  },
  vehicleInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  vehicleNumber: {
    backgroundColor: "#FFC107",
    color: "#000",
    fontWeight: "bold",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
    fontSize: 12,
  },
  busStand: {
    color: "#000",
    backgroundColor: "pink",
    fontSize: 14,
    left: 60,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  timing: {
    flexDirection: "row",
    alignItems: "center",
  },
  departureTime: {
    fontSize: 18,
    fontWeight: "bold",
  },
  time: {
    fontSize: 14,
    color: "#8E8E8E",
    bottom: 8,
  },
  separator: {
    marginHorizontal: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  separato: {
    marginHorizontal: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    bottom: 8,
  },
  arrivalTime: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seatInfo: {
    color: "#8E8E8E",
    fontSize: 14,
  },
  highlightText: {
    color: "#D35400",
    fontWeight: "bold",
  },
  priceRatingRow: {
    marginVertical: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
  },
  strikeThrough: {
    textDecorationLine: "line-through",
    color: "#8E8E8E",
  },
  priceSubText: {
    fontSize: 16,
    position: "absolute",
    bottom: 36,
    fontWeight: "bold",
    left: 200,
    color: "black",
  },
  rating: {
    backgroundColor: "#FFC107",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "bold",
  },
  providerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    bottom: 46,
  },
  busType: {
    fontSize: 14,
    color: "#8E8E8E",
    bottom: 40,
  },

  offerContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    overflow: "scroll",
  },
  facilityBox: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  offerText: {
    color: "#000",
    fontSize: 14,
  },
});
