import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { Modal, Portal } from "react-native-paper";
import CalendarPicker from "react-native-calendar-picker";
import dayjs from "dayjs";

import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Offers from "../components/Offers";
import RateUs from "../components/RateUs";
import Card from "../components/Card";
import PrimaryButton from "../components/buttons/PrimaryButton";
import LocationSelector from "../components/LocationSelector";

import { styles, width } from "../utils/styles";
import { PrimaryColor } from "../utils/colors";

import { DATA } from "../faker/buses";
import { useDispatch } from "react-redux";
import { getBuses, getBusOnRoute } from "../actions/busActions";

export default function Home() {
  const [date, setDate] = useState(dayjs());
  const [visible, setVisible] = useState(false);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const toggleVisibility = (selectedDate) => {
    setDate(selectedDate);
    setVisible(!visible);
  };

  const searchBus = () => {
    dispatch(
      getBusOnRoute(pickup, destination, dayjs(date).format("YYYY-M-D"))
    );
    navigation.navigate("SearchBus");

    // try {
    //   if (pickup && destination) {
    //     console.log("Buses on Route: ", DATA);
    //     dispatch(getBuses(DATA));
    //   } else {
    //     alert("Please enter a valid origin and destination");
    //   }
    // } catch (error) {
    //   console.error("Error fetching buses:", error);
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Bus tickets</Text>
        </View>

        <LocationSelector
          handleDatePicker={(visibility) => setVisible(visibility)}
          selectedDate={date}
          setPickupLocation={setPickup}
          setDestinationLocation={setDestination}
        />

        <PrimaryButton
          onClick={searchBus}
          isIconButton={true}
          iconName="search"
          title="Search Buses"
        />

        <Offers />
        <Card />
        <RateUs />

        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={styles.modalContainerStyle}
        >
          {/* Close Icon in the Top Right */}
          <TouchableOpacity
            style={styles.modalCloseIcon}
            onPress={() => setVisible(false)}
          >
            <Icon name="close" size={24} color={PrimaryColor} />
          </TouchableOpacity>

          <Text style={[styles.headerTitleText, { textAlign: "center" }]}>
            Pick a date to travel
          </Text>

          <CalendarPicker
            // mode="single"
            minDate={dayjs().toDate()}
            restrictMonthNavigation={true}
            width={width - 40}
            height={width - 40}
            // maxDate={d}
            // TODO:restrict maxdate to 4 months
            date={date}
            onDateChange={(params) => toggleVisibility(params)}
            selectedDayColor={PrimaryColor}
          />
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
