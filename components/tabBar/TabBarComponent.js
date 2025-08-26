import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useDispatch } from 'react-redux';
import TicketComponent from '../../components/TicketComponent';
import { styles } from '../../utils/styles';
import { PrimaryColor } from '../../utils/colors';
import { Tickets } from '../../faker/tickets';

// Mock API call for demonstration
const fetchPastTripsAPI = () => {
  console.log('API: Fetching past trips...');
  return Tickets; // Replace with actual API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Tickets);
    }, 1000);
  });
};

export default function PastTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const loadTrips = async () => {
    try {
      const pastTrips = await fetchPastTripsAPI();
      console.log('API: Past trips fetched:', pastTrips);
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
  }, [dispatch]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadTrips();
  }, [dispatch]);

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
