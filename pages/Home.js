import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Modal, Snackbar } from "react-native-paper";
import { useNetwork } from "../utils/PermissionManager";
import CalendarPicker from "react-native-calendar-picker";
import dayjs from "dayjs";

import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

// Assuming these are memoized components for performance
import Offers from "../components/Offers";
import RateUs from "../components/RateUs";
import Card from "../components/Card";
import PrimaryButton from "../components/buttons/PrimaryButton";
import LocationSelector from "../components/LocationSelector";
import GBanner from "../components/customs/GBanner";

import { styles, width } from "../utils/styles";
import { Black1Color, PrimaryColor } from "../utils/colors";
import { getActiveCoupons, getBusOnRoute } from "../actions/busActions";
import { typography } from "../utils/typography";
import { spacing } from "../utils/spacing.styles";


// It's a good practice to memoize components to prevent unnecessary re-renders.
// You would wrap the export of your components like this: export default React.memo(YourComponent);

const APP_VERSION = "1.0.7";

export default function Home() {
  // Group related state into an object for cleaner management
  const [searchQuery, setSearchQuery] = useState({
    date: dayjs(),
    pickup: "",
    destination: "",
  });

  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });

  // FIX: Use separate loading states for different actions
  const [isSearching, setIsSearching] = useState(false);
  const [isCouponsLoading, setIsCouponsLoading] = useState(true); // Start loading coupons on mount

  const isConnected = useNetwork();
  const [showOffline, setShowOffline] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const showError = useCallback((message) => {
    setSnackbar({ visible: true, message });
  }, []);

  const searchBus = useCallback(async () => {
    if (!searchQuery.pickup) return showError("Source of journey cannot be empty");
    if (!searchQuery.destination) return showError("Destination of journey cannot be empty");
    if (searchQuery.pickup === searchQuery.destination) return showError("Source and destination cannot be same");

    const formattedDate = dayjs(searchQuery.date).format("YYYY-MM-DD");
    setIsSearching(true);

    dispatch(getBusOnRoute(searchQuery.pickup, searchQuery.destination, formattedDate))
      .then(() => {
        navigation.navigate("SearchBus");
      })
      .catch((err) => {
        // Handle potential errors from the search action
        showError("Failed to search for buses. Please try again.");
        console.error("Search bus error:", err);
      })
      .finally(() => {
        // FIX: setLoading is now only called once in finally
        setIsSearching(false);
      });
  }, [searchQuery, dispatch, navigation, showError]);

  const handleDateChange = useCallback((selectedDate) => {
    setSearchQuery(prev => ({ ...prev, date: selectedDate }));
    setCalendarVisible(false);
  }, []);

  // FIX: Removed unnecessary `async` keyword
  const setPickupLocation = (location) => {
    setSearchQuery(prev => ({ ...prev, pickup: location.id }));
    if (location) {
      dispatch({ type: 'SET_ORIGIN_CITY', payload: location.title });
    }
  };

  // FIX: Removed unnecessary `async` keyword
  const setDestinationLocation = (location) => {
    setSearchQuery(prev => ({ ...prev, destination: location.id }));
    if (location) {
      dispatch({ type: 'SET_DESTINATION_CITY', payload: location.title });
    }
  };

  const getCoupons = useCallback(async () => {
    setIsCouponsLoading(true);
    try {
      await dispatch(getActiveCoupons());
    } catch (error) {
      // FIX: Handle the error gracefully, maybe show a toast or log it
      console.error("Failed to fetch coupons:", error);
      // Optionally show a non-intrusive error to the user
    } finally {
      setIsCouponsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getCoupons();
  }, [getCoupons]);

  useEffect(() => {
    setShowOffline(!isConnected);
  }, [isConnected]);

  // Memoize calendar dates to avoid re-calculating on every render
  const { minDate, maxDate } = useMemo(() => ({
    minDate: dayjs().toDate(),
    maxDate: dayjs().add(90, 'day').toDate(),
  }), []);

  // ADD: A callback function to handle swapping locations
  const handleSwapLocations = useCallback(() => {
    // Also swap the city names stored in redux if needed
    // dispatch(swapCitiesAction());

    setSearchQuery(prev => ({
      ...prev,
      pickup: prev.destination,
      destination: prev.pickup,
    }));
  }, []);

  // FIX: The main UI renders immediately. No more full-screen loader on initial load.
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[typography.font24, typography.textBold, spacing.p2, spacing.ml4]}>
          Bus Tickets
        </Text>

        {/* <LocationSelector
          handleDatePicker={() => setCalendarVisible(true)}
          selectedDate={searchQuery.date}
          setDate={setSearchQuery}
          setPickupLocation={setPickupLocation}
          setDestinationLocation={setDestinationLocation}
        /> */}
        <LocationSelector
          onDatePickerPress={() => setCalendarVisible(true)}
          selectedDate={searchQuery.date}
          onDateChange={handleDateChange} // This handles quick dates

          onPickupSelect={setPickupLocation}
          onDestinationSelect={setDestinationLocation}
          onSwapLocations={handleSwapLocations} // Pass the new swap handler

          pickupValue={searchQuery.pickup}
          destinationValue={searchQuery.destination}
        />

        <PrimaryButton
          onClick={searchBus}
          isIconButton
          iconName="search"
          title="Search Buses"
          loading={isSearching} // Pass loading state to the button
        />

        <GBanner />
        {/* Pass the loading state down to the component to show a skeleton/loader inside it */}
        <Offers isLoading={isCouponsLoading} />
        <Card />
        <RateUs />

        <Modal
          visible={isCalendarVisible}
          onDismiss={() => setCalendarVisible(false)}
          contentContainerStyle={styles.modalContainerStyle}
        >
          <Text style={[typography.font22, { color: Black1Color, textAlign: "center" }]}>
            Pick a date to travel
          </Text>

          <CalendarPicker
            minDate={minDate}
            maxDate={maxDate}
            restrictMonthNavigation
            width={width - 40}
            height={width - 40}
            onDateChange={handleDateChange}
            selectedDayColor={PrimaryColor}
          />

          <TouchableOpacity
            style={styles.modalCloseIcon}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={() => setCalendarVisible(false)}
          >
            <Icon name="close" size={24} color={PrimaryColor} />
          </TouchableOpacity>
        </Modal>

        <Text style={componentStyles.footerText}>
          Version {APP_VERSION}{"\n"}
          Powered by Dashandots Technology
        </Text>
      </ScrollView>

      <Snackbar
        style={componentStyles.snackbar}
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ visible: false, message: "" })}
        duration={2000}
        action={{ label: "OK", onPress: () => setSnackbar({ visible: false, message: "" }) }}
      >
        {snackbar.message}
      </Snackbar>

      <Snackbar
        visible={showOffline}
        onDismiss={() => setShowOffline(false)}
        duration={Snackbar.DURATION_INDEFINITE}
        style={componentStyles.offlineSnackbar}
        action={{ label: 'Retry', onPress: getCoupons }}
      >
        You appear to be offline. Check your connection and tap Retry.
      </Snackbar>
    </SafeAreaView>
  );
}

// Keep component-specific styles separate for clarity
const componentStyles = StyleSheet.create({
  footerText: {
    ...typography.font10,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  snackbar: {
    width: width - 20,
    opacity: 0.9,
    alignSelf: 'center',
  },
  offlineSnackbar: {
    width: width - 20,
    backgroundColor: '#222',
    alignSelf: 'center',
  }
});