import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { Modal, Snackbar } from "react-native-paper";
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
import { Black1Color, PrimaryColor, WhiteColor } from "../utils/colors";
import { useDispatch } from "react-redux";
import { getBuses, getBusOnRoute } from "../actions/busActions";
import { typography } from "../utils/typography";
import { spacing } from "../utils/spacing.styles";

export default function Home() {
  const [date, setDate] = useState(dayjs());
  const [visible, setVisible] = useState(false);
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const toggleVisibility = (selectedDate) => {
    setDate(selectedDate);
  };

  const onDismissSnackBar = () => setIsError(false);

  const searchBus = () => {
    if (!pickup) {
      setErrorMsg("Source of journey cannot be empty");
      setIsError(true);
      return;
    }
    if (!destination) {
      setErrorMsg("Destination of journey cannot be empty");
      setIsError(true);
      return;
    }
    if (pickup === destination) {
      setErrorMsg("Source and destination cannot be same");
      setIsError(true);
      return;
    }

    dispatch(
      getBusOnRoute(
        pickup,
        destination,
        dayjs(date).format("YYYY-MM-DD").toString()
      )
    );
    navigation.navigate("SearchBus");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            spacing.p2,
            {
              backgroundColor: WhiteColor,
              height: 60,
            },
          ]}
        >
          <Text style={[typography.font24, typography.textBold]}>
            Bus Tickets
          </Text>
        </View>

        <LocationSelector
          handleDatePicker={(visibility) => setVisible(visibility)}
          selectedDate={date}
          setPickupLocation={setPickup}
          setDestinationLocation={setDestination}
          setDate={(val) => setDate(val)}
          toggleModalVisibile={(val) => setVisible(val)}
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
          <TouchableOpacity
            style={styles.modalCloseIcon}
            onPress={() => setVisible(false)}
          >
            <Icon name="close" size={24} color={PrimaryColor} />
          </TouchableOpacity>
          <Text
            style={[
              typography.font22,
              {
                color: Black1Color,
                textAlign: "center",
              },
            ]}
          >
            Pick a date to travel
          </Text>

          <CalendarPicker
            minDate={dayjs().toDate()}
            restrictMonthNavigation={true}
            width={width - 40}
            height={width - 40}
            date={date}
            onDateChange={(params) => toggleVisibility(params)}
            selectedDayColor={PrimaryColor}
          />
        </Modal>
      </ScrollView>
      <Snackbar
        style={{ width: width - 20, opacity: 0.9 }}
        visible={isError}
        onDismiss={onDismissSnackBar}
        action={{
          label: "OK",
          onPress: onDismissSnackBar,
        }}
        duration={1000}
      >
        {errMsg}
      </Snackbar>
    </SafeAreaView>
  );
}
