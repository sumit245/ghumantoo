import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import Tickets from '../components/tabBar/TabBarComponent';
import { PrimaryColor, PureWhite, BlackColor, layouts } from '../utils/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import GuestView from '../components/GuestView';
import TabBar from '../components/Bookings/TabBar';
import EmptyBookings from '../components/Bookings/EmptyBookings';
import { useBookings } from '../hooks/useBookings';

export default function BookingsScreen() {
  const layout = useWindowDimensions();

  const {
    isGuest,
    hasTickets,
    upcomingTickets,
    cancelledTickets,
    index,
    setIndex,
    routes,
    handleLoginPress,
    handleBookNow,
  } = useBookings();

  // Not logged in UI
  if (isGuest) {
    return (
      <SafeAreaView style={styles.container}>
        <GuestView
          onLoginPress={handleLoginPress}
          title="Login to view your bookings"
          subtitle="Sign in to see your upcoming and past trips, and get exclusive offers!"
        />
      </SafeAreaView>
    );
  }

  // Logged in but no tickets UI
  if (!hasTickets) {
    return <EmptyBookings onBookNow={handleBookNow} />;
  }

  // TabView with custom TabBar
  const renderTabBar = (props) => (
    <TabBar
      routes={props.navigationState.routes}
      position={props.position}
      index={index}
      onTabPress={setIndex}
    />
  );

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'upcoming':
        return <Tickets tickets={upcomingTickets} tabName="upcoming" />;
      case 'cancelled':
        return <Tickets tickets={cancelledTickets} tabName="cancelled" />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        lazy
        renderLazyPlaceholder={() => (
          <View style={styles.lazyPlaceholder}>
            <Text style={{ color: BlackColor }}>Loading Trips...</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...layouts.container,
    backgroundColor: PureWhite,
  },
  lazyPlaceholder: {
    ...layouts.container,
    ...layouts.colCenter,
  },
});