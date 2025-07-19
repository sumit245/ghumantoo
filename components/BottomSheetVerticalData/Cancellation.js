import React, { View, Text, FlatList, StyleSheet } from "react-native"
import { styles } from "../../utils/styles"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import { typography } from "../../utils/typography";
import { spacing } from "../../utils/spacing.styles";



const cancellationPolicy = [
  { timeBeforeTravel: "Before 29th Apr 08:00 PM", deduction: "10%" },
  { timeBeforeTravel: "From 29th Apr 08:00 PM Until 4th May 08:00 PM", deduction: "14%" },
  { timeBeforeTravel: "From 4th May 08:00 PM Until 5th May 08:00 PM", deduction: "18%" },
  { timeBeforeTravel: "From 5th May 08:00 PM Until 6th May 08:00 AM", deduction: "60%" },
  { timeBeforeTravel: "From 6th May 08:00 AM", deduction: "100%" },
];

const terms = [
  "Cancellation charges are applicable as per the above table.",
  "Cancellation charges are applicable on the total fare of the ticket.",
  "Cancellation charges are applicable on the date of booking.",
  "Cancellation charges are applicable on the date of cancellation.",
  "Cancellation charges are applicable on the date of travel.",
]


const Cancellation = () => {
  const icon = <FontAwesome6 color='grey' name='star-of-life' size={11} />

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableDivision}>{item.timeBeforeTravel}</Text>
      <Text style={styles.tableDivision}>{item.deduction} will be deducted</Text>
    </View>
  );

  const tableHeader = (
    <View style={styles.tableRow}>
      <Text style={[styles.tableHeading, { fontWeight: 'bold', fontSize: 18 }]}>Time Before Travel</Text>
      <Text style={[styles.tableHeading, { fontWeight: 'bold', fontSize: 18 }]}>Deduction</Text>
    </View>
  );

  const tableFooter = () => (
    terms.map((term, index) => (
      <View style={[styles.row, { justifyContent: 'flex-start' }]} key={index}>
        {icon}
        <Text style={[typography.font12, spacing.pl1]}>{term}</Text>
      </View>
    ))
  )

  return (
    <>
      <Text style={styles.headerTitleText}>Cancellation policy</Text>
      <FlatList
        data={cancellationPolicy}
        ListHeaderComponent={tableHeader}
        ListFooterComponent={tableFooter}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

    </>
  )
}


export default Cancellation
