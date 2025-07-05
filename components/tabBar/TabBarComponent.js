import { useState, useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { styles } from "../../utils/styles";
import { PrimaryColor } from "../../utils/colors";
import TicketComponent from "../TicketComponent";
import { Tickets } from "../../faker/tickets";
import { typography } from "../../utils/typography";
import { spacing } from "../../utils/spacing.styles";

export default function TabBarComponent({ tabs, tabData }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [tabLength, setTabLength] = useState(0);
  const [data, setData] = useState(Tickets);

  useEffect(() => {
    setTabLength(tabs.length);
  }, [tabs]);

  // Function to update the tab index quickly
  const toggleTabIndex = useCallback(
    (index) => {
      if (index >= 0 && index < tabLength) {
        setTabIndex(index);
        setData(index === 0 ? [] : []);
      }
    },
    [tabLength]
  );

  return (
    <>
      <View style={styles.tabContainer}>
        {Array.isArray(tabs) &&
          tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.5}
              style={[
                spacing.p2,
                spacing.mh3,
                {
                  borderBottomColor:
                    tabIndex === index ? PrimaryColor : "#ededed",
                  borderBottomWidth: tabIndex === index ? 2 : 0,
                },
              ]}
              onPress={() => toggleTabIndex(index)}
            >
              <Text
                style={[
                  typography.font20,
                  {
                    textAlign: "center",
                    textTransform: "uppercase",
                  },
                ]}
              >
                {tab.name}
              </Text>
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
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: PrimaryColor,
                fontSize: 20,
                marginTop: 200,
              }}
            >
              You do not have any trips
            </Text>
          </View>
        )}
      />
    </>
  );
}
