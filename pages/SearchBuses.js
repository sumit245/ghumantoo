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

  const { buses, date_of_journey, SearchTokenId } = useSelector((state) => state.bus);
  const sele = useSelector(state => state)

  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      console.log(sele)
      if (buses) {
        setFilteredBuses(buses);
      }
    }, 100)
  }, []);

  const handleBusSelection = async (id) => {
    await dispatch(getAvailableSeats(id, SearchTokenId));
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
          <BusCard bus={item} onClick={() => handleBusSelection(item.ResultIndex)} />
        )}
        keyExtractor={(item) => item.ResultIndex + ""}
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
