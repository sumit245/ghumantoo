import { View, Text, FlatList } from 'react-native'
import { styles } from '../../utils/styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'


const amenityData = [
  {
    id: '1',
    text: 'Snacks',
    iconName: 'food',
    iconComponent: MaterialCommunityIcons,
  },
  {
    id: '2',
    text: 'Water Bottle',
    iconName: 'bottle-water',
    iconComponent: FontAwesome6,
  },
  {
    id: '3',
    text: 'USB port for Charging',
    iconName: 'usb-port',
    iconComponent: MaterialCommunityIcons,
  },
  {
    id: '4',
    text: 'CCTV',
    iconName: 'cctv',
    iconComponent: MaterialCommunityIcons,
  },
  {
    id: '5',
    text: 'Charging Point',
    iconName: 'power-socket-uk',
    iconComponent: MaterialCommunityIcons,
  },
]

const Amenities = () => {

  const renderItem = ({ item }) => {
    const IconComponent = item.iconComponent
    return (
      <Text style={styles.stdTextBottomSheet}>
        <IconComponent name={item.iconName} size={18} />  {item.text}
      </Text>
    )
  }

  return (
    <View>
      <Text style={[styles.headerTitleText, { marginBottom: 25 }]}>5 Amenities</Text>

      <FlatList
        data={amenityData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  )
}

export default Amenities
