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
          <Text style={styles.separator}>—</Text>
          <Text style={styles.time}>{bus.seats[0]?.seat} seats</Text>
        </View>
      </View>

      <View style={styles.priceRatingRow}>
        <View>
          <Text style={styles.priceSubText}>₹{bus.price}</Text>
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
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 12,
    padding: 16,
    elevation: 3,
  },
  vehicleInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  vehicleNumber: {
    fontWeight: "bold",
    backgroundColor: "#FFD700",
    paddingHorizontal: 4,
    borderRadius: 4,
    // paddingVertical: 2,
  },
  busStand: {
    fontSize: 14,
    backgroundColor: "pink",
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  timing: {
    flexDirection: "row",
    alignItems: "center",
  },
  departureTime: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  separator: {
    marginHorizontal: 4,
    fontSize: 16,
    color: "#000",
  },
  arrivalTime: {
    fontSize: 16,
    color: "#000",
  },
  time: {
    fontSize: 14,
    color: "#666",
  },
  priceRatingRow: {
    position: "relative",
  },
  priceSubText: {
    position: "absolute",
    bottom: 35,
    left: 240,
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  rating: {
    position: "absolute",
    top: 15,
    left: 260,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFD700",
    // paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  ratingText: {
    marginLeft: 4,
    // fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },

  providerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  busType: {
    fontSize: 14,
    color: "#666",
  },
  offerContainer: {
    marginTop: 8,
  },
  facilityBox: {
    marginRight: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  offerText: {
    fontSize: 12,
    color: "#000",
    // fontWeight: "bold",
  },
});
