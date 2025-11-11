import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { styles, BlackColor, LightGray, spacing, typography, layouts } from "../../utils/styles";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

// A reusable row component to reduce redundancy
const PolicyRow = ({ condition, charge }) => (
  <View style={[layouts.rowBetween, spacing.pv2, { borderBottomWidth: 1, borderBottomColor: LightGray }]}>
    <Text style={[typography.font14, { width: '75%', color: BlackColor }]}>{condition}</Text>
    <Text style={[typography.font14, typography.textBold, { color: BlackColor }]}>{charge}</Text>
  </View>
);

export default function Cancellation({ dateOfJourney }) {

  const { formattedCancellationPolicy } = useSelector((state) => state.bus);


  return (
    <View>
      {/* <Text style={styles.headerTitleText}>Cancellation policy</Text> */}
      <Text style={styles.subHeadingBottomSheet}>Note: Cancellation charges are calculated on a per-seat basis.</Text>
      <View style={spacing.mt3}>
        {formattedCancellationPolicy.map((policy, index) => (
          <PolicyRow key={index} condition={policy} />
        ))}
      </View>
    </View>
  );
}

// All styles now use centralized styles from utils/styles
