import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { DangerColor, PrimaryColor, WhiteColor, BlackColor, LightGray, spacing, typography, layouts, PureWhite, GrayBackground } from "../utils/styles";
import { RadioButton } from "react-native-paper";
import Header from "../components/customs/Header";
import dayjs from "dayjs";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { usePassengerBooking } from "../hooks/usePassengerBooking";

/**
 * PassengerData Screen (Presentational Component)
 * 
 * Displays passenger information form and booking details.
 * All business logic extracted to usePassengerBooking custom hook.
 */

const PassengerData = () => {
  // Extract all state and methods from custom hook
  const {
    phone,
    name,
    gender,
    address,
    age,
    loading,
    originCity,
    destinationCity,
    date_of_journey,
    departureTime,
    selectedBus,
    selectedSeats,
    priceToPay,
    boardingPoint,
    droppingPoint,
    formattedTimes,
    setGender,
    setAddress,
    handleNameChange,
    handleAgeChange,
    handlePhoneChange,
    handleTicketBooking,
  } = usePassengerBooking();

  return (
    <SafeAreaView style={[layouts.container, { backgroundColor: GrayBackground }]}>
      <Header
        title={`${originCity} → ${destinationCity}`}
        subtitle={`${dayjs(date_of_journey).format('ddd DD MMM YYYY')}, ${dayjs(departureTime).format('hh:mm A') || ""} | ${selectedBus}`}
      />

      <ScrollView style={[layouts.container, spacing.ph4, spacing.pt4]}>
        {/* Travel Details Section */}
        <View style={[spacing.p3, spacing.mb4, { backgroundColor: PureWhite, borderRadius: 8 }]}>

          <View style={[layouts.rowBetween]}>
            <View style={{ maxWidth: '48%' }}>
              <Text style={[typography.font14, typography.textBold, { color: BlackColor }]}>
                {formattedTimes.departureDate} · {formattedTimes.departureTime}
              </Text>
              <Text style={[typography.font12, { flexWrap: "wrap", color: LightGray }]}>
                {boardingPoint?.CityPointName || ""},{boardingPoint?.CityPointAddress || ""}
              </Text>
            </View>
            <View style={{ maxWidth: '48%' }}>
              <Text style={[typography.font14, typography.textBold, { color: BlackColor }]}>
                {formattedTimes.arrivalDate} {formattedTimes.arrivalTime}
              </Text>
              <Text style={[typography.font12, { flexWrap: "wrap", color: LightGray }]}>
                {droppingPoint?.CityPointName || ""}, {droppingPoint?.CityPointLocation || ""},
              </Text>
            </View>
          </View>

          <View style={[layouts.rowBetween, spacing.mt2]}>
            {selectedSeats.map((seat, index) => (
              <Text
                key={index}
                style={[spacing.p1, spacing.m1, { borderRadius: 4, color: WhiteColor, backgroundColor: "#f28b82" }]}
              >
                {seat.seat_id},{String(seat.category).toLocaleUpperCase()} {"\n"}
                {seat.price > 0 ? `₹${parseFloat(seat.price).toFixed(2)}` : "Free"}
              </Text>
            ))}
            <Text style={[typography.font12, spacing.ph1, spacing.pv05, { color: BlackColor, backgroundColor: "pink", borderRadius: 4, alignSelf: "flex-start" }]}>
              <Icon name="seat-passenger" size={16} color={BlackColor} />
              {Array.isArray(selectedSeats) && selectedSeats.length} Seat(s)
            </Text>
          </View>
        </View>
        {/* Contact Details Section */}
        <View style={[spacing.p4, spacing.mb5, { backgroundColor: PureWhite, borderRadius: 8 }]}>
          <Text style={[typography.font18, typography.textBold, { color: BlackColor }]}>Contact Details</Text>
          <Text style={[typography.font12, { color: BlackColor }]}>Ticket details will be send to </Text>

          <View style={[spacing.mt5, spacing.mb1]}>
            <Text style={[typography.font16, spacing.mb1, { color: BlackColor }]}>Passenger Name
              <Text style={{ color: DangerColor }}>*</Text></Text>
            <TextInput
              style={[spacing.p2, spacing.bw1, spacing.br1, { borderColor: LightGray, fontSize: 14, color: BlackColor }]}
              placeholder="Passenger Name"
              onChangeText={handleNameChange}
              value={name}
            />
          </View>
          <View style={spacing.mv1}>
            <Text style={[typography.font16, spacing.mb1, { color: BlackColor }]}>Passenger Age
              <Text style={{ color: DangerColor }}>*</Text></Text>
            <TextInput
              style={[spacing.p2, spacing.bw1, spacing.br1, { borderColor: LightGray, fontSize: 14, color: BlackColor }]}
              placeholder="Passenger Age"
              keyboardType="numeric"
              onChangeText={handleAgeChange}
              value={age}
            />
          </View>

          <View style={spacing.mv1}>
            <Text style={[typography.font16, spacing.mb1, { color: BlackColor }]}>Phone Number
              <Text style={{ color: DangerColor }}>*</Text></Text>
            <View style={layouts.rowCenter}>
              <TextInput
                style={[spacing.p2, spacing.bw1, spacing.br1, spacing.mr2, { borderColor: "#CCC", fontSize: 14, color: BlackColor }]}
                placeholder="Country Code"
                defaultValue="+91 (IND)"
                editable={false}
              />
              <TextInput
                style={[spacing.p2, spacing.bw1, spacing.br1, { borderColor: "#CCC", fontSize: 14, color: BlackColor, flex: 1 }]}
                placeholder="Phone"
                keyboardType="numeric"
                maxLength={10}
                onChangeText={handlePhoneChange}
                value={phone}
              />
            </View>
          </View>
          <View style={spacing.mv1}>
            <Text style={[typography.font14, { color: BlackColor }]}>Gender</Text>
            <View style={[layouts.rowCenter, spacing.mb2]}>
              <View
                style={[
                  spacing.pl2,
                  spacing.bw1,
                  spacing.mt2,
                  spacing.br5,
                  layouts.rowBetween,
                  {
                    width: "48%",
                    borderColor: gender === "first" ? DangerColor : LightGray,
                  },
                ]}
              >
                <Text style={[typography.font14, { color: BlackColor }]}>Male</Text>
                <RadioButton
                  value="first"
                  status={gender === "first" ? "checked" : "unchecked"}
                  onPress={() => setGender("first")}
                  color={DangerColor}
                />
              </View>
              <View
                style={[
                  spacing.pl2,
                  spacing.bw1,
                  spacing.mt2,
                  spacing.br5,
                  spacing.p1,
                  layouts.rowBetween,
                  {
                    width: "48%",
                    borderColor: gender === "second" ? DangerColor : LightGray,
                  },
                ]}
              >
                <Text style={[typography.font14, { color: BlackColor }]}>Female</Text>
                <RadioButton
                  value="second"
                  status={gender === "second" ? "checked" : "unchecked"}
                  onPress={() => setGender("second")}
                  color={DangerColor}
                />
              </View>
            </View>
          </View>
          <View style={spacing.mv1}>
            <Text style={[typography.font16, spacing.mb1, { color: BlackColor }]}>Address
              <Text style={{ color: DangerColor }}>*</Text>
            </Text>
            <TextInput
              style={[spacing.p2, spacing.bw1, spacing.br1, { borderColor: LightGray, fontSize: 14, color: BlackColor, flex: 1, height: 80 }]}
              placeholder="Address"
              keyboardType="text"
              numberOfLines={4}
              multiline={true}
              maxLength={100}
              onChangeText={(text) => setAddress(text)}
            />
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={[layouts.rowCenter, spacing.p4, spacing.borderTop,{ backgroundColor: WhiteColor, }]}>
        {/* FIXME: The view only displays total fare but for a good user experience, we should display breakup of fare as subtotal, service charge, platform fee, taxes summed up to total fare. Visually I want an upward arrow on the right when we tap on it to show the breakup of fare by sliding up a view. */}
        <View style={{ flex: 1 }}>
          <Text style={[typography.font14, { color: LightGray }]}>Total Fare</Text>
          <Text style={[typography.font20, typography.textBold, { color: BlackColor }]}>₹{priceToPay}</Text>
        </View>

        <PrimaryButton
          onClick={handleTicketBooking}
          loading={loading}
          title="Proceed to Pay"
          style={{ flex: 1 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PassengerData;
