import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { styles, width } from "../utils/styles";
import Icon from "react-native-vector-icons/Ionicons";
import GCityTextInput from "./customs/GCityTextInput";
import dayjs from "dayjs";

import { fetchCounters } from "../actions/busActions";

export default function LocationSelector({
  handleDatePicker,
  selectedDate,
  setPickupLocation,
  setDestinationLocation,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [selection, setSelection] = useState(
    dayjs(selectedDate).format("ddd,D MMM")
  );
  const [quickDates] = useState(["Today", "Tomorrow"]);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  useEffect(() => {
    handleDatePicker(isFocused);
    setSelection(dayjs(selectedDate).format("ddd,D MMM"));
  }, [isFocused, selectedDate]);

  const handlePickupChange = async (text) => {
    setPickupLocation(text);
    setPickup(text);
    if (text.length > 1) {
      // Trigger API call when input has more than 1 character
      const suggestions = await fetchCounters(text);
      setPickupSuggestions(suggestions);
    } else {
      setPickupSuggestions([]);
    }
  };

  // Handle destination input change and fetch suggestions
  const handleDestinationChange = async (text) => {
    setDestinationLocation(text);
    setDestination(text);
    if (text.length > 1) {
      const suggestions = await fetchCounters(text);
      setDestinationSuggestions(suggestions);
    } else {
      setDestinationSuggestions([]);
    }
  };

  const handleQuickDate = (idx) => {
    const day = dayjs().add(idx, "day").format("ddd,D MMM");
    setSelection(day);
   // console.error("Selected Date:");
  };

  return (
    <View style={[styles.locationContainer]}>
      <GCityTextInput
        label="From"
        icon="bus"
        placeholder="Bhopal"
        onChangeText={handlePickupChange}
        value={pickup}
      />
      {pickupSuggestions.length > 0 && (
        <FlatList
          data={pickupSuggestions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => {
                setPickupLocation(item.id);
                setPickup(item.name);
                setPickupSuggestions([]);
              }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Destination Location Input */}
      <GCityTextInput
        label="To"
        icon="bus"
        placeholder="Indore"
        onChangeText={handleDestinationChange}
        value={destination}
      />
      {/* Display destination suggestions */}
      {destinationSuggestions.length > 0 && (
        <FlatList
          data={destinationSuggestions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => {
                setDestinationLocation(item.id);
                setDestination(item.name);
                setDestinationSuggestions([]);
              }}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <View style={[styles.pickDropSelector, { borderBottomWidth: 0 }]}>
        <Icon name="calendar-number" size={28} color="#777" />
        <View style={{ marginHorizontal: 10 }}>
          <Text style={styles.labelStyle}>Date of Journey</Text>
          <Text
            style={[styles.title, { width: width / 3 }]}
            onPress={() => setIsFocused(!isFocused)}
          >
            {selection}
          </Text>
        </View>
        {/* Quick Date Selection */}
        {quickDates.map((quickDate, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.buttonPrimary, styles.smallButtonPrimary]}
            onPress={() => handleQuickDate(index)}
          >
            <Text style={[styles.buttonTextPrimary, { fontSize: 12 }]}>
              {quickDate}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// Take two inputs and travel date values and perform search when button is pressed
