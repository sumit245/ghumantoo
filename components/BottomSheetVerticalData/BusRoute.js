import React, { View, Text, FlatList } from "react-native"
import { styles } from "../../utils/styles"
import AntDesign from "react-native-vector-icons/AntDesign"

const routeStops = ['Delhi', 'Mathura', 'Agra', 'Etawah']


const BusRoute = () => {

  const forwardIcon = <AntDesign name='forward' size={12} color='lightgrey' />

  const renderItem = ({ item, index }) => (
    <Text style={styles.stdTextBottomSheet}>
      <Text style={{ fontWeight: (index === 0 || index === routeStops.length - 1) ? 'bold' : 'normal' }}>  {item}  </Text>
      {index !== routeStops.length - 1 && forwardIcon}
    </Text>
  );

  return (
    <>
      <Text style={styles.headerTitleText}>Bus Route</Text>
      <Text style={styles.subHeadingBottomSheet}>10h 30m</Text>
      <FlatList
        horizontal
        data={routeStops}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  )
}

export default BusRoute


