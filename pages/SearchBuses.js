import { useCallback } from "react";
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
import { styles, LightGray, PrimaryColor, PureWhite, BlackColor, spacing, GrayBackground } from "../utils/styles";
import BusCard from "../components/buscards/BusCard";
import Loader from "../components/customs/Loader";
import Header from "../components/customs/Header";
import { useSearchBuses } from "../hooks/useSearchBuses";

const simpleFilters = [
  { text: 'More', screen: 'filterPage', type: 'navigate', iconname: 'sort' },
  { text: 'Time', type: 'sort', iconname: 'clock-time-four-outline', key: 'departure' },
  { text: 'Price', type: 'sort', iconname: 'currency-inr', key: 'price' },
  { text: 'AC', type: 'filter', iconname: "air-conditioner", },
  { text: 'Non-AC', type: 'filter', iconname: 'air-filter' },
  { text: 'Sleeper', type: 'filter', iconname: "bed", },
  { text: 'Seater', type: 'filter', iconname: "seat", },
];

/**
 * SearchBuses Screen (Presentational Component)
 * 
 * Displays list of available buses with filtering and sorting options.
 * All business logic extracted to useSearchBuses custom hook.
 */
export default function SearchBuses() {
  // Extract all state and methods from custom hook
  const {
    buses,
    originCity,
    destinationCity,
    isInitialLoading,
    isRefreshing,
    isLoadingMore,
    activeFilters,
    handleLoadMore,
    handleBusSelection,
    toggleFleetTypeFilter,
    handleSort,
    navigateToFilters,
  } = useSearchBuses();

  const renderBusItem = useCallback(({ item }) => (
    <BusCard bus={item} onClick={handleBusSelection} />
  ), [handleBusSelection]);

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return <Loader variant="footer" color={PrimaryColor} />;
  };

  const renderHeader = () => (
    <View style={[spacing.pb1, spacing.borderBottom, { backgroundColor: PureWhite }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[spacing.pv2, spacing.ph1]}>
        {simpleFilters.map((item, idx) => {
          const isFleetTypeApplied = activeFilters.fleetTypes?.includes(item.text);
          const isSortApplied = activeFilters.sortBy === item.key;
          const isApplied = isFleetTypeApplied || isSortApplied;
          return (
            <TouchableOpacity key={idx} style={[styles.filterButton, { borderColor: isApplied ? PrimaryColor : LightGray, backgroundColor: PureWhite }]}
              onPress={() => {
                if (item.type === 'navigate') navigateToFilters();
                else if (item.type === 'filter') toggleFleetTypeFilter(item.text);
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
    return <Loader />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: GrayBackground, marginTop: 0 }]}>
      <Header
        title={`${originCity} → ${destinationCity}`}
        subtitle={`${buses.length} buses found`}
      />

      {/* 2. MAIN VIEW CONTAINER: This allows us to place the refresh overlay on top */}
      {/* <View style={{ flex: 1 }}> */}
      <FlatList
        data={buses}
        // contentContainerStyle={spacing.mh2}
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
      {isRefreshing && <Loader variant="overlay" />}
      {/* </View> */}
    </SafeAreaView>
  );
}
