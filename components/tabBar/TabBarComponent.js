import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TicketComponent from '../ticket/TicketComponent';
import { styles } from '../../utils/styles';
import { PrimaryColor } from '../../utils/colors';
import { getMyTickets } from '../../actions/userActions';
import { useAuth } from '../../context/AuthContext';

export default function PastTrips({ tickets, tabName }) {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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
      data={tickets}
      renderItem={({ item }) => <TicketComponent ticket={item} />}
      keyExtractor={(item) => item.pnr_number}
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
