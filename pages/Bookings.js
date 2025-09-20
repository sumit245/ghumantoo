import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions, Animated } from 'react-native';
import { TabView } from 'react-native-tab-view';
import UpcomingTrips from '../components/tabBar/TabBarComponent';
import PastTrips from '../components/tabBar/TabBarComponent';
import { PrimaryColor, WhiteColor } from '../utils/colors';
import { typography } from '../utils/typography';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Badge } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { getActiveCoupons } from '../actions/busActions';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { getMyTickets } from '../actions/userActions';
import GuestView from '../components/GuestView';

export default function BookingsScreen() {
  const layout = useWindowDimensions();
  const { signOut, isGuest } = useAuth();
  const { mobile_number = null } = useSelector(state => state.user);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'upcoming', title: 'Upcoming', tripCount: 0 },
    { key: 'cancelled', title: 'Cancelled' },
  ]);
  const [hasTickets, setHasTickets] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const navigation = useNavigation();

  // Fetch tickets and coupons if logged in
  useEffect(() => {
    async function fetchData() {
      if (!isGuest && mobile_number) {
        // Fetch tickets
        try {
          const tickets = await getMyTickets(mobile_number); // You may need to import getMyTickets directly
          setHasTickets(tickets && tickets.length > 0);
          routes[0].tripCount = tickets ? tickets.length : 0;
        } catch (e) {
          setHasTickets(false);
        }
        // Fetch coupons
        try {
          const activeCoupons = await getActiveCoupons();
          setCoupons(activeCoupons || []);
        } catch (e) {
          setCoupons([]);
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
        {coupons.length > 0 && (
          <View style={styles.couponContainer}>
            <Text style={styles.couponTitle}>Available Coupons:</Text>
            {coupons.map((coupon) => (
              <View key={coupon.code} style={styles.couponItem}>
                <Text style={styles.couponCode}>{coupon.code}</Text>
                <Text style={styles.couponDesc}>{coupon.description}</Text>
              </View>
            ))}
          </View>
        )}
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
                {route.key === 'upcoming' && route.tripCount > 0 && (
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
        return <UpcomingTrips />;
      case 'cancelled':
        return <PastTrips />;
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
            <Text>Loading Trips...</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: WhiteColor },
  centeredContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: WhiteColor, paddingHorizontal: 30 },
  image: { width: 200, height: 200, marginBottom: 24 },
  title: { ...typography.font20, fontWeight: 'bold', color: PrimaryColor, marginBottom: 8 },
  subtitle: { ...typography.font14, color: '#666', marginBottom: 16, textAlign: 'center', paddingHorizontal: 24 },
  loginButton: { backgroundColor: PrimaryColor, paddingVertical: 12, paddingHorizontal: 32, borderRadius: 8, marginTop: 12 },
  loginButtonText: { color: WhiteColor, fontWeight: 'bold', fontSize: 16 },
  bookButton: { backgroundColor: PrimaryColor, paddingVertical: 12, paddingHorizontal: 32, borderRadius: 8, marginTop: 12 },
  bookButtonText: { color: WhiteColor, fontWeight: 'bold', fontSize: 16 },
  couponContainer: { marginTop: 16, alignItems: 'center' },
  couponTitle: { ...typography.font16, fontWeight: 'bold', color: PrimaryColor, marginBottom: 8 },
  couponItem: { backgroundColor: '#f1f8e9', padding: 8, borderRadius: 6, marginBottom: 6, width: 220 },
  couponCode: { ...typography.font14, fontWeight: 'bold', color: '#388e3c' },
  couponDesc: { ...typography.font12, color: '#666' },
  tabBar: { flexDirection: 'row', backgroundColor: WhiteColor, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1 },
  tabItem: { flex: 1, alignItems: 'center', paddingVertical: 16 },
  tabLabelContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  label: { ...typography.font16, color: PrimaryColor, textTransform: 'uppercase', fontWeight: 'bold', textAlign: 'center' },
  badge: { backgroundColor: PrimaryColor, marginLeft: 8, alignSelf: 'center' },
  indicator: { backgroundColor: PrimaryColor, height: 3, width: '60%', position: 'absolute', bottom: 0, borderRadius: 2 },
  lazyPlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});