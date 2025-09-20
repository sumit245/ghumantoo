import React, { useEffect, useState } from "react";
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
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import RazorpayCheckout from "react-native-razorpay";
import { DangerColor, PrimaryColor, White1Color, WhiteColor } from "../utils/colors";
import { RAZORPAY_KEY_ID } from "../utils/constants";
import { blockSeat, confirmTicket } from "../actions/busActions";
import { RadioButton } from "react-native-paper";
import { spacing } from "../utils/spacing.styles";
import { typography } from "../utils/typography";

const PassengerData = () => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [selectedState, setSelectedState] = useState("Madhya Pradesh");
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
    selectedBusType,
    pickupId,
    destinationId,
    resultIndex, // Get the resultIndex for the selected bus
    priceToPay, // Use the price calculated in the previous step
    selectedDroppingPoint,
    selectedBoardingPoint
  } = useSelector((state) => state.bus);
  const { mobile_number, email_id } = useSelector((state) => state.user);

  const handleTicketBooking = async () => {
    setLoading(true);
    if (!name || !age || !phone || !address) {
      alert("Please fill all required fields.");
      setLoading(false);
      return;
    }

    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      setLoading(false);
      return;
    }
    const seatData = {
      "UserIp": "102.101.109.2",
      "SearchTokenId": SearchTokenId,
      "ResultIndex": resultIndex,
      "BoardingPointId": selectedBoardingPoint?.CityPointIndex || "",
      "DroppingPointId": selectedDroppingPoint?.CityPointIndex || "",
      "Address": address,
      "age": parseInt(age, 10),
      "Gender": checked === "first" ? 1 : 2,
      "FirstName": name.split(" ")[0],
      "LastName": name.split(" ").slice(1).join(" ") || "surname",
      "Email": email_id || "guest@vindhyashrisolutions.com",
      "Phoneno": mobile_number || phone,
      "Seats": selectedSeats.map(seat => seat.seat_id).join(","),
    }
    console.log("Booking with data:", seatData);
    const blockResponse = await blockSeat(seatData);

    if (blockResponse && blockResponse.success && blockResponse.order_id) {
      const { amount, order_id, currency, ticket_id } = blockResponse;
      const options = {
        description: `Payment for seat booking from ${originCity} to ${destinationCity} on ${date_of_journey} via Ghumantoo`,
        image: "https://vindhyashrisolutions.com/assets/images/logoIcon/logo.png",
        currency: currency,
        key: RAZORPAY_KEY_ID, // Using the key from constants
        // amount: amount, // Amount in paise
        name: "Ghumantoo",
        order_id: order_id,
        prefill: {
          email: email_id || 'guest@vindhyashrisolutions.com',
          contact: mobile_number || phone,
          name: name,
        },
        theme: { color: PrimaryColor },
      };

      try {
        RazorpayCheckout.open(options)
          .then(async (data) => {
            // Handle success
            const paymentData = {
              razorpay_payment_id: data.razorpay_payment_id,
              razorpay_order_id: data.razorpay_order_id,
              razorpay_signature: data.razorpay_signature,
            };
            const { status, details } = await confirmTicket(paymentData,);

            if (status === 201) {
              navigation.navigate("ConfirmationPage", { details });
            }
          })
          .catch(({error}) => {
            // Handle failure
            console.log("Razorpay Error:", error);
            alert(`Error: ${error.code} | ${error.description} | ${error.source}| ${error.step}| ${error.reason}`);
            // Modify the above line to show a user-friendly message and send the details to backend for logging
          }).finally(() => setLoading(false));
      } catch (error) {
        console.log("Razorpay Checkout Error:", error);
        alert("Payment failed. Please try again.");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
      alert(blockResponse.message || "Failed to block seats. Please try again.");
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.pageHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>{originCity} → {destinationCity}</Text>
          <Text style={styles.headerSubtitle}>
            {dayjs(date_of_journey).format('ddd DD MMM YYYY')}, {dayjs(departureTime).format('hh:mm A')} | {selectedBus}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.contentArea}>
        {/* Travel Details Section */}
        <View style={styles.travelDetails}>

          <View style={styles.row}>
            <View>
              <Text style={styles.time}>
                {dayjs(date_of_journey).format("ddd,D MMM")} ·{" "}
                {dayjs(departureTime).format("hh:mm A") || ""}
              </Text>
              <Text style={styles.location}>{boardingPoint?.CityPointName || ""},{boardingPoint?.CityPointAddress || ""}</Text>
            </View>
            <View>
              <Text style={styles.time}>
                {dayjs(arrivalTime).isBefore(dayjs(departureTime))
                  ? dayjs(date_of_journey).add(1, "day").format("ddd, D MMM")
                  : dayjs(date_of_journey).format("ddd, D MMM")}{" "}·{" "}
                {dayjs(arrivalTime).format("hh:mm A") || ""}
              </Text>
              <Text style={styles.location}>
                {droppingPoint?.CityPointName || ""}, {droppingPoint?.CityPointLocation || ""},
              </Text>
            </View>
          </View>

          {/* <Text style={styles.view}>Seats:</Text> */}
          <View style={[styles.row, { marginTop: 8 }]}>
            {selectedSeats.map((seat, index) => (
              <Text
                key={index}
                style={[styles.seatItem, { backgroundColor: "#f28b82" }]}
              >
                {/* TODO: Capitalize seat.category */}
                {seat.seat_id},{String(seat.category).toLocaleUpperCase()} {"\n"}
                {seat.price > 0 ? `₹${parseFloat(seat.price).toFixed(2)}` : "Free"}
              </Text>
            ))}
            <Text style={styles.seat}>
              <Icon name="seat-passenger" size={16} color="#000" />
              {Array.isArray(selectedSeats) && selectedSeats.length} Seat(s)
            </Text>
          </View>
        </View>
        {/* Contact Details Section */}
        <View style={styles.contactDetails}>
          <Text style={styles.sectionTitle}>Contact Details</Text>
          {/* TODO: get mobile_number from store and display here along with whatsapp icon if mobile_number is not present ask user to fill details so we can send them ticket details   */}
          <Text style={styles.section}>Ticket details will be send to </Text>

          <View style={{ marginVertical: 4 }}>
            <Text style={[styles.label, { marginBottom: 4 }]}>Passenger Name
              <Text style={{ color: DangerColor }}>*</Text></Text>
            <TextInput
              style={styles.passengerInput}
              placeholder="Passenger Name"
              onChangeText={(text) => {
                const alphabeticText = text.replace(/[^A-Za-z\s]/g, "");
                setName(alphabeticText);
              }}
              value={name}
            />
          </View>
          <View style={{ marginVertical: 4 }}>
            <Text style={[styles.label, { marginBottom: 4 }]}>Passenger Age
              <Text style={{ color: DangerColor }}>*</Text></Text>
            <TextInput
              style={styles.passengerInput}
              placeholder="Passenger Age"
              keyboardType="numeric"
              onChangeText={(text) => {
                const numericText = text.replace(/[^0-9]/g, "");
                setAge(numericText);
              }}
              value={age}
            />
          </View>

          <View style={{ marginVertical: 4 }}>
            <Text style={[styles.label, { marginBottom: 4 }]}>Phone Number
              <Text style={{ color: DangerColor }}>*</Text></Text>
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Country Code"
                defaultValue="+91 (IND)"
                editable={false}
              />
              <TextInput
                style={[styles.input, styles.number]}
                placeholder="Phone"
                keyboardType="numeric"
                maxLength={10}
                onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ""))}
                value={phone}
              />
            </View>
          </View>
          <View style={{ marginVertical: 4 }}>
            <Text style={[typography.font14]}>Gender</Text>
            <View style={[styles.row, spacing.mb2]}>
              <View
                style={[
                  spacing.pl2,
                  spacing.bw1,
                  spacing.mt2,
                  spacing.br5,
                  {
                    flexDirection: "row",
                    width: "48%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderColor: checked === "first" ? "red" : "gray",
                  },
                ]}
              >
                <Text style={[typography.font14]}>Male</Text>
                <RadioButton
                  value="first"
                  status={checked === "first" ? "checked" : "unchecked"}
                  onPress={() => setChecked("first")}
                  color="red"
                />
              </View>
              <View
                style={[
                  spacing.pl2,
                  spacing.bw1,
                  spacing.mt2,
                  spacing.br5,
                  spacing.p1,
                  {
                    flexDirection: "row",
                    width: "48%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderColor: checked === "second" ? "red" : "gray",
                  },
                ]}
              >
                <Text style={[typography.font14]}>Female</Text>
                <RadioButton
                  value="second"
                  status={checked === "second" ? "checked" : "unchecked"}
                  onPress={() => setChecked("second")}
                  color="red"
                />
              </View>
            </View>
          </View>
          <View style={{ marginVertical: 4 }}>
            <Text style={[styles.label, { marginBottom: 4 }]}>Address
              <Text style={{ color: DangerColor }}>*</Text>
            </Text>
            <View style={styles.inputGroup}>
              <TextInput
                style={[styles.passengerInput, { flex: 1, height: 80 }]}
                placeholder="Address"
                keyboardType="text"

                numberOfLines={4}
                multiline={true}
                maxLength={100}
                onChangeText={(text) => setAddress(text)}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.totalAmountLabel}>Total Fare</Text>
          <Text style={styles.totalAmountValue}>₹{priceToPay}</Text>
        </View>
        <TouchableOpacity
          style={[styles.footerButton, styles.proceedButton]}
          onPress={handleTicketBooking}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={White1Color} animating />
          ) : (
            <Text style={styles.proceedButtonText}>Proceed to Pay</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    top: 24,
    fontSize: 14,
    textAlign: "right",
  },

  seat: {
    fontSize: 12,
    color: "#000",
    backgroundColor: "pink",
    borderRadius: 4,
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 2,
    // bottom: 12,
  },

  passengerInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    color: "#000",
  },

  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginLeft: 16,
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  travelDetails: {
    padding: 12,
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  selectedSeatsContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  seatItem: {
    borderRadius: 4,
    color: "#fff",
    padding: 4,
    margin: 2
  },

  time: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  location: {
    fontSize: 12,
    // TODO: modify to max width 48% wrap text if exceeds to new lines
    maxWidth: "60%",
    flexWrap: "wrap",
    color: "#777",
  },

  contactDetails: {
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  section: {
    bottom: 5,
    fontSize: 12,
  },
  infoText: {
    backgroundColor: "pink",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
    fontSize: 12,
  },
  inputGroup: {
    flexDirection: "row",
  },

  input: {
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    padding: 10,
    color: "#000",
  },
  number: {
    marginRight: 2,
    flex: 1,
  },
  label: {
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    // overflow: "hidden",
  },
  picker: {
    height: 55,
    width: "100%",
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
  },
  links: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  link: {
    color: "#007BFF",
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  totalAmountLabel: {
    fontSize: 14,
    color: '#666',
  },
  totalAmountValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  footerButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: 'center',
  },
  proceedButton: {
    backgroundColor: PrimaryColor,
  },
  proceedButtonText: {
    color: WhiteColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PassengerData;
