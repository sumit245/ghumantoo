import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Share, Alert, ActivityIndicator } from 'react-native';
import { Divider } from 'react-native-paper';
import { styles as globalStyles, spacing, typography, Black1Color, WhiteColor, } from '../../utils/styles';
import dayjs from 'dayjs'; // Import dayjs for date formatting
import { DangerColor, SuccessColor } from '../../utils/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { cancelTicket } from '../../actions/busActions';

// --- Sub-Component for a single detail row in the footer ---
const TicketDetailRow = ({ label, value, isLast = false }) => (
  <>
    <View style={[globalStyles.row, spacing.pv3]}>
      <Text style={[typography.font14, { color: Black1Color }]}>{label}</Text>
      <Text style={[typography.font14, typography.textBold, { flex: 1, textAlign: 'right', color: Black1Color }]}>{value}</Text>
    </View>
    {!isLast && <Divider />}
  </>
);

// --- Sub-Component for the perforated divider ---
const TicketCardDivider = () => (
  <View style={globalStyles.cardDivider}>
    <View style={[{ position: 'relative', top: -20, height: 40, width: 40, borderRadius: 20, backgroundColor: WhiteColor }]} />
    <View style={[{ position: 'relative', top: -20, height: 40, width: 40, borderRadius: 20, backgroundColor: WhiteColor }]} />
  </View>
);

// --- Sub-Component for the Ticket Header ---
const TicketHeader = ({
  travel_name,
  bus_type,
  Traveldate,
  Travelday,
  Departuretime,
  TimeDuration,
  arrival_time,
  DepartureAddress,
  BoardingPointAddress,
  BoardingPointName,
  ArrivalAddress,
  DroppingPointAddress,
  DroppingPointName,
}) => (
  <View style={globalStyles.ticketCardHeader}>
    <View style={globalStyles.row}>
      <View>
        <Text style={globalStyles.stdText}>{travel_name}</Text>
        <Text style={[globalStyles.stdText, typography.font10]}>{bus_type}</Text>
      </View>
      <View>
        <Text style={globalStyles.stdText}>{Traveldate}</Text>
        <Text style={[globalStyles.stdText, typography.font10]}>{Travelday}</Text>
      </View>
    </View>

    <Divider style={[spacing.mv2]} />

    <View style={[globalStyles.row]}>
      <Text style={[globalStyles.stdText, typography.font20]}>{Departuretime}</Text>
      <Text style={[globalStyles.stdText, { textDecorationLine: 'underline' }]}>{TimeDuration} hrs</Text>
      <Text style={[globalStyles.stdText, typography.font20]}>{arrival_time}</Text>
    </View>
    <View style={[globalStyles.row, spacing.mb4]}>
      <View style={{ flexWrap: 'wrap', maxWidth: '48%' }}>
        <Text style={[globalStyles.stdText, typography.font12, { flexWrap: 'wrap', maxWidth: '100%' }]}>From: {"\n"}{DepartureAddress}</Text>
        <Text style={[globalStyles.stdText, typography.font10, { flexWrap: 'wrap', maxWidth: '60%' }]}>{BoardingPointAddress}, {BoardingPointName}</Text>
      </View>
      <View style={{ flexWrap: 'wrap', maxWidth: '48%' }}>
        <Text style={[globalStyles.stdText, typography.font12, { flexWrap: 'wrap', maxWidth: '100%' }]}>To: {"\n"}{ArrivalAddress}</Text>
        <Text style={[globalStyles.stdText, typography.font10, { flexWrap: 'wrap', maxWidth: '80%' }]}>{DroppingPointAddress},{DroppingPointName}</Text>
      </View>
    </View>
  </View>
);

// --- Sub-Component for the Ticket Footer ---
const TicketFooter = ({ Passenger, PNR, Fare }) => {
  // Process passenger data to get seat numbers and lead passenger name
  const seatNames = Passenger.map(p => p.Seat.SeatName).join(', ');
  const leadPassenger = Passenger.find(p => p.LeadPassenger);
  const leadPassengerName = leadPassenger ? `${leadPassenger.Title} ${leadPassenger.FirstName} ${leadPassenger.LastName}` : 'N/A';

  const details = [
    { label: 'Passenger', value: `${leadPassengerName}` },
    { label: 'Seat(s)', value: seatNames || 'N/A' },
    { label: 'PNR', value: PNR },
    { label: 'Total Fare :', value: `₹${Fare.toFixed(2)}` },
  ];

  return (
    <View style={globalStyles.ticketCardFooter}>
      {details.map((item, index) => (
        <TicketDetailRow
          key={item.label}
          label={item.label}
          value={item.value}
          isLast={index === details.length - 1}
        />
      ))}
      <Text style={[typography.font14, { textAlign: 'center', marginTop: 20, color: Black1Color }]}>
        Safe travels! Keep this ticket for your journey.
      </Text>
    </View>
  );
};

const TicketActions = ({ onPrint, onCancel, onSendWhatsapp, isCancelling = false }) => {
  return (
    <View style={globalStyles.ticketCardFooter}>
      <View style={[globalStyles.row, { justifyContent: 'flex-start' }]}>
        
        {/* TODO: This is a PrimaryButton use from components/buttons/PrimaryButton */} 
        <TouchableOpacity
          style={[spacing.bw05, spacing.p2, spacing.mh2, globalStyles.row, spacing.br1, { alignItems: 'center', borderColor: Black1Color, width: "30%", justifyContent: 'flex-start' }]}
          onPress={onPrint}
          disabled={isCancelling}
        >
          <Icon name="print-outline" size={20} style={spacing.ph1} color={Black1Color} />
          <Text style={[globalStyles.actionText, spacing.ph1, { color: Black1Color }]}>Print</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[spacing.bw05, spacing.p2, spacing.mh2, globalStyles.row, spacing.br1, { alignItems: 'center', borderColor: DangerColor, width: "30%", justifyContent: 'flex-start', opacity: isCancelling ? 0.6 : 1 }]}
          onPress={onCancel}
          disabled={isCancelling}
        >
          {isCancelling ? (
            <ActivityIndicator size="small" color={DangerColor} style={spacing.ph1} />
          ) : (
            <Icon name="close-outline" size={20} style={spacing.ph1} color={DangerColor} />
          )}
          <Text style={[globalStyles.actionText, spacing.ph1, { color: DangerColor }]}>
            {isCancelling ? 'Cancelling...' : 'Cancel'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[spacing.bw05, spacing.p2, spacing.mh2, globalStyles.row, spacing.br1, { alignItems: 'center', borderColor: SuccessColor, width: "30%", justifyContent: 'flex-start' }]}
          onPress={onSendWhatsapp}
          disabled={isCancelling}
        >
          <Icon name="logo-whatsapp" size={20} style={spacing.ph1} color={SuccessColor} />
          <Text style={[globalStyles.actionText, spacing.ph1, { color: SuccessColor }]}>WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

// --- Main Ticket Component ---
// This component now accepts the entire ticket object and processes the data.
export default function TicketComponent({ ticket, onCancel: onCancelCallback }) {
  const [isCancelling, setIsCancelling] = useState(false);
  const ticketViewRef = useRef(null);

  if (!ticket) {
    return null; // Return nothing if ticket data is not available
  }

  const {
    travel_name = "Opera Travels",
    bus_type = "AC Sleeper",
    date_of_journey = "2023-10-15",
    departure_time = "2023-10-15T22:30:00",
    duration = "600",
    arrival_time = "2023-10-16T08:30:00",
    boarding_point = "City A",
    dropping_point = "City B",
    passengers = [],
    pnr_number = "PNR123456",
    boarding_point_details = { CityPointName: "Main Bus Stand", CityPointAddress: "123 Main St" },
    dropping_point_details = { CityPointName: "Central Park", CityPointLocation: "456 Park Ave" },
    total_fare,
    BookingId,
    SearchTokenId,
  } = ticket;

  // Format time - handle both ISO strings and already formatted strings like "03:08 AM"
  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    // Check if already formatted (contains "AM" or "PM")
    if (typeof timeStr === 'string' && (timeStr.includes('AM') || timeStr.includes('PM'))) {
      return timeStr;
    }
    // Try to parse as ISO date string
    try {
      const parsed = dayjs(timeStr);
      if (parsed.isValid()) {
        return parsed.format('hh:mm A');
      }
    } catch (e) {
      // If parsing fails, return as is
    }
    return timeStr;
  };

  // Format date - handle various date formats
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const parsed = dayjs(dateStr);
      if (parsed.isValid()) {
        return parsed.format('DD MMM YYYY');
      }
    } catch (e) {
      // If parsing fails, return as is
    }
    return dateStr;
  };

  const formatDay = (dateStr) => {
    if (!dateStr) return "";
    try {
      const parsed = dayjs(dateStr);
      if (parsed.isValid()) {
        return parsed.format('dddd');
      }
    } catch (e) {
      // If parsing fails, return as is
    }
    return "";
  };

  // TODO: Use api to get the ticket by booking id and print the ticket
  const handlePrint = async () => {
    try {
      const seatNames = passengers.map(p => p.Seat?.SeatName || p.SeatName || 'N/A').join(', ');
      const leadPassenger = passengers.find(p => p.LeadPassenger) || passengers[0] || {};
      const passengerName = leadPassenger ? `${leadPassenger.FirstName || ''} ${leadPassenger.LastName || ''}`.trim() : 'N/A';

      const ticketText = `
BUS TICKET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Travel Name: ${travel_name}
Bus Type: ${bus_type}
Date: ${formatDate(date_of_journey)}
Day: ${formatDay(date_of_journey)}

Departure: ${formatTime(departure_time)}
Arrival: ${formatTime(arrival_time)}
Duration: ${duration} minutes

From: ${boarding_point}
${boarding_point_details.CityPointName ? `Boarding Point: ${boarding_point_details.CityPointName}` : ''}
${boarding_point_details.CityPointAddress ? `Address: ${boarding_point_details.CityPointAddress}` : ''}

To: ${dropping_point}
${dropping_point_details.CityPointName ? `Dropping Point: ${dropping_point_details.CityPointName}` : ''}
${dropping_point_details.CityPointLocation ? `Address: ${dropping_point_details.CityPointLocation}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Passenger: ${passengerName}
Seat(s): ${seatNames || 'N/A'}
PNR: ${pnr_number}
Total Fare: ₹${(total_fare || 0).toFixed(2)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Safe travels! Keep this ticket for your journey.
      `.trim();

      await Share.share({
        message: ticketText,
        title: 'Bus Ticket',
      });
    } catch (error) {
      if (__DEV__) {
        console.error('Print/Share error:', error);
      }
      Alert.alert('Error', 'Unable to share ticket. Please try again.');
    }
  };

  // Handle Cancel Ticket
  const handleCancel = async () => {
    if (!BookingId || !SearchTokenId) {
      Alert.alert('Error', 'Missing booking information. Cannot cancel ticket.');
      return;
    }

    Alert.alert(
      'Cancel Ticket',
      'Are you sure you want to cancel this ticket? This action cannot be undone.',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            setIsCancelling(true);
            try {
              // Get seat IDs from passengers
              const seatIds = passengers.map(p => p.Seat?.SeatId || p.SeatId || '').filter(id => id);

              // If multiple seats, cancel each one
              const cancelPromises = seatIds.length > 0
                ? seatIds.map(seatId =>
                  cancelTicket({
                    UserIp: "102.101.109.2",
                    SearchTokenId: SearchTokenId,
                    BookingId: BookingId,
                    SeatId: seatId.toString(),
                    Remarks: "Cancel Bus Ticket"
                  })
                )
                : [
                  // Fallback: cancel with first seat or without seat ID
                  cancelTicket({
                    UserIp: "102.101.109.2",
                    SearchTokenId: SearchTokenId,
                    BookingId: BookingId,
                    SeatId: seatIds[0]?.toString() || "1",
                    Remarks: "Cancel Bus Ticket"
                  })
                ];

              const results = await Promise.all(cancelPromises);

              // Check if any cancellation was successful
              const success = results.some(result => result?.success !== false);

              if (success) {
                Alert.alert(
                  'Success',
                  'Your ticket has been cancelled successfully.',
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        if (onCancelCallback) {
                          onCancelCallback(results);
                        }
                      },
                    },
                  ]
                );
              } else {
                throw new Error('Cancellation failed');
              }
            } catch (error) {
              const errorMessage = error?.response?.data?.message || error?.message || 'Failed to cancel ticket. Please try again.';
              Alert.alert('Error', errorMessage);
            } finally {
              setIsCancelling(false);
            }
          },
        },
      ]
    );
  };

  // Handle WhatsApp Share
  const handleWhatsApp = async () => {
    try {
      const seatNames = passengers.map(p => p.Seat?.SeatName || p.SeatName || 'N/A').join(', ');
      const leadPassenger = passengers.find(p => p.LeadPassenger) || passengers[0] || {};
      const passengerName = leadPassenger ? `${leadPassenger.FirstName || ''} ${leadPassenger.LastName || ''}`.trim() : 'N/A';

      const ticketText = `🚌 *Bus Ticket*\n\n` +
        `*Travel:* ${travel_name}\n` +
        `*Date:* ${formatDate(date_of_journey)}\n` +
        `*From:* ${boarding_point} to ${dropping_point}\n` +
        `*Passenger:* ${passengerName}\n` +
        `*Seat(s):* ${seatNames || 'N/A'}\n` +
        `*PNR:* ${pnr_number}\n` +
        `*Fare:* ₹${(total_fare || 0).toFixed(2)}\n\n` +
        `Safe travels! 🎫`;

      await Share.share({
        message: ticketText,
        title: 'Bus Ticket',
      });
    } catch (error) {
      if (__DEV__) {
        console.error('WhatsApp share error:', error);
      }
      Alert.alert('Error', 'Unable to share ticket. Please try again.');
    }
  };

  return (
    <View style={globalStyles.ticketCard} ref={ticketViewRef}>
      <TicketHeader
        travel_name={travel_name}
        bus_type={bus_type}
        Traveldate={formatDate(date_of_journey)}
        Travelday={formatDay(date_of_journey)}
        Departuretime={formatTime(departure_time)}
        TimeDuration={duration}
        arrival_time={formatTime(arrival_time)}
        DepartureAddress={boarding_point}
        BoardingPointName={boarding_point_details.CityPointName}
        BoardingPointAddress={boarding_point_details.CityPointAddress}
        DroppingPointName={dropping_point_details.CityPointName}
        DroppingPointAddress={dropping_point_details.CityPointLocation}
        ArrivalAddress={dropping_point}
      />
      <TicketCardDivider />
      <TicketFooter
        Passenger={passengers || []}
        PNR={pnr_number}
        Fare={total_fare || 0}
      />
      <TicketActions
        onPrint={handlePrint}
        onCancel={handleCancel}
        onSendWhatsapp={handleWhatsApp}
        isCancelling={isCancelling}
      />
    </View>
  );
}

// All styles now use centralized styles from utils/styles
