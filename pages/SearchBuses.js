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
import { LightGray, PrimaryColor, PureWhite, WhiteColor } from "../utils/colors";
import { getAvailableSeats } from "../actions/busActions";
import { spacing } from "../utils/spacing.styles";

export default function SearchBuses() {
  const [filterOptions] = useState(filters);
  const [appliedFilters, setAppliedFilters] = useState([])
  const navigation = useNavigation();
  const { buses, date_of_journey, SearchTokenId } = useSelector((state) => state.bus);
  const dispatch = useDispatch();

  const handleBusSelection = async (id) => {
    await dispatch(getAvailableSeats(id, SearchTokenId));
    navigation.navigate("selectSeat");
  };

  const applyFilter = (idx, filter) => {
    console.log(idx, filter)
    // 1. check if the idx is in appliedFilters state, if present then remove else insert
    setAppliedFilters(prev =>
      prev.includes(idx)
        ? prev.filter(i => i !== idx) // remove
        : [...prev, idx] // add
    );
    console.log(buses)
  }

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
        contentContainerStyle={{ padding: 6, alignItems: "flex-start", marginLeft: 2 }}
        showsHorizontalScrollIndicator={false}
      >
        {filterOptions.map((item, idx) => {
          const isApplied = appliedFilters.includes(idx); // check if idx is in appliedFilters

          return (
            <TouchableOpacity
              key={idx}
              style={[
                styles.filterButton,
                {
                  backgroundColor: PureWhite,
                  borderColor: isApplied ? PrimaryColor : LightGray,
                  elevation: isApplied ? 1 : 0
                }
              ]}
              onPress={() =>
                idx === 0
                  ? navigation.navigate(item.onPress)
                  : applyFilter(idx, item.onPress)
              }
            >
              {item.iconname && (
                <Icon name={item.iconname} size={20} style={[spacing.mr1]} />
              )}
              <Text>{item.text}</Text>
            </TouchableOpacity>
          );
        })}

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
              resizeMode="cover"
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
