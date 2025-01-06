import { View, Text, FlatList } from 'react-native'
import { styles } from '../../utils/styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const policies = [
  {
    id: 'child',
    icon: 'child-care',
    title: 'Child Passenger Policy',
    description: 'Children above age 6 will need a ticket',
  },
  {
    id: 'luggage',
    icon: 'luggage',
    title: 'Luggage Policy',
    description:
      'Every passenger is allowed to carry luggage (all inclusive) free of cost to an extent of 30 kgs in case of adult and 15 kgs in case of chargeable child.',
  },
  {
    id: 'pet',
    icon: 'pets',
    title: 'Pet Policy',
    description: 'Pets are often not allowed to travel with bus passengers',
  },
  {
    id: 'liquor',
    icon: 'liquor',
    title: 'Liquor Policy',
    description:
      'Carrying or consuming liquor on the bus is prohibited. Bus operator reserves the right to deboard the passengers carrying liquor or drunken passengers.',
  },
];


const OtherPolicies = () => {

  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 10 }}>
      <Text style={[styles.stdTextBottomSheet, { fontWeight: 'bold' }]}>
        <MaterialIcons name={item.icon} size={18} /> {item.title}
      </Text>
      <Text style={[styles.stdTextBottomSheet, { fontWeight: 300, marginLeft: 25 }]}>
        {item.description}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={policies}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingVertical: 10 }}
    />
  );
};

export default OtherPolicies
