
import React, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import dayjs from "dayjs";
import GCityTextInput from "./customs/GCityTextInput";
import { styles, typography, spacing, DarkGray, layouts, BlackColor, WhiteColor } from "../utils/styles";


export default function LocationSelector({
  // Data props from parent
  selectedDate,
  pickupValue,
  destinationValue,
  // Callback function props
  onDateChange,
  onDatePickerPress,
  onPickupSelect,
  onDestinationSelect,
  onSwapLocations,
}) {
  const quickDates = ["Today", "Tomorrow"];

  // FIX: The displayed date is now derived directly from the 'selectedDate' prop using useMemo for efficiency.
  // No more internal 'selection' state or 'useEffect' needed for this.
  const formattedSelection = useMemo(() => {
    return dayjs(selectedDate).format("ddd, D MMM");
  }, [selectedDate]);

  const handleQuickDate = (index) => {
    const newDate = dayjs().add(index, "day");
    // FIX: Instead of setting state locally, call the callback from the parent.
    onDateChange(newDate);
  };

  return (
    <View style={[spacing.p2, spacing.br3, spacing.bw1, spacing.mh4]}>
      {/* FIX: Connect GCityTextInput to the new props */}
      <GCityTextInput
        label="From"
        icon="bus"
        placeholder="Source"
        onSelectItem={onPickupSelect} // Assuming GCityTextInput returns a location object
        selectedItem={pickupValue}
      />

      <TouchableOpacity
        style={[layouts.colCenter, { alignSelf: "center", backgroundColor: BlackColor, borderRadius: 25, width: 45, height: 45, position: "absolute", right: 8, top: 64, zIndex: 1 }]}
        onPress={onSwapLocations}
      >
        <Icon name="swap-vert" size={24} color={WhiteColor} />
      </TouchableOpacity>

      <GCityTextInput
        label="To"
        icon="bus"
        placeholder="Destination"
        onSelectItem={onDestinationSelect}
        selectedItem={destinationValue}
      />
      <View style={[styles.pickDropSelector, { borderBottomWidth: 0 }]}>
        <Icon name="calendar-month" size={28} color={DarkGray} />
        <View style={spacing.mh2}>
          <Text style={[typography.font14, { color: '#17171f' }]}>Date of Journey</Text>
          <Text
            style={[typography.font16, { fontWeight: "bold", color: '#17171f' }]}
            onPress={onDatePickerPress} // FIX: Use the dedicated prop for clarity
          >
            {formattedSelection}
          </Text>
        </View>
        <View style={[layouts.rowCenter, { justifyContent: 'flex-end', flex: 1 }]}>
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