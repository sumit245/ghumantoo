import { useState, useEffect } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../utils/styles";
import { filters } from "../faker/filters";
import BusCard from "../components/buscards/BusCard";
import { useSelector } from "react-redux";
import { PureWhite } from "../utils/colors";

export default function SearchBuses() {

  const [filterOptions] = useState(filters)
  const [buses, setBuses] = useState([])
  const navigation = useNavigation();

  const { bus } = useSelector(state => state.bus)

  useEffect(() => {
    setBuses(bus)
  }, [bus])


  return (
    <SafeAreaView style={[styles.container, { marginHorizontal: 0, marginTop: 0, paddingHorizontal: 0 }]}>

      <ScrollView
        horizontal={true}
        style={styles.filter}
        contentContainerStyle={{ padding: 6, alignItems: 'flex-start' }}
        showsHorizontalScrollIndicator={false}
      >
        {
          filterOptions.map((item, idx) => (
            <TouchableOpacity style={[styles.filterButton,{backgroundColor:PureWhite}]} key={idx}>
              {
                item.iconname && <Icon name={item.iconname} size={20} style={styles.filterIcon} />}
              <Text>{item.text}</Text>
            </TouchableOpacity>
          ))
        }
      </ScrollView>

      <FlatList
        style={{ padding: 6, flex: 1 }}
        data={buses}
        renderItem={({ item }) => <BusCard bus={item} onClick={() => navigation.navigate('selectSeat', { bus_id: item.id })} />}
        keyExtractor={item => item.id + ''}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        ListEmptyComponent={() => <Text>No buses found</Text>}
      />
    </SafeAreaView>
  );
}
