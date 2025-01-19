import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import SeatIcon from "../../assets/seat.png";
import SeatDisabled from "../../assets/seats_disabled.png";
import SelectedSeatIcon from "../../assets/selected_seat.png";
import { styles } from "../../utils/styles";
import { useSelector } from "react-redux";

export default function SeatLayout({
  isDoubleDecker = false,
  handleSeatSelection,
}) {
  const [seatMap, setSeatMap] = useState([]);
  const { bookedSeats, seatLayout, total_seats } = useSelector(
    (state) => state.bus
  );
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    generateSeatMap();
  }, [seatLayout, total_seats]);

  const generateSeatMap = () => {
    const [columnsLeft, columnsRight] = seatLayout.split("x").map(Number);
    const rows = Math.ceil(total_seats / (columnsLeft + columnsRight));
    const newSeatMap = Array.from({ length: rows }, (_, rowIndex) => ({
      columnOne: Array.from(
        { length: columnsLeft },
        (_, colIndex) => `${rowIndex + 1}-${String.fromCharCode(65 + colIndex)}`
      ),
      columnTwo: Array.from(
        { length: columnsRight },
        (_, colIndex) =>
          `${rowIndex + 1}-${String.fromCharCode(65 + columnsLeft + colIndex)}`
      ),
    }));
    setSeatMap(newSeatMap);
  };

  const toggleSeatSelection = (seatId) => {
    setSeatMap((prevSeatMap) => {
      const updatedMap = prevSeatMap.map((row) => ({
        columnOne: row.columnOne.map((seat) =>
          seat === seatId
            ? seat.includes("selected")
              ? seat.replace("selected-", "")
              : `selected-${seat}`
            : seat
        ),
        columnTwo: row.columnTwo.map((seat) =>
          seat === seatId
            ? seat.includes("selected")
              ? seat.replace("selected-", "")
              : `selected-${seat}`
            : seat
        ),
      }));
      return updatedMap;
    });
    setSelectedSeats((prevSelected) => {
      if (prevSelected.includes(seatId)) {
        return prevSelected.filter((seat) => seat !== seatId);
      }
      return [...prevSelected, seatId];
    });
  };

  useEffect(() => {
    handleSeatSelection(selectedSeats);
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
                          : seat.includes("selected")
                          ? SelectedSeatIcon
                          : SeatIcon
                      }
                      style={styles.seatIcon}
                    />
                  </TouchableOpacity>
                ))}
              </View>

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
                          : seat.includes("selected")
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
