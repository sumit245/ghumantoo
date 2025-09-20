/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { width } from '../../utils/styles';
import { LightGray, PureWhite } from '../../utils/colors';

// --- SVG Component Imports ---
import Steering from '../../assets/icons/Steering';
import SeaterIcon from '../../assets/icons/SeaterIcon';
import SleeperIcon from '../../assets/icons/HSleeperIcon'; // Assuming you have a sleeper SVG as well


// Centralizing colors makes theme changes easy
const SEAT_COLORS = {
  available: { bg: '#dcfce7', border: '#22c55e' },
  selected: { bg: 'red', border: 'black' },
  disabled: { bg: '#f1f5f9', border: '#94a3b8' },
  female: { bg: '#fce7f3', border: '#db2777' }
};

// --- Sub-Component: Seat (Refactored for SVG) ---
const Seat = React.memo(({ seat, onSelect, isSelected }) => {

  const isAvailable = seat.is_available;
  const isFemale = seat.type === 'rseat' || seat.type === 'brseat';

  // 3. Select the correct color set based on state
  let seatColors;
  if (!isAvailable) {
    seatColors = SEAT_COLORS.disabled;
  } else if (isSelected) {
    seatColors = SEAT_COLORS.selected;
  } else if (isFemale) {
    seatColors = SEAT_COLORS.female;
  } else {
    seatColors = SEAT_COLORS.available;
  }

  // TODO: Basically there are three types of seats: vseat (for all vertical seats, normal sleepers), bseat(for square seats, basically seaters), hseat(for horizontal sleepers, especially either at end of the bus or at the start with two seats facing each other) We need to handle all three types here.
  
  // 4. Determine seat dimensions based on type
  const isVertical = seat.type === 'vseat' || seat.type === 'bvseat';
  const isSeater = seat.type === 'bseat' || seat.type === 'nseat' || seat.type === 'rseat' || seat.type === 'brseat';
  const seatStyle = {
    width: isVertical ? 80 : 40,
    height: isSeater ? 40 : 60,
  };

  return (
    <TouchableOpacity
      style={[styles.seatTouchable, seatStyle]}
      onPress={() => onSelect(seat)}
      disabled={!isAvailable}
    >
      {/* 5. Conditionally render the correct SVG component with dynamic colors */}
      {seat.is_sleeper ? (
        <SleeperIcon bgColor={seatColors.bg} borderColor={seatColors.border} width={seatStyle.width}  height={seatStyle.height} selected={isSelected} isVertical={isVertical} />
      ) : (
        <SeaterIcon bgColor={seatColors.bg} borderColor={seatColors.border} selected={isSelected} />
      )}
      {isAvailable && (
        <Text style={styles.seatIdText}>{seat.seat_id}</Text>
      )}
    </TouchableOpacity>
  );
});
Seat.displayName = 'Seat';

// --- Sub-Component: Deck (Refactored to handle selection) ---
const Deck = React.memo(({ deckType, seatsData, onSeatSelect, showSteering, selectedSeats }) => {
  const renderedSeats = useMemo(() => {
    if (!seatsData || Object.keys(seatsData).length === 0) return null;

    // ... (The complex layout logic for rows and aisles remains unchanged)
    let rowKeys = Object.keys(seatsData).map(Number).sort((a, b) => a - b);
    const isContinuous = rowKeys.every((key, i, arr) => i === 0 || key - arr[i - 1] === 1);
    const totalRows = isContinuous ? rowKeys.length + 1 : Math.max(...rowKeys);
    let finalRowKeys = [];
    if (isContinuous) {
      const mid = Math.ceil(rowKeys.length / 2);
      rowKeys.forEach((key, i) => {
        if (i === mid) finalRowKeys.push('aisle');
        finalRowKeys.push(key);
      });
    } else {
      for (let i = 1; i <= totalRows; i++) {
        finalRowKeys.push(rowKeys.includes(i) ? i : 'aisle');
      }
    }

    return (
      <View style={styles.seatsContainer}>
        {finalRowKeys.map((rowKey, index) => {
          if (rowKey === 'aisle') {
            return <View key={`aisle-${index}`} style={styles.aisle} />;
          }
          const rowSeats = seatsData[rowKey] || [];
          return (
            <View key={rowKey} style={styles.seatRow}>
              {rowSeats.map((seat) => {
                // 6. Check if the current seat is in the selected list
                const isSelected = selectedSeats.some(s => s.seat_id === seat.seat_id);
                return (
                  <Seat
                    key={seat.seat_id}
                    seat={seat}
                    onSelect={onSeatSelect}
                    isSelected={isSelected} // Pass the selection state down
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    );
  }, [seatsData, onSeatSelect, selectedSeats]); // Add selectedSeats to dependency array

  return (
    <View style={styles.deckContainer}>
      <View style={styles.deckHeader}>
        <Text>{deckType}</Text>
        {showSteering && (
          <Steering style={styles.steeringImage} width={36} height={36} /> // 6. Render steering image if applicable
        )}
      </View>
      {renderedSeats}
    </View>
  );
});
Deck.displayName = 'Deck';

// --- Main Component: SeatLayout (Refactored to handle selection) ---
export default function SeatLayout({ lowerSeats = {}, upperSeats = {}, handleSeatSelection, selectedSeats = [] }) {
  // ... (The logic to handle single vs. double deck remains unchanged)
  const [displayData, setDisplayData] = useState({ lower: null, upper: null, isDouble: false });
  useEffect(() => {
    const hasLower = lowerSeats && Object.keys(lowerSeats).length > 0;
    const hasUpper = upperSeats && Object.keys(upperSeats).length > 0;
    if (hasLower && hasUpper) setDisplayData({ lower: lowerSeats, upper: upperSeats, isDouble: true });
    else if (hasLower) setDisplayData({ lower: lowerSeats, upper: null, isDouble: false });
    else if (hasUpper) setDisplayData({ lower: upperSeats, upper: null, isDouble: false });
    else setDisplayData({ lower: null, upper: null, isDouble: false });
  }, [lowerSeats, upperSeats]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.scrollViewContent,
        { justifyContent: displayData.isDouble ? 'space-between' : 'center' }
      ]}
    >
      {displayData.lower && (
        <Deck
          deckType={displayData.isDouble ? 'Lower Deck' : 'Deck'}
          seatsData={displayData.lower}
          onSeatSelect={handleSeatSelection}
          showSteering={true}
          selectedSeats={selectedSeats} // 7. Pass selection state down
        />
      )}
      {displayData.upper && (
        <Deck
          deckType="Upper Deck"
          seatsData={displayData.upper}
          onSeatSelect={handleSeatSelection}
          showSteering={false}
          selectedSeats={selectedSeats} // 7. Pass selection state down
        />
      )}
    </ScrollView>
  );
}

// --- StyleSheet ---
const styles = StyleSheet.create({
  scrollViewContent: { flexGrow: 1, flexDirection: 'row', padding: 2 },
  deckContainer: { minWidth: width / 1.8, backgroundColor: PureWhite, borderRadius: 16, padding: 4, marginHorizontal: 4, justifyContent: 'flex-start',maxHeight:'auto' },
  deckHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: LightGray, height: 38, paddingBottom: 4 },
  steeringImage: { height: 34, width: 36 },
  seatsContainer: { flexDirection: 'row-reverse', alignItems: 'flex-end', marginTop: 10 },
  aisle: { width: 20 },
  seatRow: { flexDirection: 'column', justifyContent: 'flex-end', margin: 2 },
  seatTouchable: { justifyContent: 'center', alignItems: 'center', margin: 2, },
  seatIdText: { color: LightGray, position: 'absolute', top: '20%', fontWeight: 'bold', fontSize: 12 },
});
