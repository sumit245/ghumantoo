import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TicketComponent from '../../components/TicketComponent';
import { styles } from '../../utils/styles';
import { PrimaryColor } from '../../utils/colors';
import { getMyTickets } from '../../actions/userActions';
import { useAuth } from '../../context/AuthContext';

export default function PastTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const { isGuest } = useAuth();
  const { mobile_number = null } = useSelector(state => state.user);

  const loadTrips = async () => {
    if (isGuest || !mobile_number) {
      setTrips([]);
      setLoading(false);
      setRefreshing(false);
      return;
    }

    try {
      const pastTrips = await getMyTickets(mobile_number);
      setTrips(pastTrips);
    } catch (error) {
      console.error("Failed to fetch past trips:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadTrips();
  }, [isGuest, mobile_number]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadTrips();
  }, [isGuest, mobile_number]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={PrimaryColor} />
      </View>
    );
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={trips}
      // renderItem={() => <View><Text>Test</Text></View>}
      renderItem={({ item }) => <TicketComponent ticket={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      // Modify here to return if a user is guest then show message and prompt to login
      // Modify if user has no trips then show message and prompt to book a trip
      ListEmptyComponent={() => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.emptyListText}>
            You do not have any past trips
          </Text>
        </View>
      )}
    />
  );
}
