import { useState, useRef, useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, PanResponder } from "react-native";
import { styles } from "../../utils/styles";
import { PrimaryColor, PureWhite } from "../../utils/colors";
import TicketComponent from "../TicketComponent";
import { Tickets } from "../../faker/tickets";

export default function TabBarComponent({ tabs, tabData }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [tabLength, setTabLength] = useState(0);
  const [data, setData] = useState(Tickets);

  useEffect(() => {
    setTabLength(tabs.length)
  }, [tabs])

  // PanResponder (Now uses useCallback to get updated state)
  const panResponder = useCallback(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (evt, gestureState) => {
        console.log("Gesture dx:", gestureState.dx);
        console.log("Current tabIndex:", tabIndex, "Total tabs:", tabLength);

        if (gestureState.dx > 50 && tabIndex > 0) {
          // Swipe Right (Move to Previous Tab)
          console.log(`Swiped Right to Tab ${tabIndex - 1}`);
          toggleTabIndex(tabIndex - 1);
        } else if (gestureState.dx < -50 && tabIndex < tabLength - 1) {
          // Swipe Left (Move to Next Tab)
          console.log(`Swiped Left to Tab ${tabIndex + 1}`);
          toggleTabIndex(tabIndex + 1);
        }
      },
    }),
    [tabIndex, tabLength, toggleTabIndex]
  );


  // Function to update the tab index safely
  const toggleTabIndex = useCallback(
    (index) => {
      if (index >= 0 && index < tabLength) {
        setTabIndex(index);
        setData(index === 0 ? Tickets : []); // Change data based on tab
      }
    },
    [tabLength]
  );


  return (
    <View  {...panResponder.panHandlers} style={{ flex: 1 }}>
      <View style={styles.tabContainer}>
        {Array.isArray(tabs) &&
          tabs.map((tab, index) => (
            <TouchableOpacity
              activeOpacity={0.5}
              key={index}
              style={[
                styles.tab,
                {
                  borderBottomColor:
                    tab.index === tabIndex ? PrimaryColor : "#ededed",
                  borderBottomWidth: tab.index === tabIndex ? 4 : 0,
                },
              ]}
              onPress={() => toggleTabIndex(index)}
            >
              <Text style={styles.tabLink}>{tab.name}</Text>
            </TouchableOpacity>
          ))}
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <TicketComponent
            Traveldate={item.Traveldate}
            Travelday={item.Travelday}
            Transportname={item.Transportname}
            Departuretime={item.Departuretime}
            DepartureAddress={item.DepartureAddress}
            TimeDuration={item.TimeDuration}
            ArrivalTime={item.ArrivalTime}
            ArrivalAddress={item.ArrivalAddress}
            TicketNo={item.TicketNo}
            PNR={item.PNR}
            Fare={item.Fare}
            BusProvider={item.BusProvider}
            BusType={item.BusType}
            PickUpPoint={item.PickUpPoint}
            DropPoint={item.DropPoint}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View
            style={{
              backgroundColor: PureWhite,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: PrimaryColor, fontSize: 20 }}>
              Oops!!! No Details Available{" "}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
