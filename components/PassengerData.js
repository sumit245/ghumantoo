import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
//import { selectBusRoute } from "../actions/busActions";

const PassengerData = ({ navContinue }) => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [selectedState, setSelectedState] = useState("Madhya Pradesh");
  const navigation = useNavigation();
  const { date_of_journey, selectedBus, selectedSeats } = useSelector((state) => state.bus)
  const user = useSelector(state => state.user)
  useEffect(() => {
    console.log(user)
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Passenger Information</Text>
        <Text style={styles.subtitle}>{selectedBus.originCity} → {selectedBus.destinationCity}</Text>
      </View>

      <View style={styles.travelDetails}>
        <View style={styles.row}>
          <Text style={styles.time}>{dayjs(date_of_journey).format('ddd,D MMM')} · {selectedBus.start_time}</Text>
          <Text style={styles.time}>{dayjs(date_of_journey).format('ddd,D MMM')} · {selectedBus.end_time}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.location}>{selectedBus.originLocation},{selectedBus.originCity}</Text>
          <Text style={styles.location}>{selectedBus.destinationLocation},{selectedBus.destinationCity}</Text>
        </View>
        <Text style={styles.view}>Seat: {selectedSeats}</Text>
        <Text style={styles.seat}>{Array.isArray(selectedSeats) && selectedSeats.length} Seat(s)</Text>
      </View>

      <View style={styles.contactDetails}>
        <Text style={styles.sectionTitle}>Contact Details</Text>
        <Text style={styles.section}>Ticket details will be send to  </Text>
        <Text style={styles.infoText}>
          Name and gender is not required. Mobile number is sufficient to make a
          booking on this bus.
        </Text>
        <View style={{ marginVertical: 4 }}>
          <Text style={styles.label}>Passenger Name</Text>
          <TextInput
            style={styles.passengerInput}
            placeholder="Passenger Name"
            onChangeText={(text) => setName(text)}
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
        <Text style={styles.amountText}>₹</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate(navContinue);
          }}
        >
          <Text style={styles.buttonText}>Continue</Text>
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
    borderRadius: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  passengerInputContainer: {
    marginBottom: 10,
    top: 8,
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
    marginBottom: 8,
  },
  time: {
    fontSize: 16,
    fontWeight: "bold",
  },
  location: {
    fontSize: 14,
    color: "#555",
    flexWrap: 'wrap',
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
    // justifyContent: "space-between",
    // marginBottom: 16,
  },

  input: {
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
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
    overflow: "hidden",
  },
  picker: {
    height: 50,
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
