import React, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/MaterialCommunityIcons";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { WhiteColor, BlackColor, LightGray, DarkGray, PureWhite, White1Color, spacing, typography, layouts, SuccessColor } from "../../utils/styles";

/**
 * Calculates the discount based on the first available coupon.
 * @param {number} basePrice - The base price of the bus ticket.
 * @param {object} coupon - The first coupon object from activeCoupons.
 * @returns {object} An object containing newPrice, savedAmount, and discountText.
 */
const calculateDiscount = (basePrice, coupon) => {
  if (!coupon || !basePrice) {
    return { newPrice: basePrice, savedAmount: 0 };
  }

  let savedAmount = 0;

  if (coupon.discount_type === "fixed") {
    savedAmount = coupon.coupon_value;
  } else if (coupon.discount_type === "percentage") {
    savedAmount = (basePrice * coupon.coupon_value) / 100;
  }

  const newPrice = basePrice - savedAmount;

  return { newPrice: Math.max(0, newPrice), savedAmount };
};

const BusCard = ({ bus, onClick }) => {
  const { activeCoupons } = useSelector((state) => state.bus);
  const firstCoupon = activeCoupons?.[0];

  return (
    <TouchableOpacity onPress={() => onClick(bus)} style={[spacing.p4, spacing.mv3, spacing.mh1, { backgroundColor: PureWhite, borderRadius: 16, elevation: 1 }]}>
      {/* Header */}
      <View style={[layouts.rowBetween, { alignItems: "flex-start" }]}>
        <View style={[spacing.mr2, { flex: 1 }]}>
          <Text style={[typography.font16, typography.textBold, { flexWrap: "wrap", color: BlackColor }]}>{bus.TravelName}</Text>
          <Text style={[typography.font14, { color: DarkGray }]}>{bus.FullBusName || bus.BusType}</Text>
        </View>
        <View style={{ alignItems: "flex-end", minWidth: "30%" }}>
          <View style={[layouts.rowCenter, spacing.ph1, spacing.pv05, { backgroundColor: "#f5a623", borderRadius: 4 }]}>
            <Icon name="star" size={14} color={WhiteColor} />
            <Text style={[typography.font12, { color: WhiteColor, marginLeft: 4 }]}>4.5</Text>
          </View>
          <View style={[layouts.rowCenter, spacing.mt1]}>
            <FontAwesome name="account-group-outline" size={18} />
            <Text style={[spacing.ml1, { color: BlackColor }]}>1.5k</Text>
          </View>
        </View>
      </View>

      {/* Time and Duration */}
      <View style={[layouts.rowCenter, { justifyContent: "flex-start", marginTop: 16 }]}>
        <Text style={[typography.font14, { fontWeight: "600", color: BlackColor }]}>{dayjs(bus.DepartureTime).format("h:mmA")}</Text>
        <View style={[spacing.mh2, spacing.ph2, spacing.pv05, { backgroundColor: LightGray, borderRadius: 12 }]}>
          <Text style={[typography.font12, { color: DarkGray }]}>
            {`${Math.floor(
              dayjs(bus.ArrivalTime).diff(dayjs(bus.DepartureTime)) / (1000 * 60 * 60)
            )}h:${Math.floor(
              (dayjs(bus.ArrivalTime).diff(dayjs(bus.DepartureTime)) % (1000 * 60 * 60)) /
              (1000 * 60)
            )}m`}
          </Text>
        </View>
        <Text style={[typography.font14, { fontWeight: "600", color: BlackColor }]}>{dayjs(bus.ArrivalTime).format("h:mmA")}</Text>
      </View>

      {/* Seats and Price */}
      <View style={[layouts.rowBetween, spacing.mt3]}>
        <View style={layouts.rowCenter}>
          <FontAwesome name="seat-passenger" size={20} color={SuccessColor} />
          <Text style={[typography.font14, { color: SuccessColor, marginLeft: 2, fontWeight: "600" }]}>{bus.AvailableSeats} Seats</Text>
        </View>
        {useMemo(() => {
          const basePrice = parseFloat(bus.BusPrice?.BasePrice);
          const { newPrice, savedAmount } = calculateDiscount(basePrice, firstCoupon);

          return (
            <View style={{ alignItems: "flex-end" }}>
              {savedAmount > 0 && (
                <View style={layouts.rowCenter}>
                  <Text style={[spacing.mh1, spacing.ph1, spacing.pv05, { backgroundColor: "rgba(80, 216, 80, 0.1)", color: "#046404", fontWeight: "500", fontSize: 10, borderRadius: 2, alignSelf: "flex-start" }]}>Save ₹{Math.round(savedAmount)}</Text>
                  <Text style={[typography.font12, { textAlign: "right", textDecorationLine: "line-through", color: DarkGray }]}>₹{basePrice.toLocaleString()}</Text>
                </View>
              )}
              <Text style={[typography.font14, typography.textBold, { color: BlackColor }]}>From ₹{newPrice.toLocaleString()}</Text>
            </View>
          );
        }, [bus.BusPrice?.BasePrice, firstCoupon])}
      </View>

      {/* Discount Banner */}
      {useMemo(() => {
        const coupon = firstCoupon;
        if (!coupon) return null;
        return (
          <View style={[layouts.rowCenter, spacing.p2, spacing.mt3, { backgroundColor: "#f3e5f5", borderRadius: 6 }]}>
            <FontAwesome name="tag-heart" size={14} color="#9c27b0" />
            <Text style={[typography.font12, { color: "#9c27b0", marginLeft: 6, flexShrink: 1 }]}>
              {coupon.coupon_value
                ? `Get ${coupon.coupon_value}% off with code ${coupon.coupon_code}!`
                : null}
            </Text>
          </View>
        );
      }, [firstCoupon])}
    </TouchableOpacity>
  );
};

export default BusCard;
