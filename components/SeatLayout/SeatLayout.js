import React from 'react';
import { ScrollView } from 'react-native';
import { spacing } from '../../utils/styles';
import Deck from './Deck';
import { useSeatLayoutData } from './useSeatLayoutData';

/**
 * SeatLayout Component (Orchestrator)
 * 
 * Main component that orchestrates seat display
 * Handles single vs double deck layout
 * All sub-components (Seat, Deck) are now modular and reusable
 * 
 * @param {Object} lowerSeats - Lower deck seat data
 * @param {Object} upperSeats - Upper deck seat data
 * @param {Function} handleSeatSelection - Callback for seat selection
 * @param {Array} selectedSeats - Array of selected seats
 */
export default function SeatLayout({
  lowerSeats = {},
  upperSeats = {},
  handleSeatSelection,
  selectedSeats = [],
}) {
  // Use custom hook to manage display data
  const displayData = useSeatLayoutData(lowerSeats, upperSeats);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        spacing.p1,
        {
          flexGrow: 1,
          flexDirection: 'row',
          justifyContent: displayData.isDouble ? 'space-between' : 'center',
        },
      ]}
    >
      {displayData.lower && (
        <Deck
          deckType={displayData.isDouble ? 'Lower Deck' : 'Deck'}
          seatsData={displayData.lower}
          onSeatSelect={handleSeatSelection}
          showSteering={true}
          selectedSeats={selectedSeats}
        />
      )}
      {displayData.upper && (
        <Deck
          deckType="Upper Deck"
          seatsData={displayData.upper}
          onSeatSelect={handleSeatSelection}
          showSteering={false}
          selectedSeats={selectedSeats}
        />
      )}
    </ScrollView>
  );
}
