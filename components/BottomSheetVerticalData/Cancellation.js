import { View, Text, FlatList, StyleSheet } from "react-native"
import { styles } from "../../utils/styles"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"



const cancellationPolicy = [
  { timeBeforeTravel: "Before 29th Apr 08:00 PM", deduction: "10%" },
  { timeBeforeTravel: "From 29th Apr 08:00 PM Until 4th May 08:00 PM", deduction: "14%" },
  { timeBeforeTravel: "From 4th May 08:00 PM Until 5th May 08:00 PM", deduction: "18%" },
  { timeBeforeTravel: "From 5th May 08:00 PM Until 6th May 08:00 AM", deduction: "60%" },
  { timeBeforeTravel: "From 6th May 08:00 AM", deduction: "100%" },
];



const Cancellation = () => {

  const icon = <FontAwesome6 color='grey' name='star-of-life' size={11} />

  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableDivision}>{item.timeBeforeTravel}</Text>
      <Text style={styles.tableDivision}>{item.deduction} will be deducted</Text>
    </View>
  );

  return (
    <View>
      <Text style={styles.headerTitleText}>Cancellation policy</Text>

      <View style={styles.tableRow}>
        <Text style={[styles.tableHeading, { fontWeight: 'bold', fontSize: 18 }]}>Time Before Travel</Text>
        <Text style={[styles.tableHeading, { fontWeight: 'bold', fontSize: 18 }]}>Deduction</Text>
      </View>

      <FlatList
        data={cancellationPolicy}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={[styles.row, style1.container]}>
        {icon}
        <Text style={style1.text}> Please note that this ticket is non-refundable</Text>
      </View>
      <View style={[styles.row, style1.container]}>
        {icon}
        <Text style={style1.text}> Ticket cannot be Cancelled after Bus Departure time</Text>
      </View>
      <View style={[styles.row, style1.container]}>
        {icon}
        <Text style={style1.text}> Cancellation charges are calculate based on date of booked ticket</Text>
      </View>
    </View>
  )
}

const style1 = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'none',
    flexWrap: 'wrap'
  },

  text: {
    marginBottom: 2,
    fontWeight: '300',
    fontSize: 13
  }
})

export default Cancellation
