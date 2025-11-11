import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
// Razorpay is pre-loaded in App.js, but we import it here for type checking
// The native module is already initialized, so this import is instant
import RazorpayCheckout from "react-native-razorpay";
import { DangerColor, PrimaryColor, White1Color, WhiteColor, BlackColor, LightGray, spacing, typography, layouts, PureWhite } from "../utils/styles";
import { RAZORPAY_KEY_ID } from "../utils/constants";
import { blockSeat, confirmTicket } from "../actions/busActions";
import { RadioButton } from "react-native-paper";

const PassengerData = () => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [checked, setChecked] = useState("first");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [age, setAge] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const { boardingPoint, droppingPoint } = route.params;
  const {
    SearchTokenId,
    originCity,
    destinationCity,
    date_of_journey,
    departureTime,
    arrivalTime,
    selectedBus = "Sample",
    selectedSeats = [],
    resultIndex, // Get the resultIndex for the selected bus
    priceToPay, // Use the price calculated in the previous step
    selectedDroppingPoint,
    selectedBoardingPoint
  } = useSelector((state) => state.bus);
  const { mobile_number, email_id } = useSelector((state) => state.user);

  // Memoize formatted date to avoid recalculating on every render
  const formattedJourneyDate = useMemo(
    () => dayjs(date_of_journey).format('DD MMM YYYY'),
    [date_of_journey]
  );

  // Memoize payment description to avoid string concatenation during booking
  const paymentDescription = useMemo(
    () => `Payment for seat booking from ${originCity} to ${destinationCity} on ${formattedJourneyDate} via Ghumantoo`,
    [originCity, destinationCity, formattedJourneyDate]
  );

  const handleTicketBooking = async () => {
    // Early validation - don't set loading if validation fails
    if (!name || !age || !phone || !address) {
      alert("Please fill all required fields.");
      return;
    }

    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    // Prepare data synchronously before API call - no blocking operations
    const nameParts = name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "surname";
    const userPhone = mobile_number || phone;
    const userEmail = email_id || "guest@vindhyashrisolutions.com";
    const seatsString = selectedSeats.map(seat => seat.seat_id).join(",");
    const genderValue = checked === "first" ? 1 : 2;
    const ageValue = parseInt(age, 10);

    // Prepare seat data object
    const seatData = {
      "UserIp": "102.101.109.2",
      "SearchTokenId": SearchTokenId,
      "ResultIndex": resultIndex,
      "BoardingPointId": selectedBoardingPoint?.CityPointIndex || "",
      "DroppingPointId": selectedDroppingPoint?.CityPointIndex || "",
      "Address": address,
      "age": ageValue,
      "Gender": genderValue,
      "FirstName": firstName,
      "LastName": lastName,
      "Email": userEmail,
      "Phoneno": userPhone,
      "Seats": seatsString,
    };

    // Use memoized description - already prepared, no calculation needed
    const prefillData = {
      email: userEmail,
      contact: userPhone,
      name: name,
    };

    // Set loading state just before API call
    setLoading(true);

    try {
      // Make API call - this is the only blocking operation
      const blockResponse = await blockSeat(seatData);

      if (!blockResponse?.success || !blockResponse?.order_id) {
        alert(blockResponse?.message || "Failed to block seats. Please try again.");
        setLoading(false);
        return;
      }

      const { amount, order_id, currency, ticket_id } = blockResponse;

      // Prepare final Razorpay options - use memoized description, minimal processing
      const options = {
        description: paymentDescription,
        image: "https://vindhyashrisolutions.com/assets/images/logoIcon/logo.png",
        currency: currency || "INR",
        key: RAZORPAY_KEY_ID,
        amount: Math.round(amount * 100), // Amount in paise, ensure integer
        name: "Ghumantoo",
        order_id: order_id,
        prefill: prefillData,
        theme: { color: PrimaryColor },
      };

      // Open Razorpay immediately after API response - no blocking operations
      RazorpayCheckout.open(options)
        .then(async (data) => {
          // Handle success - prepare payment data with minimal processing
          const paymentData = {
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_order_id: data.razorpay_order_id,
            razorpay_signature: data.razorpay_signature,
            ticket_id: ticket_id,
            amount: amount,
          };

          try {
            const { success, block_details } = await confirmTicket(paymentData);
            if (success) {
              console.log(block_details);
              navigation.navigate("ConfirmationPage", { details: block_details });
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (confirmError) {
            console.error("Confirm ticket error:", confirmError);
            alert("Payment verification failed. Please contact support.");
          } finally {
            setLoading(false);
          }
        })
        .catch(({ error }) => {
          // Handle Razorpay errors
          if (error?.code === 'BAD_REQUEST_ERROR') {
            alert(`Payment error: ${error.description || 'Invalid request'}`);
          } else if (error?.code === 'NETWORK_ERROR') {
            alert("Network error. Please check your connection and try again.");
          } else {
            alert(error?.description || "Payment was cancelled or failed.");
          }

          setLoading(false);
        });
    } catch (error) {
      // Handle blockSeat API errors
      console.error("Block seat error:", error);
      const errorMessage = error?.response?.data?.message || error?.message || "Failed to process booking. Please try again.";
      alert(errorMessage);
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={[layouts.container, { backgroundColor: '#F7F7F7' }]}>
      {/* Header */}
      <View style={[layouts.rowCenter, spacing.p4, { backgroundColor: WhiteColor, paddingTop: 0 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={BlackColor} />
        </TouchableOpacity>
        <View>
          <Text style={[typography.font18, typography.textBold, spacing.ml4, { color: BlackColor }]}>{originCity} → {destinationCity}</Text>
          <Text style={[typography.font12, spacing.ml4, { color: LightGray }]}>
            {dayjs(date_of_journey).format('ddd DD MMM YYYY')}, {dayjs(departureTime).format('hh:mm A') || ""} | {selectedBus}
          </Text>
        </View>
      </View>

      <ScrollView style={[layouts.container, spacing.ph4, spacing.pt4]}>
        {/* Travel Details Section */}
        <View style={[spacing.p3, spacing.mb4, { backgroundColor: PureWhite, borderRadius: 8 }]}>

          <View style={[layouts.rowBetween]}>
            <View style={{ maxWidth: '48%' }}>
              <Text style={[typography.font14, typography.textBold, { color: BlackColor }]}>
                {dayjs(date_of_journey).format("ddd,D MMM")} ·{" "}
                {dayjs(departureTime).format("hh:mm A") || ""}
              </Text>
              <Text style={[typography.font12, { flexWrap: "wrap", color: LightGray }]}>{boardingPoint?.CityPointName || ""},{boardingPoint?.CityPointAddress || ""}</Text>
            </View>
            <View style={{ maxWidth: '48%' }}>
              <Text style={[typography.font14, typography.textBold, { color: BlackColor }]}>
                {dayjs(arrivalTime).isBefore(dayjs(departureTime))
                  ? dayjs(date_of_journey).add(1, "day").format("ddd, D MMM")
                  : dayjs(date_of_journey).format("ddd, D MMM")} {""}
                {dayjs(arrivalTime).format("hh:mm A") || ""}
              </Text>
              <Text style={[typography.font12, { flexWrap: "wrap", color: LightGray }]}>
                {droppingPoint?.CityPointName || ""}, {droppingPoint?.CityPointLocation || ""},
              </Text>
            </View>
          </View>

          <View style={[layouts.rowCenter, spacing.mt2]}>
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
        <View style={[spacing.p4, spacing.mb4, { backgroundColor: PureWhite, borderRadius: 8 }]}>
          <Text style={[typography.font18, typography.textBold, spacing.mb2, { color: BlackColor }]}>Contact Details</Text>
          <Text style={[typography.font12, { color: BlackColor }]}>Ticket details will be send to </Text>

          <View style={spacing.mv1}>
            <Text style={[typography.font16, spacing.mb1, { color: BlackColor }]}>Passenger Name
              <Text style={{ color: DangerColor }}>*</Text></Text>
            <TextInput
              style={[spacing.p2, spacing.bw1, spacing.br1, { borderColor: LightGray, fontSize: 14, color: BlackColor }]}
              placeholder="Passenger Name"
              onChangeText={(text) => {
                const alphabeticText = text.replace(/[^A-Za-z\s]/g, "");
                setName(alphabeticText);
              }}
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
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9]/g, "");
                setAge(numericText);
              }}
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
                onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ""))}
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
                    borderColor: checked === "first" ? DangerColor : LightGray,
                  },
                ]}
              >
                <Text style={[typography.font14, { color: BlackColor }]}>Male</Text>
                <RadioButton
                  value="first"
                  status={checked === "first" ? "checked" : "unchecked"}
                  onPress={() => setChecked("first")}
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
                    borderColor: checked === "second" ? DangerColor : LightGray,
                  },
                ]}
              >
                <Text style={[typography.font14, { color: BlackColor }]}>Female</Text>
                <RadioButton
                  value="second"
                  status={checked === "second" ? "checked" : "unchecked"}
                  onPress={() => setChecked("second")}
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
      <View style={[layouts.rowCenter, spacing.p4, { backgroundColor: WhiteColor, borderTopWidth: 1, borderTopColor: LightGray }]}>
        <View style={{ flex: 1 }}>
          <Text style={[typography.font14, { color: LightGray }]}>Total Fare</Text>
          <Text style={[typography.font20, typography.textBold, { color: BlackColor }]}>₹{priceToPay}</Text>
        </View>
        <TouchableOpacity
          style={[layouts.colCenter, spacing.pv4, spacing.br1, { flex: 1, backgroundColor: PrimaryColor }]}
          onPress={handleTicketBooking}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={White1Color} animating />
          ) : (
            <Text style={[typography.font16, typography.textBold, { color: WhiteColor }]}>Proceed to Pay</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PassengerData;
