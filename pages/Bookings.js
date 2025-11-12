import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions, Animated } from 'react-native';
import { TabView } from 'react-native-tab-view';
import Tickets from '../components/tabBar/TabBarComponent';
import { PrimaryColor, WhiteColor, PureWhite, DarkGray, BlackColor, typography, spacing, layouts, TextMuted } from '../utils/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { getMyTickets } from '../actions/userActions';
import GuestView from '../components/GuestView';

export default function BookingsScreen() {
  const layout = useWindowDimensions();
  const { signOut, isGuest } = useAuth();
  const { mobile_number = null } = useSelector(state => state.user);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'upcoming', title: 'Upcoming', tripCount: 0 },
    { key: 'cancelled', title: 'Cancelled', tripCount: 0 },
  ]);
  const [hasTickets, setHasTickets] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [upcominTickets, setUpcomingTickets] = useState([]);
  const [cancelledTickets, setCancelledTickets] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();


  // Fetch tickets and coupons if logged in
  useEffect(() => {
    async function fetchData() {
      if (!isGuest && mobile_number) {
        // Fetch tickets
        try {
          const tickets = await getMyTickets(mobile_number) // You may need to import getMyTickets directly
          setHasTickets(tickets && tickets.length > 0);
          setTickets(tickets);
          setUpcomingTickets(tickets.filter(t => t.status === 'Booked'));
          setCancelledTickets(tickets.filter(t => t.status !== 'Booked'));
          // Update trip count in routes
          routes[0].tripCount = tickets ? tickets.filter(t => t.status === 'Booked').length : 0;
          routes[1].tripCount = tickets ? tickets.filter(t => t.status !== 'Booked').length : 0;
        } catch (e) {
          setHasTickets(false);
        }
      }
    }
    fetchData();
  }, [isGuest, mobile_number]);

  // --- Not logged in UI ---
  if (isGuest || !mobile_number) {
    return (
      <SafeAreaView style={styles.centeredContainer}>
        <GuestView
          onLoginPress={() => signOut()}
          title="Login to view your bookings"
          subtitle="Sign in to see your upcoming and past trips, and get exclusive offers!"
          style={{ paddingHorizontal: 30 }}
        />
      </SafeAreaView>
    );
  }

  // --- Logged in but no tickets UI ---
  if (!hasTickets) {
    return (
      <SafeAreaView style={styles.centeredContainer}>
        <Image
          source={require('../assets/icon.png')} // Add your image here
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>No Bookings Yet</Text>
        <Text style={styles.subtitle}>Book your first trip and enjoy special discounts!</Text>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // --- Normal TabView UI ---
  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.6
            ),
          });
          const isFocused = index === i;
          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={() => setIndex(i)}
            >
              <View style={styles.tabLabelContainer}>
                <Animated.Text style={[styles.label, { opacity }]}>
                  {route.title}
                </Animated.Text>
                {route.tripCount > 0 && (
                  <Badge style={styles.badge}>{route.tripCount}</Badge>
                )}
              </View>
              {isFocused && <View style={styles.indicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'upcoming':
        return <Tickets tickets={upcominTickets} tabName="upcoming" />;
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
  container: { ...layouts.container, backgroundColor: PureWhite },
  centeredContainer: { ...layouts.container, ...layouts.colCenter, backgroundColor: PureWhite, ...spacing.ph5 },
  image: { width: 200, height: 200, ...spacing.mb5 },
  title: { ...typography.font20, ...typography.textBold, color: PrimaryColor, ...spacing.mb2 },
  subtitle: { ...typography.font14, color: DarkGray, ...spacing.mb4, textAlign: 'center', ...spacing.ph5 },
  bookButton: { backgroundColor: PrimaryColor, ...spacing.pv25, ...spacing.ph5, ...spacing.br2, ...spacing.mt3 },
  bookButtonText: { ...typography.font16Bold, color: WhiteColor },
  tabBar: { ...layouts.rowTab, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1 },
  tabItem: { flex: 1, alignItems: 'center', ...spacing.pv4 },
  tabLabelContainer: { ...layouts.rowCenter, justifyContent: 'center' },
  label: { ...typography.font16Bold, color: PrimaryColor, textTransform: 'uppercase', textAlign: 'center' },
  badge: { backgroundColor: PrimaryColor, ...spacing.ml2, alignSelf: 'center' },
  indicator: { backgroundColor: PrimaryColor, height: 3, width: '60%', position: 'absolute', bottom: 0, ...spacing.br1 },
  lazyPlaceholder: { ...layouts.container, ...layouts.colCenter },
});