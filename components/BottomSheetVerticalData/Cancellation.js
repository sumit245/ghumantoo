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

  const {policiesCancellation}  = useSelector((state) => state.bus);

  useEffect(() => {
    console.log("Cancellation Policy from Redux:", policiesCancellation);
  }, [policiesCancellation]);
  // If no date is passed, we can show a default message or hide the component
  if (!dateOfJourney) {
    return (
      <View>
        <Text style={styles.headerTitleText}>Cancellation policy</Text>
        <Text>Cancellation details will be available once a journey date is selected.</Text>
      </View>
    );
  }

  const journeyDate = dayjs(dateOfJourney);

  // Create the policy data dynamically based on the journey date
  const policies = [
    {
      condition: `Before ${journeyDate.subtract(1, 'day').format('DD MMM, ddd')}`,
      charge: '10%'
    },
    {
      condition: `Between ${journeyDate.subtract(1, 'day').format('DD MMM')} & ${journeyDate.subtract(12, 'hour').format('h:mm A')}`,
      charge: '25%'
    },
    {
      condition: `Between ${journeyDate.subtract(12, 'hour').format('h:mm A')} & ${journeyDate.subtract(2, 'hour').format('h:mm A')}`,
      charge: '50%'
    },
    {
      condition: `After ${journeyDate.subtract(2, 'hour').format('h:mm A on DD MMM')}`,
      charge: '100%'
    }
  ];

  return (
    <View>
      {/* <Text style={styles.headerTitleText}>Cancellation policy</Text> */}
      <Text style={styles.subHeadingBottomSheet}>Note: Cancellation charges are calculated on a per-seat basis.</Text>
      <View style={localStyles.policyContainer}>
        {policiesCancellation.map((policy, index) => (
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
  },
  policyContainer: {
    marginTop: 10,
  }
});
