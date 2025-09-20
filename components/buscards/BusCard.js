import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/MaterialCommunityIcons";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

/**
 * Calculates the discount based on the first available coupon.
 * @param {number} basePrice - The base price of the bus ticket.
 * @param {object} coupon - The first coupon object from activeCoupons.
 * @returns {object} An object containing newPrice, savedAmount, and discountText.
 */
const calculateDiscount = (basePrice, coupon) => {
  if (!coupon || !basePrice) {
    return { newPrice: basePrice, savedAmount: 0, discountText: null };
  }

  let savedAmount = 0;
  let discountText = '';

  if (coupon.discount_type === 'fixed') {
    savedAmount = coupon.coupon_value;
    discountText = `Save ₹${coupon.coupon_value} with code ${coupon.coupon_code}!`;
  } else if (coupon.discount_type === 'percentage') {
    savedAmount = (basePrice * coupon.coupon_value) / 100;
    discountText = `Get ${coupon.coupon_value}% off with code ${coupon.coupon_code}!`;
  }

  const newPrice = basePrice - savedAmount;

  return { newPrice: Math.max(0, newPrice), savedAmount, discountText };
};

const BusCard = ({ bus, onClick }) => {
  const { activeCoupons } = useSelector(state => state.bus);
  const firstCoupon = activeCoupons?.[0];

  return (
    <TouchableOpacity onPress={onClick} style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.travelInfo}>
          <Text style={styles.title}>{bus.TravelName}</Text>
          <Text style={styles.subtitle}>{bus.BusType}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <View style={styles.ratingBox}>
            <Icon name="star" size={14} color="#fff" />
            <Text style={styles.ratingText}>4.5</Text>
          </View>
          <View style={styles.passengerCount}>
            <FontAwesome name="account-group-outline" size={18} />
            <Text style={{ marginLeft: 4 }}>1.5k</Text>
          </View>
        </View>
      </View>

      {/* Time and Duration */}
      <View style={styles.timeRow}>
        <Text style={styles.time}>{dayjs(bus.DepartureTime).format("h:mmA")}</Text>
        <View style={styles.durationBox}>
          <Text style={styles.durationText}>
            {`${Math.floor(dayjs(bus.ArrivalTime).diff(dayjs(bus.DepartureTime)) / (1000 * 60 * 60))}h:${Math.floor((dayjs(bus.ArrivalTime).diff(dayjs(bus.DepartureTime)) % (1000 * 60 * 60)) / (1000 * 60))
              }m`}
          </Text>
        </View>
        <Text style={styles.time}>{dayjs(bus.ArrivalTime).format("h:mmA")}</Text>
      </View>

      {/* Seats and Price */}
      <View style={styles.seatPriceRow}>
        <View style={styles.seatsInfo}>
          <FontAwesome name="seat-passenger" size={20} color="green" />
          <Text style={styles.seatsText}>{bus.AvailableSeats} Seats</Text>
        </View>
        {useMemo(() => {
          const basePrice = parseFloat(bus.BusPrice?.BasePrice);
          const { newPrice, savedAmount } = calculateDiscount(basePrice, firstCoupon);

          return (
            <View style={styles.priceInfo}>
              {savedAmount > 0 && (
                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                  <Text style={styles.saveText}>Save ₹{Math.round(savedAmount)}</Text>
                  <Text style={styles.oldPrice}>₹{basePrice.toFixed(0)}</Text>
                </View>
              )}
              <Text style={styles.newPrice}>From ₹{newPrice.toFixed(0)}</Text>
            </View>
          );
        }, [bus.BusPrice?.BasePrice, firstCoupon])}
      </View>

      {/* Advance Booking */}
      <View style={styles.couponContainer}>
        {/* Left Cutout */}
        <View style={styles.cutoutLeft} />

        {/* Center Coupon Content */}
        <View style={styles.advanceBooking}>
          <Text style={styles.advanceText}>

            Advance Booking: ₹65 off per seat!
          </Text>
        </View>
        {/* Right Cutout */}
        <View style={styles.cutoutRight} />
      </View>


      {/* Discount Banner */}
      {useMemo(() => {
        const { discountText } = calculateDiscount(bus.BusPrice?.BasePrice, firstCoupon);
        if (!discountText) return null;
        return (
          <View style={styles.discountRow}>
            <FontAwesome name="tag-heart" size={14} color="purple" />
            <Text style={styles.discountText}>{discountText}</Text>
          </View>
        );
      }, [bus.BusPrice?.BasePrice, firstCoupon])}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    marginHorizontal: 6,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start", // Align items to the top
  },
  travelInfo: {
    flex: 1, // Allow this view to grow
    marginRight: 8, // Add some space between the text and rating
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    flexWrap: 'wrap', // Allows text to wrap to the next line
  },
  subtitle: {
    color: "#666",
  },
  ratingContainer: {
    alignItems: "flex-end",
    minWidth: '30%', // Ensure rating container has at least 30% of the width
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5a623",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ratingText: {
    color: "#fff",
    marginLeft: 4,
    fontSize: 12,
  },
  passengerCount: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 16,
  },
  time: {
    fontSize: 14,
    fontWeight: "600",
  },
  durationBox: {
    marginHorizontal: 8,
    backgroundColor: "#eee",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  durationText: {
    fontSize: 12,
    color: "#555",
  },
  seatPriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  seatsInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  seatsText: {
    fontSize: 14,
    color: "green",
    marginLeft: 2,
    fontWeight: "600",
  },
  priceInfo: {
    alignItems: "flex-end",
  },
  saveText: {
    backgroundColor: "rgba(80, 216, 80, 0.1)", // faded green (light & transparent)
    color: "#046404", // dark green text
    fontWeight: "500",
    fontSize: 10,
    marginHorizontal: 2,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 2,
    alignSelf: "flex-start", // to avoid full width
  },
  oldPrice: {
    textDecorationLine: "line-through",
    fontSize: 12,
    color: "#999",
  },
  newPrice: {
    fontSize: 14,
    fontWeight: "bold",
  },
  couponContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: 'flex-end'
  },
  cutoutLeft: {
    position: "absolute",
    left: 0,
    top: 8,
    width: 0,
    height: 0,
    borderTopWidth: 14,
    borderBottomWidth: 14,
    borderRightWidth: 8,
    backgroundColor: "transparent",
    zIndex: 100,
    borderTopColor: "transparent",
    borderBottomColor: 'transparent',
    borderRightColor: "#fff", // match coupon background
    transform: [{ rotate: '180deg' }] // 2D flip
  },
  cutoutRight: {
    position: "absolute",
    right: 0,
    top: 8,
    width: 0,
    height: 0,
    borderTopWidth: 14,
    borderBottomWidth: 14,
    borderLeftWidth: 8,
    backgroundColor: "transparent",
    zIndex: 100,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "#fff", // match coupon background
    transform: [{ rotate: '-180deg' }] // 2D flip
  },
  advanceBooking: {
    backgroundColor: "#FFE9B9",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  advanceText: {
    fontSize: 10,
    color: "#D16B21",
  },
  discountRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3e5f5",
    padding: 10,
    marginTop: 10,
    borderRadius: 6,
  },
  discountText: {
    color: "purple",
    marginLeft: 6,
    fontSize: 12,
    flexShrink: 1,
  },
  footer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  busDetailsBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  busDetailsText: {
    marginLeft: 4,
    color: "#0a75c2",
    fontWeight: "500",
  },
});

export default BusCard;
