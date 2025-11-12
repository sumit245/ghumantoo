import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/MaterialCommunityIcons";
import { WhiteColor, BlackColor, DarkGray, PureWhite, spacing, typography, layouts, SuccessColor, White1Color } from "../../utils/styles";
import { useBusCard } from "../../hooks/useBusCard";

/**
 * BusCard Component (Presentational)
 * 
 * Displays bus information with pricing, timings, and offers.
 * All business logic extracted to useBusCard custom hook.
 */

const BusCard = ({ bus, onClick }) => {
  // Extract all computed values from custom hook
  const {
    basePrice,
    discountedPrice,
    savedAmount,
    departureTime,
    arrivalTime,
    duration,
    couponBanner,
    hasCoupon,
    availableSeats,
    busName,
    busType,
  } = useBusCard(bus);

  return (
    <TouchableOpacity onPress={() => onClick(bus)} style={[spacing.p4, spacing.m2, spacing.br2, { backgroundColor: PureWhite, elevation: 2 }]}>
      {/* Header */}
      <View style={[layouts.rowBetween, { alignItems: "flex-start" }]}>
        <View style={[spacing.mr2, { flex: 1 }]}>
          <Text style={[typography.font16, typography.textBold, { flexWrap: "wrap", color: BlackColor }]}>{busName}</Text>
          <Text style={[typography.font14, { color: DarkGray }]}>{busType}</Text>
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
        <Text style={[typography.font14, { fontWeight: "600", color: BlackColor }]}>{departureTime}</Text>
        <View style={[spacing.mh2, spacing.ph2, spacing.pv05, { backgroundColor: White1Color, borderRadius: 12 }]}>
          <Text style={[typography.font12, { color: BlackColor }]}>{duration}</Text>
        </View>
        <Text style={[typography.font14, { fontWeight: "600", color: BlackColor }]}>{arrivalTime}</Text>
      </View>

      {/* Seats and Price */}
      <View style={[layouts.rowBetween, spacing.mt3]}>
        <View style={layouts.rowCenter}>
          <FontAwesome name="seat-passenger" size={20} color={SuccessColor} />
          <Text style={[typography.font14, { color: SuccessColor, marginLeft: 2, fontWeight: "600" }]}>{availableSeats} Seats</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          {savedAmount > 0 && (
            <View style={layouts.rowCenter}>
              <Text style={[spacing.mh1, spacing.ph1, spacing.pv05, { backgroundColor: "rgba(80, 216, 80, 0.1)", color: "#046404", fontWeight: "500", fontSize: 10, borderRadius: 2, alignSelf: "flex-start" }]}>Save ₹{savedAmount}</Text>
              <Text style={[typography.font12, { textAlign: "right", textDecorationLine: "line-through", color: DarkGray }]}>₹{basePrice.toLocaleString()}</Text>
            </View>
          )}
          <Text style={[typography.font14, typography.textBold, { color: BlackColor }]}>From ₹{discountedPrice.toLocaleString()}</Text>
        </View>
      </View>

      {/* Discount Banner */}
      {hasCoupon && couponBanner && (
        <View style={[layouts.rowCenter, spacing.p2, spacing.mt3, { backgroundColor: "#f3e5f5", borderRadius: 6 }]}>
          <FontAwesome name="tag-heart" size={14} color="#9c27b0" />
          <Text style={[typography.font12, { color: "#9c27b0", marginLeft: 6, flexShrink: 1 }]}>
            {couponBanner.text}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default BusCard;
