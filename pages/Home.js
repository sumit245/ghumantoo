import React, { useState, useCallback, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Modal, Snackbar } from "react-native-paper";
import CalendarPicker from "react-native-calendar-picker";
import dayjs from "dayjs";

import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import Offers from "../components/Offers";
import RateUs from "../components/RateUs";
import Card from "../components/Card";
import PrimaryButton from "../components/buttons/PrimaryButton";
import LocationSelector from "../components/LocationSelector";

import { styles, width } from "../utils/styles";
import { Black1Color, PrimaryColor, } from "../utils/colors";
import { getActiveCoupons, getBusOnRoute } from "../actions/busActions";
import { typography } from "../utils/typography";
import { spacing } from "../utils/spacing.styles";


export default function Home() {
  const [date, setDate] = useState(dayjs());
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [visible, setVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false)
  const [errMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const showError = useCallback((message) => {
    setErrorMsg(message);
    setIsError(true);
  }, []);

  const searchBus = useCallback(async () => {
    if (!pickup) return showError("Source of journey cannot be empty");
    if (!destination) return showError("Destination of journey cannot be empty");
    if (pickup === destination) return showError("Source and destination cannot be same");

    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setLoading(true);

    // Reverting to the original logic: fetch data first, then navigate.
    dispatch(getBusOnRoute(pickup, destination, formattedDate)).then(() => {
      setLoading(false);
      navigation.navigate("SearchBus");
    }).finally(() => {
      setLoading(false);
    });

  }, [pickup, destination, date, dispatch, navigation, showError]);

  const handleDateChange = useCallback((selectedDate) => {
    setDate(selectedDate);
    setVisible(false)
  }, []);

  const dismissModal = useCallback(() => setVisible(false), []);
  const showModal = useCallback(() => setVisible(true), []);
  const dismissSnackbar = useCallback(() => setIsError(false), []);

  const setPickupLocation = async (location) => {
    setPickup(location.id);
    if (location) {
      dispatch({ type: 'SET_ORIGIN_CITY', payload: location.title });
    }
  }
  const setDestinationLocation = async (location) => {
    setDestination(location.id);
    if (location) {
      dispatch({ type: 'SET_DESTINATION_CITY', payload: location.title });
    }
  };
  const getCoupons = async () => {
    try {
      setLoading(true)
      await dispatch(getActiveCoupons());
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCoupons();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={PrimaryColor} animating />
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[typography.font24, typography.textBold, spacing.p2, spacing.ml4]}>
          Bus Tickets
        </Text>

        <LocationSelector
          handleDatePicker={showModal}
          selectedDate={date}
          setPickupLocation={setPickupLocation}
          setDestinationLocation={setDestinationLocation}
          pickup={pickup}
          destination={destination}
          setDate={setDate}
        />

        {/* FIXME: Once clicked it takes too much time to move to next screen and remains in immutable state. Warning on terminal is:
          WARN  ImmutableStateInvariantMiddleware took 454ms, which is more than the warning threshold of 32ms. 
If your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.
It is disabled in production builds, so you don't need to worry about that.
         */}
        <PrimaryButton
          onClick={searchBus}
          isIconButton
          iconName="search"
          title="Search Buses"
        />

        <Offers />
        <Card />
        <RateUs />

        <Modal
          visible={visible}
          onDismiss={dismissModal}
          contentContainerStyle={styles.modalContainerStyle}
        >
          <TouchableOpacity
            style={styles.modalCloseIcon}
            onPress={dismissModal}
          >
            <Icon name="close" size={24} color={PrimaryColor} />
          </TouchableOpacity>

          <Text style={[typography.font22, { color: Black1Color, textAlign: "center" }]}>
            Pick a date to travel
          </Text>

          <CalendarPicker
            style={styles.calendarStyle}
            minDate={dayjs().toDate()}
            maxDate={dayjs().add(90, 'day').toDate()}
            restrictMonthNavigation
            width={width - 40}
            height={width - 40}
            onDateChange={handleDateChange}
            selectedDayColor={PrimaryColor}
          />
        </Modal>
      </ScrollView>

      <Snackbar
        style={{ width: width - 20, opacity: 0.9 }}
        visible={isError}
        onDismiss={dismissSnackbar}
        duration={1000}
        action={{ label: "OK", onPress: dismissSnackbar }}
      >
        {errMsg}
      </Snackbar>
    </SafeAreaView>
  );
}
