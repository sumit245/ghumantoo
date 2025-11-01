// import React, { useEffect, useRef, useState } from "react";
// import { View, Text, TouchableOpacity } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";
// import dayjs from "dayjs";
// import GCityTextInput from "./customs/GCityTextInput";
// import { styles } from "../utils/styles";
// import { typography } from "../utils/typography";
// import { spacing } from "../utils/spacing.styles";
// import { DarkGray, PureWhite } from "../utils/colors";

// export default function LocationSelector({ handleDatePicker, selectedDate, setPickupLocation, setDestinationLocation, setDate, pickup, destination }) {
//   const [selection, setSelection] = useState("");
//   const quickDates = ["Today", "Tomorrow"];
  

//   useEffect(() => {
//     setSelection(dayjs(selectedDate).format("ddd, D MMM"));
//     setDate(dayjs(selectedDate).format("YYYY-MM-DD"));
//     // handleDatePicker(false);
//   }, [selectedDate]);

//   const handleQuickDate = (index) => {
//     const selected = dayjs().add(index, "day");
//     setSelection(selected.format("ddd, D MMM"));
//     setDate(selected.format("YYYY-MM-DD"));
//   };

//   const swapLocations = () => {
//     const temp = pickup;
//     setPickupLocation(destination);
//     setDestinationLocation(temp);
//   };


//   return (
//     <View style={[spacing.p2, spacing.br3, spacing.bw1, spacing.mh4]}>
//       <GCityTextInput
//         label="From"
//         icon="bus"
//         placeholder="Source"
//         onChangeText={setPickupLocation}
//         value={pickup}
//       />

//       <TouchableOpacity
//         style={{
//           alignSelf: "center",
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: "#333",
//           borderRadius: 25,
//           width: 45,
//           height: 45,
//           position: "absolute",
//           right: 8,
//           top: 64,
//         }}
//         onPress={swapLocations}
//       >
//         <Icon name="swap-vert" size={24} color="#fff" />
//       </TouchableOpacity>
//       <GCityTextInput
//         label="To"
//         icon="bus"
//         placeholder="Destination"
//         onChangeText={setDestinationLocation}
//         value={destination}
//       />
//       <View style={[styles.pickDropSelector, { borderBottomWidth: 0 }]}>
//         <Icon name="calendar-month" size={28} color={DarkGray} />
//         <View style={spacing.mh2}>
//           <Text style={typography.font14}>Date of Journey</Text>
//           <Text
//             style={[typography.font16, { fontWeight: "bold" }]}
//             onPress={() => handleDatePicker(true)}
//           >
//             {selection}
//           </Text>
//         </View>
//         <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1 }}>
//           {quickDates.map((label, idx) => (
//             <TouchableOpacity
//               key={label}
//               style={[styles.buttonPrimary, styles.smallButtonPrimary]}
//               onPress={() => handleQuickDate(idx)}
//             >
//               <Text style={[styles.buttonTextPrimary, typography.font12]}>
//                 {label}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//     </View>
//   );
// }
// file: ../components/LocationSelector.js

import React, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import dayjs from "dayjs";
import GCityTextInput from "./customs/GCityTextInput";
import { styles } from "../utils/styles";
import { typography } from "../utils/typography";
import { spacing } from "../utils/spacing.styles";
import { DarkGray } from "../utils/colors";

// FIX: Update the component to be a "controlled component".
// It receives data props (values) and function props (callbacks) to notify the parent of changes.
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
        style={componentStyles.swapButton}
        onPress={onSwapLocations} // FIX: Call the parent function to swap locations
      >
        <Icon name="swap-vert" size={24} color="#fff" />
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
          <Text style={typography.font14}>Date of Journey</Text>
          <Text
            style={[typography.font16, { fontWeight: "bold" }]}
            onPress={onDatePickerPress} // FIX: Use the dedicated prop for clarity
          >
            {formattedSelection}
          </Text>
        </View>
        <View style={componentStyles.quickDatesContainer}>
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

const componentStyles = {
  swapButton: {
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
    zIndex: 1, // Ensure it's clickable over other elements
  },
  quickDatesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
};
