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
import { useNavigation, useRoute } from "@react-navigation/native"; // 1. Import useRoute
import { styles } from "../utils/styles";
import BusCard from "../components/buscards/BusCard";
import { useDispatch, useSelector } from "react-redux";
import { LightGray, PrimaryColor, PureWhite, WhiteColor } from "../utils/colors";
import { getAvailableSeats, getBusOnRoute } from "../actions/busActions";
import { spacing } from "../utils/spacing.styles";

// Define the simple filters to show on this screen
const simpleFilters = [
  { text: 'Sort & Filter', screen: 'filterPage', type: 'navigate', iconname: 'sort' },
  { text: 'AC', type: 'filter' },
  { text: 'Non-AC', type: 'filter' },
  { text: 'Sleeper', type: 'filter' },
  { text: 'Seater', type: 'filter' },
];

export default function SearchBuses() {
  const { buses, date_of_journey, destinationId, pickupId, SearchTokenId } = useSelector((state) => state.bus);
  const [loading, setLoading] = useState(false);

  // 2. The filter state is now an object to hold all filter types
  const [activeFilters, setActiveFilters] = useState({
    fleetTypes: [],
    departureTime: null,
    price: null,
  });

  const navigation = useNavigation();
  const route = useRoute(); // Hook to get params from other screens
  const dispatch = useDispatch();

  // 3. This effect listens for new filters passed back from FilterScreen
  useEffect(() => {
    if (route.params?.appliedFilters) {
      // When new filters are received, update the local state
      setActiveFilters(prev => ({ ...prev, ...route.params.appliedFilters }));
    }
  }, [route.params?.appliedFilters]);

  // 4. This effect re-fetches buses whenever the activeFilters object changes
  useEffect(() => {
    if (pickupId && destinationId && date_of_journey) {
      setLoading(true);
      // Pass the entire activeFilters object to the Redux action
      dispatch(getBusOnRoute(pickupId, destinationId, date_of_journey, activeFilters))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [activeFilters, dispatch, pickupId, destinationId, date_of_journey]); // Dependency array updated

  const handleBusSelection = async (id) => {
    await dispatch(getAvailableSeats(id, SearchTokenId));
    navigation.navigate("selectSeat");
  };

  // 5. This function now only toggles the simple fleetType filters
  const toggleSimpleFilter = (filterName) => {
    setActiveFilters(prev => {
      const currentFleetTypes = prev.fleetTypes || [];
      const newFleetTypes = currentFleetTypes.includes(filterName)
        ? currentFleetTypes.filter(name => name !== filterName)
        : [...currentFleetTypes, filterName];
      return { ...prev, fleetTypes: newFleetTypes };
    });
  };

  return (
    <SafeAreaView style={[styles.container, { marginHorizontal: 0, marginTop: 0, paddingHorizontal: 0 }]}>
      {/* Filter part here */}
      <ScrollView
        horizontal={true}
        style={[{ maxHeight: 50, backgroundColor: WhiteColor }]}
        contentContainerStyle={{ padding: 6, alignItems: "flex-start", marginLeft: 2 }}
        showsHorizontalScrollIndicator={false}
      >
        {simpleFilters.map((item, idx) => {
          // 6. Check if the filter is applied from our new state object
          const isApplied = activeFilters.fleetTypes?.includes(item.text);

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
              // 7. Update onPress logic to handle navigation or simple toggling
              onPress={() => {
                if (item.type === 'navigate') {
                  // Pass current filters and bus data to the filter screen
                  navigation.navigate(item.screen, {
                    initialFilters: activeFilters,
                    buses: buses
                  });
                } else {
                  toggleSimpleFilter(item.text);
                }
              }}
            >
              {item.iconname && (
                <Icon name={item.iconname} size={20} style={[spacing.mr1]} />
              )}
              <Text>{item.text}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Body part remains the same */}
      {/* TODO: insert a real bus loading animation that appears as a moving bus on road  */}
      {loading ? (
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
      )}
    </SafeAreaView>
  );
}
