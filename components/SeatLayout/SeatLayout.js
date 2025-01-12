import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import SleeperIcon from "../../assets/sleeper.png";
import SeatIcon from "../../assets/seat.png";
import SelectedSleeperIcon from "../../assets/selected_sleeper.png";
import SeatDisabled from '../../assets/seats_disabled.png'
import SelectedSeatIcon from "../../assets/selected_seat.png";
import { styles } from '../../utils/styles';
import { useSelector } from "react-redux";

export default function SeatLayout({
  isDoubleDecker = false,
  deckPosition = 0,
  isSleeper = false,
  handleSeatSelection
}) {
  const [seatMap, setSeatMap] = useState([]);
  const { bookedSeats, seatLayout, total_seats } = useSelector(state => state.bus);
  const [selectedSeats, setSelectedSeats] = useState([])

  // Generate seat map dynamically
  useEffect(() => {
    generateSeatMap();
  }, [seatLayout, total_seats]);

  const generateSeatMap = () => {
    const [columnsLeft, columnsRight] = seatLayout.split("x").map(Number); // Split "2x2" into [2, 2]
    const rows = Math.ceil(total_seats / (columnsLeft + columnsRight)); // Calculate number of rows
    const newSeatMap = Array.from({ length: rows }, (_, rowIndex) => ({
      columnOne: Array.from({ length: columnsLeft }, (_, colIndex) => `${rowIndex + 1}-${String.fromCharCode(65 + colIndex)}`), // Assign IDs (e.g., 1-A, 1-B)
      columnTwo: Array.from({ length: columnsRight }, (_, colIndex) => `${rowIndex + 1}-${String.fromCharCode(65 + columnsLeft + colIndex)}`), // Assign IDs (e.g., 1-C, 1-D)
    }));
    setSeatMap(newSeatMap);
  };

  // Toggle seat selection
  const toggleSeatSelection = (seatId) => {
    setSeatMap((prevSeatMap) => {
      const updatedMap = prevSeatMap.map(row => ({
        columnOne: row.columnOne.map(seat => (seat === seatId ? (seat.includes("selected") ? seat.replace("selected-", "") : `selected-${seat}`) : seat)),
        columnTwo: row.columnTwo.map(seat => (seat === seatId ? (seat.includes("selected") ? seat.replace("selected-", "") : `selected-${seat}`) : seat)),
      }));
      return updatedMap;
    });
    setSelectedSeats((prevSelected) => {
      if (prevSelected.includes(seatId)) {
        // If seat is already selected, remove it
        return prevSelected.filter((seat) => seat !== seatId);
      }
      return [...prevSelected, seatId]; // Add the seat to selectedSeats
    });
  };

  useEffect(() => {
    handleSeatSelection(selectedSeats)
  }, [selectedSeats]);

  const isSeatBooked = (seatId) => bookedSeats.includes(seatId);

  return (
    <View style={[styles.container, styles.seatLayoutContainer]}>
      {!isDoubleDecker && (
        <View style={styles.driverContainer}>
          <Image
            source={require("../../assets/steering-wheel.png")}
            style={styles.steeringWheel}
          />
        </View>
      )}

      {seatMap.length > 0 && (
        <View style={styles.seatMapContainer}>
          {seatMap.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {/* Render Column One */}
              <View style={styles.column}>
                {row.columnOne.map((seat, colIndex) => (
                  <TouchableOpacity
                    key={colIndex}
                    style={styles.seatButton}
                    disabled={isSeatBooked(seat)} // Disable button if seat is booked
                    onPress={() => toggleSeatSelection(seat)}
                  >
                    <Image
                      source={
                        isSeatBooked(seat)
                          ? SeatDisabled // Booked Seat Icon
                          : seat.includes("selected")
                            ? SelectedSeatIcon // Selected Seat Icon
                            : SeatIcon // Available Seat Icon
                      }
                      style={styles.seatIcon}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              {/* Render Column Two */}
              <View style={styles.column}>
                {row.columnTwo.map((seat, colIndex) => (
                  <TouchableOpacity
                    key={colIndex}
                    style={styles.seatButton}
                    disabled={isSeatBooked(seat)} // Disable button if seat is booked
                    onPress={() => toggleSeatSelection(seat)}
                  >
                    <Image
                      source={
                        isSeatBooked(seat)
                          ? SeatDisabled // Booked Seat Icon
                          : seat.includes("selected")
                            ? SelectedSeatIcon // Selected Seat Icon
                            : SeatIcon // Available Seat Icon
                      }
                      style={styles.seatIcon}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
