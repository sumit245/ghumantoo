import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { height, width } from '../../utils/styles';
import { LightGray, PureWhite } from '../../utils/colors';
import Steering from '../../assets/steering-wheel.png'
import SeaterAvailable from '../../assets/seat.png'
import SeaterDisabled from '../../assets/seats_disabled.png'
import SleeperAvailable from '../../assets/sleeper.png'
import SleeperDisabled from '../../assets/sleeper_disabled.png'
import FemaleSeat from '../../assets/rseat.png'
import VerticalSleeper from '../../assets/vseat.png'
// import SelectedSeat from '../../assets/selected_seat.png'
// import SelectedSleeper from '../../assets/selected_sleeper.png'
// import { StyleSheet } from 'react-native';

export default function SeatLayout({ lowerSeats = {}, upperSeats = {}, handleSeatSelection }) {
  const [hasLower, setHasLower] = useState(false)
  const [hasUpper, setHasUpper] = useState(false)

  useEffect(() => {
    setHasLower(checkHasSeats(lowerSeats));
    setHasUpper(checkHasSeats(upperSeats));
  }, [lowerSeats, upperSeats]);

  /**
   * Checks if any rows have seats data.
   */
  const checkHasSeats = (deckSeats) => {
    return deckSeats && Object.keys(deckSeats).some(
      key => Array.isArray(deckSeats[key]) && deckSeats[key].length > 0
    );
  };

  /**
    * Returns seat icon based on seat type and availability.
    */
  const getSeatIcon = (seat) => {
    const { is_sleeper, is_available, type } = seat;
    if (is_sleeper && is_available && type === "hseat") return SleeperAvailable;
    if (!is_sleeper && is_available && type === "nseat") return SeaterAvailable;
    if (!is_sleeper && !is_available && type === "bseat") return SeaterDisabled;
    if (is_sleeper && !is_available && type === "bhseat") return SleeperDisabled;
    if (!is_sleeper && is_available && type === "rseat") return FemaleSeat
    if (is_sleeper && is_available && type === "vseat") return VerticalSleeper
    if (is_sleeper && !is_available && type === "bvseat") return VerticalSleeper
    return null; // fallback
  };



  const renderSeats = (seatsData) => {
    let rowKeys = Object.keys(seatsData).map(Number).sort((a, b) => a - b);

    // Determine if rows are continuous or have missing keys
    const isContinuous = rowKeys.every((key, i, arr) =>
      i === 0 || key - arr[i - 1] === 1
    );

    // Calculate total rows to handle missing keys and central aisle
    const totalRows = isContinuous
      ? rowKeys.length + 1 // +1 for central aisle
      : Math.max(...rowKeys);

    // Rebuild rowKeys including aisle
    let finalRowKeys = [];
    if (isContinuous) {
      const mid = Math.ceil(rowKeys.length / 2);
      rowKeys.forEach((key, i) => {
        if (i === mid) finalRowKeys.push("aisle");
        finalRowKeys.push(key);
      });
    } else {
      for (let i = 1; i <= totalRows; i++) {
        if (!rowKeys.includes(i)) {
          finalRowKeys.push("aisle");
        } else {
          finalRowKeys.push(i);
        }
      }
    }

    // Find max seats count for bottom alignment
    const maxSeats = Math.max(
      ...Object.values(seatsData).map(row => row.length),
      0
    );

    return (
      <View style={{
        flexDirection: "row-reverse",
        alignItems: "flex-end",
      }}>
        {finalRowKeys.map((rowKey, index) => {
          if (rowKey === "aisle") {
            // Render aisle space
            return (
              <View key={`aisle-${index}`} style={{ width: 20 }} />
            );
          }

          const rowSeats = seatsData[rowKey] || [];
          const missingSeats = maxSeats - rowSeats.length;

          return (
            <View key={rowKey} style={{
              flexDirection: "column",
              justifyContent: "flex-end",
              margin: 2,
            }}>
              {/* Empty slots to push seats to bottom */}
              {/* {[...Array(missingSeats)].map((_, i) => (
                <View key={`empty-${i}`} style={{ width: 40, height: 40, margin: 2 }} />
              ))} */}

              {/* Render actual seats */}
              {rowSeats.map((seat, seatIndex) => (
                <TouchableOpacity
                  key={seatIndex}
                  style={{
                    width: (seat.type === "vseat" || seat.type === "bvseat") ? 80 : 40,
                    height: (seat.type === "bseat" || seat.type === "nseat" || seat.type === "rseat" || seat.type === "brseat") ? 40 : 60,
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 4,
                    marginHorizontal: 2
                  }}
                  onPress={() => handleSeatSelection(seat)}
                >
                  <Image
                    source={getSeatIcon(seat)}
                    style={{
                      width: (seat.type === "vseat" || seat.type === "bvseat") ? 80 : 40,
                      height: (seat.type === "bseat" || seat.type === "nseat" || seat.type === "rseat" || seat.type === "brseat") ? 40 : 60,
                    }}
                    resizeMode='contain'
                  />
                  <Text style={{ color: LightGray, position: 'absolute', top: "20%" }}>
                    {seat.is_available && seat.seat_id}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}
      </View>
    );
  };

  const isDoubleDecker = hasLower && hasUpper;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexDirection: 'row', justifyContent: isDoubleDecker ? 'space-between' : 'center', backgroundColor: "red", padding: 2, overflow: 'scroll' }}>
      {
        hasLower && (
          <View style={{ minWidth: width / 1.8, backgroundColor: PureWhite, borderRadius: 16, padding: 8, marginHorizontal: 4, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: LightGray, height: 38, paddingBottom: 4 }}>
              <Text>Deck 1</Text>
              <Image
                source={Steering} // Change from src to source
                style={{ height: 34, width: 36 }} // Use style instead of individual props
                resizeMode='contain'
              />
            </View>
            {/* Insert lowerSeats here dynamically */}
            {renderSeats(lowerSeats)}
          </View>
        )
      }
      {
        hasUpper && (
          <View style={{ minWidth: width / 1.8, backgroundColor: PureWhite, borderRadius: 16, padding: 8, marginHorizontal: 4, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: LightGray, height: 38, paddingBottom: 4 }}>
              <Text>Deck 2</Text>
            </View>
            {renderSeats(upperSeats)}
            {/* Insert upperSeats here dynamically */}
          </View>
        )
      }
    </ScrollView>
  )
}