import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TicketComponent from '../ticket/TicketComponent';
import { styles, PrimaryColor } from '../../utils/styles';
import { getMyTickets } from '../../actions/userActions';
import { useAuth } from '../../context/AuthContext';

// Transform ticket data from API format to TicketComponent format
const transformTicket = (ticket) => {
  if (!ticket) return null;

  // Handle both array and object formats for boarding/dropping points
  const boardingDetails = ticket.BoardingPointDetails ||
    (Array.isArray(ticket.boarding_point_details) && ticket.boarding_point_details[0]) ||
    ticket.boarding_point_details ||
    {};

  const droppingDetails = ticket.DroppingPointDetails ||
    (Array.isArray(ticket.dropping_point_details) && ticket.dropping_point_details[0]) ||
    ticket.dropping_point_details ||
    {};

  // Use passengers (lowercase) or Passenger (uppercase) - prefer lowercase
  const passengers = ticket.passengers || ticket.Passenger || [];

  // Handle both formats for field names
  const travelName = ticket.travel_name || ticket.TravelName || "Bus Service";
  const busType = ticket.bus_type || ticket.BusType || "AC Sleeper";
  const pnrNumber = ticket.pnr_number || ticket.pnr || "";
  const totalFare = ticket.total_fare || ticket.TotalFare || ticket.Fare || 0;
  const bookingId = ticket.BookingId || ticket.booking_id || "";
  const searchTokenId = ticket.SearchTokenId || "";
  const dateOfJourney = ticket.date_of_journey || "";

  // Handle time formats - can be string like "03:08 AM" or ISO string
  const departureTime = ticket.DepartureTime || ticket.departure_time || "";
  const arrivalTime = ticket.ArrivalTime || ticket.arrival_time || "";
  const duration = ticket.Duration || ticket.duration || "0";

  // Handle boarding/dropping point strings
  const boardingPoint = ticket.boarding_point || ticket.boarding_details || "";
  const droppingPoint = ticket.dropping_point || ticket.drop_off_details || "";

  return {
    travel_name: travelName,
    bus_type: busType,
    date_of_journey: dateOfJourney,
    departure_time: departureTime,
    arrival_time: arrivalTime,
    duration: duration,
    boarding_point: boardingPoint,
    dropping_point: droppingPoint,
    passengers: passengers,
    pnr_number: pnrNumber,
    boarding_point_details: {
      CityPointName: boardingDetails.CityPointName || "",
      CityPointAddress: boardingDetails.CityPointAddress || boardingDetails.CityPointLocation || "",
    },
    dropping_point_details: {
      CityPointName: droppingDetails.CityPointName || "",
      CityPointLocation: droppingDetails.CityPointLocation || droppingDetails.CityPointAddress || "",
    },
    total_fare: totalFare,
    BookingId: bookingId,
    SearchTokenId: searchTokenId,
  };
};

export default function PastTrips({ tickets, tabName }) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Transform tickets to match TicketComponent format
  const transformedTickets = useMemo(() => {
    if (!tickets || !Array.isArray(tickets)) return [];
    return tickets.map(transformTicket).filter(ticket => ticket !== null);
  }, [tickets]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate fetching new data
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [tickets]);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={transformedTickets}
      renderItem={({ item }) => <TicketComponent ticket={item} />}
      keyExtractor={(item) => item.pnr_number || item.BookingId || Math.random().toString()}
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      // Modify here to return if a user is guest then show message and prompt to login
      // Modify if user has no trips then show message and prompt to book a trip
      ListEmptyComponent={() => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={[styles.emptyListText, { color: '#17171f' }]}>
            {tabName === 'upcoming' ? 'No Upcoming Trips' : 'No Cancelled Trips'}
          </Text>
        </View>
      )}
    />
  );
}
