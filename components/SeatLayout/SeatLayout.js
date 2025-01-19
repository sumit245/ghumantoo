import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import SeatIcon from "../../assets/seat.png";
import SeatDisabled from '../../assets/seats_disabled.png';
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
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Generate seat map dynamically
  useEffect(() => {
    generateSeatMap();
  }, [seatLayout, total_seats]);

  const generateSeatMap = () => {
    const [columnsLeft, columnsRight] = seatLayout.split("x").map(Number);
    const rows = Math.ceil(total_seats / (columnsLeft + columnsRight));
    const newSeatMap = Array.from({ length: rows }, (_, rowIndex) => ({
      columnOne: Array.from({ length: columnsLeft }, (_, colIndex) => `${rowIndex + 1}-${String.fromCharCode(65 + colIndex)}`.trim()),
      columnTwo: Array.from({ length: columnsRight }, (_, colIndex) => `${rowIndex + 1}-${String.fromCharCode(65 + columnsLeft + colIndex)}`.trim()),
    }));
    setSeatMap(newSeatMap);
  };

  // Toggle seat selection
  const toggleSeatSelection = (seatId) => {
    setSelectedSeats(prevSelected => {
      const cleanSeatId = seatId.trim(); // Trim whitespace before processing
      return prevSelected.includes(cleanSeatId)
        ? prevSelected.filter(seat => seat !== cleanSeatId) // Remove seat from array
        : [...prevSelected, cleanSeatId]; // Add seat to array
    });
  };

  useEffect(() => {
    handleSeatSelection(selectedSeats);
  }, [selectedSeats]);

  const isSeatBooked = (seatId) => bookedSeats.includes(seatId.trim()); // Trim whitespace before checking

  return (
    <View style={[styles.container, styles.seatLayoutContainer]}>
      {!isDoubleDecker && (
        <View style={styles.driverContainer}>
          <Image source={require("../../assets/steering-wheel.png")} style={styles.steeringWheel} />
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
                    disabled={isSeatBooked(seat)}
                    onPress={() => toggleSeatSelection(seat)}
                  >
                    <Image
                      source={
                        isSeatBooked(seat)
                          ? SeatDisabled
                          : selectedSeats.includes(seat)
                            ? SelectedSeatIcon
                            : SeatIcon
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
                    disabled={isSeatBooked(seat)}
                    onPress={() => toggleSeatSelection(seat)}
                  >
                    <Image
                      source={
                        isSeatBooked(seat)
                          ? SeatDisabled
                          : selectedSeats.includes(seat)
                            ? SelectedSeatIcon
                            : SeatIcon
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
