import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';
import { styles as globalStyles, width } from '../utils/styles';
import { spacing } from '../utils/spacing.styles';
import { typography } from '../utils/typography';
import dayjs from 'dayjs'; // Import dayjs for date formatting
import { White1Color, WhiteColor } from '../utils/colors';

// --- Sub-Component for a single detail row in the footer ---
const TicketDetailRow = ({ label, value, isLast = false }) => (
  <>
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
    {!isLast && <Divider />}
  </>
);

// --- Sub-Component for the perforated divider ---
const TicketCardDivider = () => (
  <View style={globalStyles.cardDivider}>
    <View style={styles.circle} />
    <View style={styles.circle} />
  </View>
);

// --- Sub-Component for the Ticket Header ---
const TicketHeader = ({
  TravelName,
  BusType,
  Traveldate,
  Travelday,
  Departuretime,
  TimeDuration,
  ArrivalTime,
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
        <Text style={globalStyles.stdText}>{TravelName}</Text>
        <Text style={[globalStyles.stdText, typography.font10]}>{BusType}</Text>
      </View>
      <View>
        <Text style={globalStyles.stdText}>{Traveldate}</Text>
        <Text style={[globalStyles.stdText, typography.font10]}>{Travelday}</Text>
      </View>
    </View>

    <Divider style={[spacing.mv2]} />

    <View style={[globalStyles.row, spacing.mv2]}>
      <Text style={[globalStyles.stdText, typography.font20]}>{Departuretime}</Text>
      <Text style={[globalStyles.stdText, styles.durationText]}>{TimeDuration}</Text>
      <Text style={[globalStyles.stdText, typography.font20]}>{ArrivalTime}</Text>
    </View>
    <View style={[globalStyles.row, spacing.mv2]}>
      <View>
        <Text style={[globalStyles.stdText, typography.font12]}>From: {DepartureAddress}</Text>
        <Text style={[globalStyles.stdText, typography.font10, { flexWrap: 'wrap', maxWidth: '60%' }]}>{BoardingPointAddress}, {BoardingPointName}</Text>

      </View>
      <View>
        <Text style={[globalStyles.stdText, typography.font12]}>To: {ArrivalAddress}</Text>
        <Text style={[globalStyles.stdText, typography.font10, { flexWrap: 'wrap', maxWidth: '80%' }]}>{DroppingPointAddress},{DroppingPointName}</Text>

      </View>
    </View>
  </View>
);

// --- Sub-Component for the Ticket Footer ---
const TicketFooter = ({ Passenger, PNR, Fare }) => {
  // Process passenger data to get seat numbers and lead passenger name
  const seatNames = Passenger.map(p => p.SeatName).join(', ');
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
      <Text style={styles.whatsappMessage}>
        Ticket Details are sent to your whatsapp 😍
      </Text>
    </View>
  );
};


// --- Main Ticket Component ---
// This component now accepts the entire ticket object and processes the data.
export default function TicketComponent({ ticket }) {
  if (!ticket) {
    return null; // Return nothing if ticket data is not available
  }

  const {
    TravelName,
    BusType,
    DateOfJourney,
    DepartureTime,
    Duration,
    ArrivalTime,
    Origin,
    Destination,
    Passenger,
    TravelOperatorPNR,
    BoardingPointdetails,
    DroppingPointdetails,
    InvoiceAmount,
  } = ticket;

  useEffect(() => {
    // Log the ticket data for debugging
    console.log('Ticket Data:', ticket);
  }, [ticket]);

  return (
    <View style={globalStyles.ticketCard}>
      <TicketHeader
        TravelName={TravelName}
        BusType={BusType}
        Traveldate={dayjs(DateOfJourney).format('DD MMM YYYY')}
        Travelday={dayjs(DateOfJourney).format('dddd')}
        Departuretime={dayjs(DepartureTime).format('h:mm A')}
        TimeDuration={`${Math.floor(Duration / 60)}h ${Duration % 60}m`}
        ArrivalTime={dayjs(ArrivalTime).format('h:mm A')}
        DepartureAddress={Origin}
        BoardingPointName={BoardingPointdetails.CityPointName}
        BoardingPointAddress={BoardingPointdetails.CityPointAddress}
        DroppingPointName={DroppingPointdetails.CityPointName}
        DroppingPointAddress={DroppingPointdetails.CityPointLocation}
        ArrivalAddress={Destination}
      />
      <TicketCardDivider />
      <TicketFooter
        Passenger={Passenger || []}
        PNR={TravelOperatorPNR}
        Fare={InvoiceAmount || 0}
      />
    </View>
  );
}

// --- Local Stylesheet for this component ---
const styles = StyleSheet.create({
  operatorRow: {
    ...globalStyles.row,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  travelName: {
    ...typography.font16,
    fontWeight: 'bold',
  },
  busType: {
    fontSize: 12,
    color: '#666',
  },
  dateRow: {
    ...globalStyles.row,
    justifyContent: 'space-between',
  },
  durationText: {
    textDecorationLine: 'underline',
  },
  addressText: {
    ...globalStyles.stdText,
    fontSize: 14,
    maxWidth: width / 2.6,
    flexWrap: 'wrap',
  },
  detailRow: {
    ...globalStyles.row,
    paddingVertical: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#333',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
  whatsappMessage: {
    textAlign: 'center',
    marginTop: 20,
  },
  circle: {
    position: 'relative',
    top: -20,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: WhiteColor,
  }
});
