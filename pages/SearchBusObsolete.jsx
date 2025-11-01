import React, { useState, useEffect, useCallback } from "react";
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
import { styles } from "../utils/styles";
import BusCard from "../components/buscards/BusCard";
import { useDispatch, useSelector } from "react-redux";
import { LightGray, PrimaryColor, PureWhite, WhiteColor } from "../utils/colors";
import { getBusOnRoute } from "../actions/busActions";
import { spacing } from "../utils/spacing.styles";
import { SELECT_BUS, SET_ARRIVAL_TIME, SET_BUS_TYPE, SET_DEPARTURE_TIME } from "../utils/constants";

// It's critical that BusCard is wrapped in React.memo for FlatList performance
// In ../components/buscards/BusCard.js, export it like this:
// export default React.memo(BusCard);

// 1. UPDATED FILTERS: Added Sort by Time and Price
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
    const [isLoading, setIsLoading] = useState(true);
    const [isloadingMore, setIsLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const { buses, date_of_journey, destinationId, pickupId, SearchTokenId } = useSelector((state) => state.bus);
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();

    // 2. UPDATED STATE: Added sortBy and sortOrder to handle sorting
    const [activeFilters, setActiveFilters] = useState({
        fleetTypes: [],
        departureTime: null,
        price: null,
        sortBy: 'departure', // Default sort
        sortOrder: 'asc'
    });

    // Effect to fetch initial data or re-fetch when filters change
    useEffect(() => {
        const fetchData = () => {
            if (!pickupId || !destinationId) return;

            setIsLoading(true);
            setPage(1);
            setHasMore(true);

            // The action now needs to accept the entire filters object
            dispatch(getBusOnRoute(pickupId, destinationId, date_of_journey, activeFilters, 1))
                .catch((err) => console.error("Fetch Data Error:", err))
                .finally(() => setIsLoading(false));
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
                if (response.data.length === 0) {
                    setHasMore(false);
                }
                setPage(nextPage);
            })
            .catch((err) => console.error("Load More Error:", err))
            .finally(() => setIsLoadingMore(false));
    };

    const handleBusSelection = useCallback(async (bus) => {
        dispatch({ type: SELECT_BUS, payload: bus.TravelName });
        dispatch({ type: SET_BUS_TYPE, payload: bus.BusType });
        dispatch({ type: SET_DEPARTURE_TIME, payload: bus.DepartureTime });
        dispatch({ type: SET_ARRIVAL_TIME, payload: bus.ArrivalTime });
        await dispatch(getAvailableSeats(bus.ResultIndex, SearchTokenId, bus.CancellationPolicies));
        navigation.navigate("selectSeat");
    }, [dispatch, SearchTokenId, navigation]);

    const toggleSimpleFilter = (filterName) => {
        setActiveFilters(prev => {
            const currentFleetTypes = prev.fleetTypes || [];
            const newFleetTypes = currentFleetTypes.includes(filterName)
                ? currentFleetTypes.filter(name => name !== filterName)
                : [...currentFleetTypes, filterName];
            return { ...prev, fleetTypes: newFleetTypes };
        });
    };

    // 3. NEW HANDLER: For sorting logic
    const handleSort = (sortKey) => {
        setActiveFilters(prev => {
            const newSortOrder = prev.sortBy === sortKey && prev.sortOrder === 'asc' ? 'desc' : 'asc';
            return { ...prev, sortBy: sortKey, sortOrder: newSortOrder };
        });
    };

    const renderBusItem = useCallback(({ item }) => (
        <BusCard bus={item} onClick={handleBusSelection} />
    ), [handleBusSelection]);

    const renderFooter = () => {
        if (!isloadingMore) return null;
        return <ActivityIndicator style={{ marginVertical: 20 }} color={PrimaryColor} />;
    };

    // 4. NEW HEADER: Filters are now rendered in a function for the ListHeaderComponent
    const renderHeader = () => (
        <View style={componentStyles.headerContainer}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={componentStyles.headerScrollView}
            >
                {simpleFilters.map((item, idx) => {
                    const isFleetTypeApplied = activeFilters.fleetTypes?.includes(item.text);
                    const isSortApplied = activeFilters.sortBy === item.key;
                    const isApplied = isFleetTypeApplied || isSortApplied;

                    return (
                        <TouchableOpacity
                            key={idx}
                            style={[
                                styles.filterButton,
                                {
                                    backgroundColor: PureWhite,
                                    borderColor: isApplied ? PrimaryColor : LightGray,
                                }
                            ]}
                            onPress={() => {
                                if (item.type === 'navigate') {
                                    navigation.navigate(item.screen, {
                                        initialFilters: activeFilters,
                                        buses: buses
                                    });
                                } else if (item.type === 'filter') {
                                    toggleSimpleFilter(item.text);
                                } else if (item.type === 'sort') {
                                    handleSort(item.key);
                                }
                            }}
                        >
                            {item.iconname && (
                                <Icon
                                    name={isSortApplied ? (activeFilters.sortOrder === 'asc' ? 'arrow-up' : 'arrow-down') : item.iconname}
                                    size={18}
                                    style={spacing.mr1}
                                    color={isApplied ? PrimaryColor : '#333'}
                                />
                            )}
                            <Text style={{ color: isApplied ? PrimaryColor : '#333' }}>{item.text}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );

    if (isLoading) {
        return <View style={componentStyles.loaderContainer}><ActivityIndicator size="large" color={PrimaryColor} /></View>;
    }

    return (
        <SafeAreaView style={[styles.container, { marginTop: 0 }]}>
            <FlatList
                data={buses}
                renderItem={renderBusItem}
                keyExtractor={(item) => item.ResultIndex}
                showsVerticalScrollIndicator={false}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={11}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                // 5. HEADER INTEGRATION: Header is added to the list and made sticky
                ListHeaderComponent={renderHeader}
                stickyHeaderIndices={[0]}
                ListEmptyComponent={() => (
                    <View>
                        <Image source={require("../assets/no route.png")} style={styles.image} />
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const componentStyles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        backgroundColor: WhiteColor,
        borderBottomWidth: 1,
        borderBottomColor: LightGray,
    },
    headerScrollView: {
        paddingVertical: 8,
        paddingHorizontal: 6,
    },
});