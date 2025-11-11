import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles, LightGray, PrimaryColor, PureWhite, WhiteColor, BlackColor, spacing, layouts } from "../utils/styles";
import BusCard from "../components/buscards/BusCard";
import { useDispatch, useSelector } from "react-redux";
import { getAvailableSeats, getBusOnRoute } from "../actions/busActions";
import { SELECT_BUS, SET_ARRIVAL_TIME, SET_BUS_TYPE, SET_DEPARTURE_TIME, SET_RESULT_INDEX, SET_CANCEL_POLICY } from "../utils/constants";

const simpleFilters = [
  { text: 'More', screen: 'filterPage', type: 'navigate', iconname: 'sort' },
  { text: 'Time', type: 'sort', iconname: 'clock-time-four-outline', key: 'departure' },
  { text: 'Price', type: 'sort', iconname: 'currency-inr', key: 'price' },
  { text: 'AC', type: 'filter', iconname: "air-conditioner", },
  { text: 'Non-AC', type: 'filter', iconname: 'air-filter' },
  { text: 'Sleeper', type: 'filter', iconname: "bed", },
  { text: 'Seater', type: 'filter', iconname: "seat", },
];

export default function SearchBuses() {
  // 1. REFINED LOADING STATES for better UX
  const [isInitialLoading, setIsInitialLoading] = useState(true); // For the first-time, full-screen load
  const [isRefreshing, setIsRefreshing] = useState(false); // For sort/filter overlay
  const [isloadingMore, setIsLoadingMore] = useState(false); // For pagination footer

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { buses, date_of_journey, destinationId, pickupId, SearchTokenId } = useSelector((state) => state.bus);
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const [activeFilters, setActiveFilters] = useState({
    fleetTypes: [], departureTime: null, price: null, sortBy: 'departure', sortOrder: 'asc'
  });

  // Ref to track if this is the component's first render
  const isInitialMount = useRef(true);

  // Effect to fetch data when filters change
  useEffect(() => {
    const fetchData = () => {
      if (!pickupId || !destinationId) return;

      // Only show the subtle refresh indicator for subsequent loads
      if (!isInitialMount.current) {
        setIsRefreshing(true);
      }

      setPage(1);
      setHasMore(true);

      dispatch(getBusOnRoute(pickupId, destinationId, date_of_journey, activeFilters, 1))
        .catch((err) => console.error("Fetch Data Error:", err))
        .finally(() => {
          setIsInitialLoading(false);
          setIsRefreshing(false);
          isInitialMount.current = false; // Mark initial mount as complete
        });
    };
    fetchData();
  }, [activeFilters, pickupId, destinationId, date_of_journey, dispatch]);

  useEffect(() => {
    if (route.params?.appliedFilters) {
      setActiveFilters(prev => ({ ...prev, ...route.params.appliedFilters }));
    }
  }, [route.params?.appliedFilters]);

  const handleLoadMore = () => {
    if (isloadingMore || !hasMore) return;
    setIsLoadingMore(true);
    const nextPage = page + 1;

    dispatch(getBusOnRoute(pickupId, destinationId, date_of_journey, activeFilters, nextPage))
      .then(response => {
        if (response.pagination.has_more_pages === false) { setHasMore(false); }
        if (!response.trips || response.trips.length === 0) {
          setPage(nextPage);
        }
      })
      .catch((err) => console.error("Load More Error:", err))
      .finally(() => setIsLoadingMore(false));
  };

  const handleBusSelection = useCallback((bus) => {
    // Dispatch all necessary bus and search info to Redux synchronously
    dispatch({ type: SELECT_BUS, payload: bus.TravelName });
    dispatch({ type: SET_BUS_TYPE, payload: bus.BusType });
    dispatch({ type: SET_DEPARTURE_TIME, payload: bus.DepartureTime });
    dispatch({ type: SET_ARRIVAL_TIME, payload: bus.ArrivalTime });
    dispatch({ type: SET_RESULT_INDEX, payload: bus.ResultIndex });
    dispatch({ type: SET_CANCEL_POLICY, payload: bus.CancellationPolicies }); // Pass policies for fetching later

    // Navigate immediately without waiting for network requests
    navigation.navigate("selectSeat");
  }, [dispatch, SearchTokenId, navigation]);

  const toggleSimpleFilter = (filterName) => {
    setActiveFilters(prev => ({
      ...prev,
      fleetTypes: prev.fleetTypes.includes(filterName)
        ? prev.fleetTypes.filter(name => name !== filterName)
        : [...prev.fleetTypes, filterName]
    }));
  };

  const handleSort = (sortKey) => {
    setActiveFilters(prev => ({
      ...prev,
      sortBy: sortKey,
      sortOrder: prev.sortBy === sortKey && prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  const renderBusItem = useCallback(({ item }) => (
    <BusCard bus={item} onClick={handleBusSelection} />
  ), [handleBusSelection]);

  const renderFooter = () => {
    if (!isloadingMore) return null;
    return <ActivityIndicator style={{ marginVertical: 20 }} color={PrimaryColor} />;
  };

  const renderHeader = () => (
    <View style={[spacing.pv2, { backgroundColor: WhiteColor, borderBottomWidth: 1, borderBottomColor: LightGray }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[spacing.pv2, spacing.ph1]}>
        {simpleFilters.map((item, idx) => {
          const isFleetTypeApplied = activeFilters.fleetTypes?.includes(item.text);
          const isSortApplied = activeFilters.sortBy === item.key;
          const isApplied = isFleetTypeApplied || isSortApplied;
          return (
            <TouchableOpacity key={idx} style={[styles.filterButton, { borderColor: isApplied ? PrimaryColor : LightGray, backgroundColor: PureWhite }]}
              onPress={() => {
                if (item.type === 'navigate') navigation.navigate(item.screen, { initialFilters: activeFilters, buses });
                else if (item.type === 'filter') toggleSimpleFilter(item.text);
                else if (item.type === 'sort') handleSort(item.key);
              }}>
              <Icon name={isSortApplied ? (activeFilters.sortOrder === 'asc' ? 'arrow-up' : 'arrow-down') : item.iconname} size={18} style={spacing.mr1} color={isApplied ? PrimaryColor : BlackColor} />
              <Text style={{ color: isApplied ? PrimaryColor : BlackColor }}>{item.text}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  // Use the full-screen loader ONLY for the initial mount
  if (isInitialLoading) {
    return <View style={[layouts.container, layouts.colCenter]}><ActivityIndicator size="large" color={PrimaryColor} /></View>;
  }

  return (
    <SafeAreaView style={[styles.container, { marginTop: 0 }]}>
      {/* 2. MAIN VIEW CONTAINER: This allows us to place the refresh overlay on top */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={buses}
          renderItem={renderBusItem}
          keyExtractor={(item) => item.ResultIndex}
          initialNumToRender={10}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListHeaderComponent={renderHeader}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          ListEmptyComponent={() => (
            <View><Image source={require("../assets/no route.png")} style={styles.image} /></View>
          )}
        />
        {/* 3. REFRESH OVERLAY: This view appears on top of the list when sorting or filtering */}
        {isRefreshing && (
          <View style={[StyleSheet.absoluteFillObject, layouts.colCenter, { backgroundColor: 'rgba(255, 255, 255, 0.7)' }]}>
            <ActivityIndicator size="large" color={PrimaryColor} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
