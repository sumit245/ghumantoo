import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Modal } from "react-native-paper";
import CalendarPicker from "react-native-calendar-picker";
import Icon from "react-native-vector-icons/Ionicons";

// Custom hook with business logic
import { useHome } from "../hooks/useHome";

// Presentational components
import Offers from "../components/Offers";
import RateUs from "../components/RateUs";
import Card from "../components/Card";
import PrimaryButton from "../components/buttons/PrimaryButton";
import LocationSelector from "../components/LocationSelector";
import GBanner from "../components/customs/GBanner";

// Styles
import { styles, width } from "../utils/styles";
import { Black1Color, PrimaryColor, BlackColor, typography, spacing } from "../utils/styles";

const APP_VERSION = "1.0.9";

/**
 * Home Screen (Presentational Component)
 * 
 * Displays bus search form and promotional content.
 * All business logic extracted to useHome custom hook.
 */

export default function Home() {
  // Extract all state and methods from custom hook
  const {
    searchQuery,
    isCalendarVisible,
    isSearching,
    isCouponsLoading,
    calendarDateRange,
    searchBus,
    handleDateChange,
    setPickupLocation,
    setDestinationLocation,
    handleSwapLocations,
    toggleCalendar,
    setCalendarVisible,
  } = useHome();
  return (
    <SafeAreaView style={styles.container}>
      {/* No Custom Header Inherits from Stack Navigator */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[typography.font24, typography.textBold, spacing.p2, spacing.ml4, { color: BlackColor }]}>
          Bus Tickets
        </Text>

        <LocationSelector
          onDatePickerPress={toggleCalendar}
          selectedDate={searchQuery.date}
          onDateChange={handleDateChange}
          onPickupSelect={setPickupLocation}
          onDestinationSelect={setDestinationLocation}
          onSwapLocations={handleSwapLocations}
          pickupValue={searchQuery.pickup}
          destinationValue={searchQuery.destination}
        />

        <PrimaryButton
          style={spacing.m4}
          onClick={searchBus}
          isIconButton
          iconName="search"
          title="Search Buses"
          loading={isSearching}
        />

        <GBanner />
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
            minDate={calendarDateRange.minDate}
            maxDate={calendarDateRange.maxDate}
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

        <Text style={[typography.font10, { color: BlackColor, textAlign: 'center', marginTop: 10 }]}>
          Version {APP_VERSION}{"\n"}
          Powered by Dashandots Technology
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}