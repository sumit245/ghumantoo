import { useState, useEffect } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../utils/styles";
import { filters } from "../faker/filters";
import BusCard from "../components/buscards/BusCard";
import { useDispatch, useSelector } from "react-redux";
import { PureWhite, WhiteColor } from "../utils/colors";
import { getAvailableSeats } from "../actions/busActions";
import { spacing } from "../utils/spacing.styles";

export default function SearchBuses() {
  const [filterOptions] = useState(filters);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const navigation = useNavigation();

  const { buses, date_of_journey } = useSelector((state) => state.bus);

  const dispatch = useDispatch();

  useEffect(() => {
    setFilteredBuses(buses);
  }, [buses]);

  const handleBusSelection = async (id) => {
    await dispatch(getAvailableSeats(id, date_of_journey));
    navigation.navigate("selectSeat");
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { marginHorizontal: 0, marginTop: 0, paddingHorizontal: 0 },
      ]}
    >
      <ScrollView
        horizontal={true}
        style={[{ maxHeight: 50, backgroundColor: WhiteColor }]}
        contentContainerStyle={{ padding: 6, alignItems: "flex-start" }}
        showsHorizontalScrollIndicator={false}
      >
        {filterOptions.map((item, idx) => (
          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: PureWhite }]}
            key={idx}
          >
            {item.iconname && (
              <Icon name={item.iconname} size={20} style={[spacing.mr1]} />
            )}
            <Text>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        style={{ padding: 6, flex: 1 }}
        data={buses}
        renderItem={({ item }) => (
          <BusCard bus={item} onClick={() => handleBusSelection(item.id)} />
        )}
        keyExtractor={(item) => item.id + ""}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        ListEmptyComponent={() => (
          <View>
            <Image
              source={require("../assets/no route.png")}
              style={[styles.image, { width: "100%", height: 330 }]}
              // resizeMode="cover"
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
