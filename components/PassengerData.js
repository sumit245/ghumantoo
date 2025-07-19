import React, { useState } from "react";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import RazorpayCheckout from "react-native-razorpay";
import { PrimaryColor, White1Color } from "../utils/colors";
import { bookTicket, confirmTicket } from "../actions/busActions";

const PassengerData = ({ navContinue }) => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [selectedState, setSelectedState] = useState("Madhya Pradesh");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {
    date_of_journey,
    selectedBus,
    selectedSeats,
    pickupId,
    destinationId,
  } = useSelector((state) => state.bus);

  const totalPrice = selectedSeats.length * (selectedBus?.price || 0);

  const handleTicketBooking = async () => {
    setLoading(true);
    try {
      const ticketDetails = {
        date_of_journey: dayjs(date_of_journey).format("YYYY-MM-DD"),
        pickup: pickupId,
        destination: destinationId,
        seats: selectedSeats.join(","),
        gender: 1,
        mobile_number: phone,
        passenger_names: [name],
      };

      const result = await bookTicket(selectedBus.id, ticketDetails);
      if (result) {
        const { ticket_id, amount, currency, order_id } = result;
        const options = {
          description: `Payment for seat booking (${ticketDetails.seats}) from ${selectedBus.originCity} to ${selectedBus.destinationCity} on ${ticketDetails.date_of_journey} via Ghumantoo`,
          image:
            "https://vindhyashrisolutions.com/assets/images/logoIcon/logo.png",
          currency,
          key: "rzp_live_AkjlcAJNXWb7EU",
          amount,
          name: "Ghumantoo",
          order_id, //Replace this with an order_id created using Orders API.
          prefill: {
            email: "info@vindhyashrisolutions.com",
            contact: phone,
            name: name,
          },
          theme: { color: PrimaryColor },
        };
        const paymentData = await RazorpayCheckout.open(options);
        if (paymentData) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            paymentData;
          const ticketParams = {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            ticket_id,
            ticket_details: ticketDetails,
          };
          const { status, details } = await confirmTicket(ticketParams);
          if (status === 201) {

            navigation.navigate("ConfirmationPage", { details });
            // navigate to thank you page with params
          }
        }
      }
    } catch (error) {
      alert("Error during booking:", error.message || error);

    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Passenger Information</Text>
        <Text style={styles.subtitle}>
          {selectedBus?.originCity || ""} → {selectedBus?.destinationCity || ""}
        </Text>
      </View>

      <View style={styles.travelDetails}>
        <View style={styles.row}>
          <Text style={styles.time}>
            {dayjs(date_of_journey).format("ddd,D MMM")} ·{" "}
            {selectedBus?.start_time || ""}
          </Text>
          <Text style={styles.time}>
            {dayjs(date_of_journey).format("ddd,D MMM")} ·{" "}
            {selectedBus?.end_time || ""}
          </Text>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={styles.location}>{selectedBus?.originLocation || ""},</Text>
            <Text style={styles.location}>{selectedBus?.originCity || ""}</Text>
          </View>
          <View>
            <Text style={styles.location}>
              {selectedBus?.destinationLocation || ""},
            </Text>
            <Text style={styles.location}>{selectedBus?.destinationCity || ""}</Text>
          </View>
        </View>

        <View>
          {/* <Text style={styles.view}>Seats:</Text> */}
          <View style={styles.selectedSeatsContainer}>
            {selectedSeats.map((seat, index) => (
              <Text
                key={index}
                style={[styles.seatItem, { backgroundColor: "#f28b82" }]}
              >
                {seat}
              </Text>
            ))}
          </View>
          <Text style={styles.seat}>
            <Icon name="seat-passenger" size={16} color="#000" />
            {Array.isArray(selectedSeats) && selectedSeats.length} Seat(s)
          </Text>
        </View>
      </View>

      <View style={styles.contactDetails}>
        <Text style={styles.sectionTitle}>Contact Details</Text>
        <Text style={styles.section}>Ticket details will be send to </Text>
        <Text style={styles.infoText}>
          Name and gender is not required. Mobile number is sufficient to make a
          booking on this bus.
        </Text>
        <View style={{ marginVertical: 4 }}>
          <Text style={styles.label}>Passenger Name</Text>

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
          <Text style={styles.label}>Phone Number</Text>
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
          <Text style={styles.label}>State of Residence</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedState}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedState(itemValue)}
              mode="dropdown"
            >
              <Picker.Item label="Madhya Pradesh" value="Madhya Pradesh" />
              <Picker.Item label="Uttar Pradesh" value="Uttar Pradesh" />
              <Picker.Item label="Rajasthan" value="Rajasthan" />
              <Picker.Item label="Bihar" value="Bihar" />
              <Picker.Item label="Gujarat" value="Gujarat" />
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.amountSection}>
        <Text style={styles.amountText}>Amount</Text>
        <Text style={styles.amountText}>₹{totalPrice}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleTicketBooking}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={White1Color} animating />
          ) : (
            <Text style={styles.buttonText}>Proceed to pay</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    bottom: 12,
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
    backgroundColor: "#F9F9F9",
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
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
    flexDirection: "row",
    flexWrap: "wrap",
    top: 4,
  },
  seatItem: {
    borderRadius: 4,
    color: "#fff",
    left: 150,
    paddingHorizontal: 4,
    marginRight: 4,
    // flexBasis: "33.33%",
  },

  time: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  location: {
    // fontSize: 14,
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
  amountSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 8,
  },
  amountText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  strikeThrough: {
    fontSize: 16,
    color: "#AAA",
  },
  buttonContainer: {
    alignItems: "center",
    marginVertical: 50,
  },
  button: {
    backgroundColor: "#cf413a",
    paddingVertical: 10,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PassengerData;
