import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
  Image,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../utils/styles";
import { filters } from "../faker/filters";
import BusCard from "../components/buscards/BusCard";
import { useDispatch, useSelector } from "react-redux";
import { LightGray, PrimaryColor, PureWhite, WhiteColor } from "../utils/colors";
import { getAvailableSeats, getBusOnRoute } from "../actions/busActions";
import { spacing } from "../utils/spacing.styles";


export default function SearchBuses() {
  const [appliedFilters, setAppliedFilters] = useState([])
  const { buses, date_of_journey, destinationId, pickupId, SearchTokenId } = useSelector((state) => state.bus);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleBusSelection = async (id) => {
    await dispatch(getAvailableSeats(id, SearchTokenId));
    navigation.navigate("selectSeat");
  };

  // This effect re-fetches buses whenever the applied filters change
  useEffect(() => {
    // Ensure we have the required parameters before making a call
    if (pickupId && destinationId && date_of_journey) {
      setLoading(true);
      dispatch(getBusOnRoute(pickupId, destinationId, date_of_journey, appliedFilters))
        .then(() => setLoading(false))
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [appliedFilters, dispatch, pickupId, destinationId, date_of_journey]); // Dependency array

  // Suggestion
  const applyFilter = (filterName) => {
    setAppliedFilters(prev =>
      prev.includes(filterName)
        ? prev.filter(appliedName => appliedName !== filterName) // More descriptive variable
        : [...prev, filterName]
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { marginHorizontal: 0, marginTop: 0, paddingHorizontal: 0 },
      ]}
    >
      {/* Filter part here */}
      <ScrollView
        horizontal={true}
        style={[{ maxHeight: 50, backgroundColor: WhiteColor }]}
        contentContainerStyle={{ padding: 6, alignItems: "flex-start", marginLeft: 2 }}
        showsHorizontalScrollIndicator={false}
      >
        {filters.map((item, idx) => {
          const isApplied = appliedFilters.includes(item.onPress); // check if idx is in appliedFilters

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
                item.type === 'navigate'
                  ? navigation.navigate(item.onPress)
                  : applyFilter(item.onPress)
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

      {/* Body part here */}
      {
        loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={PrimaryColor} />
          </View>

        ) : (
          <FlatList
            style={{ padding: 6, flex: 1 }}
            data={buses}
            renderItem={({ item }) => (
              <BusCard bus={item} onClick={() => handleBusSelection(item.ResultIndex)} />
            )}
            keyExtractor={(item) => item.ResultIndex + ""}
            showsVerticalScrollIndicator={false}
            initialNumToRender={20}
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
        )
      }
    </SafeAreaView>
  );
}
