import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { styles } from "../../utils/styles";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

// A reusable row component to reduce redundancy
const PolicyRow = ({ condition, charge }) => (
  <View style={localStyles.row}>
    <Text style={localStyles.conditionText}>{condition}</Text>
    <Text style={localStyles.chargeText}>{charge}</Text>
  </View>
);

export default function Cancellation({ dateOfJourney }) {

  const { formattedCancellationPolicy } = useSelector((state) => state.bus);

  // If no date is passed, we can show a default message or hide the component
  useEffect(() => {
    console.log(formattedCancellationPolicy)
  }, [])


  return (
    <View>
      {/* <Text style={styles.headerTitleText}>Cancellation policy</Text> */}
      <Text style={styles.subHeadingBottomSheet}>Note: Cancellation charges are calculated on a per-seat basis.</Text>
      <View style={localStyles.policyContainer}>
        {formattedCancellationPolicy.map((policy, index) => (
          <PolicyRow key={index} condition={policy} />
        ))}
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  conditionText: {
    width: '75%', // Give more space for the condition text
    fontSize: 14,
    color: '#333',
  },
  chargeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#17171f',
  },
  policyContainer: {
    marginTop: 10,
  }
});
