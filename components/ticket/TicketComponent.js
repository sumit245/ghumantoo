import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import { styles as globalStyles, width } from '../../utils/styles';
import { spacing } from '../../utils/spacing.styles';
import { typography } from '../../utils/typography';
import dayjs from 'dayjs'; // Import dayjs for date formatting
import { Black1Color, DangerColor, SuccessColor, White1Color, WhiteColor } from '../../utils/colors';
import Icon from 'react-native-vector-icons/Ionicons';

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
      <Text style={[globalStyles.stdText, styles.durationText]}>{TimeDuration}</Text>
      <Text style={[globalStyles.stdText, typography.font20]}>{arrival_time}</Text>
    </View>
    <View style={[globalStyles.row, spacing.mb4]}>
      <View>
        <Text style={[globalStyles.stdText, typography.font12]}>From: {"\n"}{DepartureAddress}</Text>
        <Text style={[globalStyles.stdText, typography.font10, { flexWrap: 'wrap', maxWidth: '60%' }]}>{BoardingPointAddress}, {BoardingPointName}</Text>
      </View>
      <View>
        <Text style={[globalStyles.stdText, typography.font12]}>To: {"\n"}{ArrivalAddress}</Text>
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
      <Text style={styles.whatsappMessage}>
        Safe travels! Keep this ticket for your journey.
      </Text>
    </View>
  );
};

const TicketActions = ({ onPrint, onCancel, onSendWhatsapp }) => {
  return (
    <View style={globalStyles.ticketCardFooter}>
      <View style={[globalStyles.row, { justifyContent: 'flex-start' }]}>
        <TouchableOpacity style={[spacing.bw05, spacing.p2, spacing.mh2, globalStyles.row, spacing.br1, { alignItems: 'center', borderColor: Black1Color, width: "30%", justifyContent: 'flex-start' }]} onPress={onPrint}>
          <Icon name="print-outline" size={20} style={spacing.ph1} color={Black1Color} />
          <Text style={[globalStyles.actionText, spacing.ph1, { color: Black1Color }]}>Print</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[spacing.bw05, spacing.p2, spacing.mh2, globalStyles.row, spacing.br1, { alignItems: 'center', borderColor: DangerColor, width: "30%", justifyContent: 'flex-start' }]} onPress={onPrint}>
          <Icon name="close-outline" size={20} style={spacing.ph1} color={DangerColor} />
          <Text style={[globalStyles.actionText, spacing.ph1, { color: DangerColor }]} onPress={onCancel}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[spacing.bw05, spacing.p2, spacing.mh2, globalStyles.row, spacing.br1, { alignItems: 'center', borderColor: SuccessColor, width: "30%", justifyContent: 'flex-start' }]} onPress={onPrint}>
          <Icon name="logo-whatsapp" size={20} style={spacing.ph1} color={SuccessColor} />
          <Text style={[globalStyles.actionText, spacing.ph1, { color: SuccessColor }]} onPress={onSendWhatsapp}>WhatsApp</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

// --- Main Ticket Component ---
// This component now accepts the entire ticket object and processes the data.
export default function TicketComponent({ ticket }) {
  if (!ticket) {
    return null; // Return nothing if ticket data is not available
  }
  useEffect(() => {
    console.log(ticket)
  }, [])

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
  } = ticket;



  return (
    <View style={globalStyles.ticketCard}>
      <TicketHeader
        travel_name={travel_name}
        bus_type={bus_type}
        Traveldate={dayjs(date_of_journey).format('DD MMM YYYY')}
        Travelday={dayjs(date_of_journey).format('dddd')}
        Departuretime={departure_time}
        TimeDuration={duration}
        arrival_time={arrival_time}
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
        onPrint={() => console.log('Print Ticket')}
        onCancel={() => console.log('Cancel Ticket')}
        onSendWhatsapp={() => console.log('Send to WhatsApp')}
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
