import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { styles, width } from "../utils/styles";
import Icon from "react-native-vector-icons/MaterialIcons";

import GCityTextInput from "./customs/GCityTextInput";
import dayjs from "dayjs";

import { fetchCounters } from "../actions/busActions";
import { typography } from "../utils/typography";

export default function LocationSelector({
  handleDatePicker,
  selectedDate,
  setPickupLocation,
  setDestinationLocation,
  toggleModalVisibile,
  setDate,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [selection, setSelection] = useState(
    dayjs(selectedDate).format("YYYY-MM-DD")
  );
  const [quickDates] = useState(["Today", "Tomorrow"]);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  useEffect(() => {
    handleDatePicker(isFocused);
    setSelection(dayjs(selectedDate).format("ddd,D MMM"));
    setDate(dayjs(selectedDate).format("YYYY-MM-DD"));
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

  const handleQuickDate = (index) => {
    const selectedDay = dayjs().add(index, "day");
    const formattedDay = selectedDay.format("ddd, D MMM");
    const fullDate = selectedDay.format("YYYY-MM-DD");
    setSelection(formattedDay);
    setDate(fullDate);
    console.log("Selected Date:", fullDate);
  };

  return (
    <View style={[styles.locationContainer]}>
      <GCityTextInput
        label="From"
        icon="bus"
        placeholder="Bhopal"
        onChangeText={handlePickupChange}
        value={pickup}
      // iconSize={12}
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
          right: 10,
          top: 45,
        }}
        onPress={() => {
          const temp = pickup;
          setPickup(destination);
          setDestination(temp);
          setPickupLocation(destination);
          setDestinationLocation(pickup);
        }}
      >
        <Icon name="swap-vert" size={24} color="#fff" />
      </TouchableOpacity>
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
        <Icon name="calendar-month" size={28} color="#333" />
        <View style={{ marginHorizontal: 8 }}>
          <Text style={styles.labelStyle}>Date of Journey</Text>
          <Text
            style={{ fontSize: 18, fontWeight: "bold" }}
            //style={[styles.title, { width: width / 3 }]}
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
            <Text style={[styles.buttonTextPrimary, typography.font12]}>
              {quickDate}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// Take two inputs and travel date values and perform search when button is pressed
