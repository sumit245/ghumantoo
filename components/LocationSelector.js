import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import dayjs from "dayjs";
import GCityTextInput from "./customs/GCityTextInput";
import { styles } from "../utils/styles";
import { typography } from "../utils/typography";
import { spacing } from "../utils/spacing.styles";
import { DarkGray, PureWhite } from "../utils/colors";

export default function LocationSelector({ handleDatePicker, selectedDate, setPickupLocation, setDestinationLocation, setDate, pickup, destination }) {
  const [selection, setSelection] = useState("");
  const quickDates = ["Today", "Tomorrow"];
  const dropdownRef = useRef()
  const pickupRef = useRef()

  useEffect(() => {
    setSelection(dayjs(selectedDate).format("ddd, D MMM"));
    setDate(dayjs(selectedDate).format("YYYY-MM-DD"));
    // handleDatePicker(false);
  }, [selectedDate]);

  const handleQuickDate = (index) => {
    const selected = dayjs().add(index, "day");
    setSelection(selected.format("ddd, D MMM"));
    setDate(selected.format("YYYY-MM-DD"));
  };

  const swapLocations = () => {
    const temp = pickup;
    setPickupLocation(destination);
    setDestinationLocation(temp);
  };


  return (
    <View style={[spacing.p2, spacing.br3, spacing.bw1, spacing.mh4]}>
      <GCityTextInput
        label="From"
        icon="bus"
        placeholder="Bhopal"
        onChangeText={setPickupLocation}
        value={pickup}
      />

      <TouchableOpacity
        style={{
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#333",
          borderRadius: 25,
          width: 45,
          height: 45,
          position: "absolute",
          right: 8,
          top: 64,
        }}
        onPress={swapLocations}
      >
        <Icon name="swap-vert" size={24} color="#fff" />
      </TouchableOpacity>
      <GCityTextInput
        label="To"
        icon="bus"
        placeholder="Indore"
        onChangeText={setDestinationLocation}
        value={destination}
      />
      <View style={[styles.pickDropSelector, { borderBottomWidth: 0 }]}>
        <Icon name="calendar-month" size={28} color={DarkGray} />
        <View style={spacing.mh2}>
          <Text style={typography.font14}>Date of Journey</Text>
          <Text
            style={[typography.font16, { fontWeight: "bold" }]}
            onPress={() => handleDatePicker(true)}
          >
            {selection}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1 }}>
          {quickDates.map((label, idx) => (
            <TouchableOpacity
              key={label}
              style={[styles.buttonPrimary, styles.smallButtonPrimary]}
              onPress={() => handleQuickDate(idx)}
            >
              <Text style={[styles.buttonTextPrimary, typography.font12]}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
