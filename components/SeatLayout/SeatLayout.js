import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { useSelector } from "react-redux";
import { styles } from "../../utils/styles";
import { spacing } from "../../utils/spacing.styles";
import SeatIcon from "../../assets/seat.png";
import SeatSleeperIcon from "../../assets/sleeper.png";
import SeatDisabled from "../../assets/seats_disabled.png";
import SelectedSeatIcon from "../../assets/selected_seat.png";

export default function SeatLayout({ handleSeatSelection }) {
  const { seatLayout } = useSelector((state) => state.bus);
  const [seatMapLower, setSeatMapLower] = useState([]);
  const [seatMapUpper, setSeatMapUpper] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const lower = seatLayout?.lower_deck?.rows || {};
    const upper = seatLayout?.upper_deck?.rows || {};
    console.log("API Lower Deck Seat Rows: ", lower);
    console.log("API Upper Deck Seat Rows: ", upper);

    const lowerDeck = Object.values(lower);
    const upperDeck = Object.values(upper);

    // Flatten to count total seats parsed
    const lowerSeats = lowerDeck.flat().length;
    const upperSeats = upperDeck.flat().length;
    console.log(`Parsed Lower Deck Seats: ${lowerSeats}`);
    console.log(`Parsed Upper Deck Seats: ${upperSeats}`);
    setSeatMapLower(lowerDeck);
    setSeatMapUpper(upperDeck);
  }, [seatLayout]);

  const toggleSeatSelection = (seatId) => {
    const cleanId = seatId.trim();
    setSelectedSeats((prev) =>
      prev.includes(cleanId)
        ? prev.filter((s) => s !== cleanId)
        : [...prev, cleanId]
    );
  };

  useEffect(() => {
    handleSeatSelection(selectedSeats);
  }, [selectedSeats]);

  const getSeatIcon = (seat) => {
    if (!seat.is_available) return SeatDisabled;
    if (selectedSeats.includes(seat.seat_id)) return SelectedSeatIcon;
    return seat.category === "sleeper" ? SeatSleeperIcon : SeatIcon;
  };

  const renderDeck = (deckData, title) => (
    <View style={{ marginBottom: 24 }}>
      <Text style={[styles.deckTitle, spacing.mb1]}>{title}</Text>
      <View style={styles.seatMapContainer}>
        {deckData.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {rowIndex === 2 && ( // For example: Insert aisle after row 2
              <View style={styles.aisle} />
            )}
            {row.map((seat, colIndex) => (
              <TouchableOpacity
                key={seat.seat_id + colIndex}
                style={[
                  spacing.p1,
                  rowIndex % 2 === 0 ? styles.alignRight : styles.alignLeft, // Example alignment logic
                ]}
                disabled={!seat.is_available}
                onPress={() => toggleSeatSelection(seat.seat_id)}
              >
                <Image source={getSeatIcon(seat)} style={styles.seatIcon} />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );


  return (
    <View style={[styles.container, spacing.p1, spacing.br2, spacing.bw1]}>
      {seatMapLower.length > 0 && renderDeck(seatMapLower, "Lower Deck")}
      {seatMapUpper.length > 0 && renderDeck(seatMapUpper, "Upper Deck")}
    </View>
  );
}
