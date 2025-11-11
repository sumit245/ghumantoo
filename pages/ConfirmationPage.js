import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
  Alert,
  Animated,
} from "react-native";
import { useEffect, useMemo, useState, useRef } from "react";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles, typography, PrimaryColor, LightGray, BlackColor, spacing, layouts, WhiteColor, DarkGray, SuccessColor } from "../utils/styles";
import TicketComponent from "../components/ticket/TicketComponent";
import { useSelector } from "react-redux";
import { getTicketDetails } from "../actions/busActions";
import PrimaryButton from "../components/buttons/PrimaryButton";

export default function ConfirmationPage({ route, navigation }) {
  const { details: block_details } = route.params || {};
  const { selectedBus, SearchTokenId, originCity, destinationCity, date_of_journey } = useSelector((state) => state.bus);
  const [ticketDataApi, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // Animation for header fade out
  const headerOpacity = useRef(new Animated.Value(1)).current;
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeOutTimer = useRef(null);
  const hasScrolled = useRef(false);

  useEffect(() => {
    const getTicketDetailsData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Use BookingId from block_details (can be booking_id or BookingId)
        const bookingId = block_details?.BookingId || block_details?.booking_id;
        if (!bookingId) {
          throw new Error('Booking ID not found');
        }
        const ticket = await getTicketDetails(bookingId);
        setTicketData(ticket);
      } catch (err) {
        setError(err.message || 'Failed to load ticket details');
        if (__DEV__) {
          console.error('Error fetching ticket details:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    if (block_details) {
      getTicketDetailsData();
    }
  }, [block_details?.BookingId, block_details?.booking_id]);

  // Transform API response into ticket format for TicketComponent
  const ticketData = useMemo(() => {
    if (!ticketDataApi) {
      return null;
    }

    // Handle both array and object formats for boarding/dropping points
    const boardingDetails = ticketDataApi.BoardingPointDetails ||
      (Array.isArray(ticketDataApi.boarding_point_details) && ticketDataApi.boarding_point_details[0]) ||
      ticketDataApi.boarding_point_details ||
      {};

    const droppingDetails = ticketDataApi.DroppingPointDetails ||
      (Array.isArray(ticketDataApi.dropping_point_details) && ticketDataApi.dropping_point_details[0]) ||
      ticketDataApi.dropping_point_details ||
      {};

    // Use passengers (lowercase) or Passenger (uppercase) - prefer lowercase
    const passengers = ticketDataApi.passengers || ticketDataApi.Passenger || [];

    // Handle both formats for field names
    const travelName = ticketDataApi.travel_name || ticketDataApi.TravelName || "Bus Service";
    const busType = ticketDataApi.bus_type || ticketDataApi.BusType || "AC Sleeper";
    const pnrNumber = ticketDataApi.pnr_number || ticketDataApi.pnr || "";
    const totalFare = ticketDataApi.total_fare || ticketDataApi.TotalFare || ticketDataApi.Fare || 0;
    const bookingId = ticketDataApi.BookingId || ticketDataApi.booking_id || "";
    const searchTokenId = ticketDataApi.SearchTokenId || SearchTokenId || "";
    const dateOfJourney = ticketDataApi.date_of_journey || date_of_journey || "";

    // Handle time formats - can be string like "03:08 AM" or ISO string
    const departureTime = ticketDataApi.DepartureTime || ticketDataApi.departure_time || "";
    const arrivalTime = ticketDataApi.ArrivalTime || ticketDataApi.arrival_time || "";
    const duration = ticketDataApi.Duration || ticketDataApi.duration || "0";

    // Handle boarding/dropping point strings
    const boardingPoint = ticketDataApi.boarding_point || ticketDataApi.boarding_details || originCity || "";
    const droppingPoint = ticketDataApi.dropping_point || ticketDataApi.drop_off_details || destinationCity || "";

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
  }, [ticketDataApi, SearchTokenId, originCity, destinationCity, date_of_journey]);

  // Get passenger name from ticket data
  const passengerName = useMemo(() => {
    if (!ticketDataApi) {
      // Fallback to block_details if ticketDataApi is not loaded yet
      if (block_details?.Passenger || block_details?.passengers) {
        const passengers = block_details.Passenger || block_details.passengers || [];
        const leadPassenger = passengers.find(p => p.LeadPassenger) || passengers[0];
        if (leadPassenger) {
          return `${leadPassenger.FirstName || ""} ${leadPassenger.LastName || ""}`.trim() || "Guest";
        }
      }
      return "Guest";
    }

    const passengers = ticketDataApi.passengers || ticketDataApi.Passenger || [];
    const leadPassenger = passengers.find(p => p.LeadPassenger) || passengers[0];
    if (leadPassenger) {
      return `${leadPassenger.FirstName || ""} ${leadPassenger.LastName || ""}`.trim() || "Guest";
    }
    return "Guest";
  }, [ticketDataApi, block_details]);

  // Handle scroll animation for header fade out
  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      // Mark that user has scrolled
      if (value > 0 && !hasScrolled.current) {
        hasScrolled.current = true;
        // Cancel auto-fade timer if user starts scrolling
        if (fadeOutTimer.current) {
          clearTimeout(fadeOutTimer.current);
          fadeOutTimer.current = null;
        }
      }

      // Fade out header when scrolled down more than 50px
      if (value > 50) {
        Animated.parallel([
          Animated.timing(headerOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(headerTranslateY, {
            toValue: -20,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          // Hide from layout after animation completes if still scrolled
          // Use setTimeout to defer state update outside of animation callback
          setTimeout(() => {
            if (value > 50) {
              setIsHeaderVisible(false);
            }
          }, 0);
        });
      } else {
        // Fade back in when scrolling up
        // Use setTimeout to defer state update outside of scroll handler
        setTimeout(() => {
          setIsHeaderVisible(true);
        }, 0);
        Animated.parallel([
          Animated.timing(headerOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(headerTranslateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }
    });

    return () => {
      scrollY.removeListener(listener);
    };
  }, []);

  // Auto-fade out header completely after 3 seconds if not scrolled
  useEffect(() => {
    if (ticketData && !loading && !hasScrolled.current) {
      fadeOutTimer.current = setTimeout(() => {
        // Completely hide the header if user hasn't scrolled
        Animated.parallel([
          Animated.timing(headerOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(headerTranslateY, {
            toValue: -30,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start(() => {
          // Hide from layout after animation completes
          // Use setTimeout to defer state update outside of animation callback
          setTimeout(() => {
            setIsHeaderVisible(false);
          }, 0);
        });
      }, 3000);
    }

    return () => {
      if (fadeOutTimer.current) {
        clearTimeout(fadeOutTimer.current);
        fadeOutTimer.current = null;
      }
    };
  }, [ticketData, loading]);

  useEffect(() => {
    const backhandler = BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.navigate("Main");
      return true;
    });
    return () => backhandler.remove();
  }, [navigation]);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: '#17171f' }}>Loading ticket details...</Text>
      </SafeAreaView>
    );
  }

  if (error || !ticketData) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center", padding: 20 }]}>
        <Icon name="alert-circle" size={48} color="#f44336" />
        <Text style={{ color: '#17171f', marginTop: 16, textAlign: 'center' }}>
          {error || 'Failed to load ticket details'}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.buttonPrimary, spacing.mt5]}
        >
          <Text style={styles.buttonTextPrimary}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { flex: 1 }]}>
      <Animated.ScrollView
        contentContainerStyle={[spacing.pv4, { flexGrow: 1 }]}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Success Header - Animated fade out on scroll or completely disappears after 3 seconds if not scrolled */}
        {isHeaderVisible && (
          <Animated.View
            style={[
              layouts.colCenter,
              spacing.pv5,
              spacing.ph4,
              spacing.mb5,
              {
                opacity: headerOpacity,
                transform: [{ translateY: headerTranslateY }],
              }
            ]}
          >
            <Icon
              name="checkbox-marked-circle"
              size={40}
              color={SuccessColor}
            />
            <Text style={[typography.font20, typography.textBold, { color: SuccessColor, marginTop: 12, marginBottom: 8, textAlign: "center" }]}>
              Booking Confirmed!
            </Text>
            <Text style={[typography.font14, { color: BlackColor, textAlign: "center", paddingHorizontal: 20 }]}>
              Hey {passengerName}, your booking from {originCity || ticketData.boarding_point} to {destinationCity || ticketData.dropping_point} is confirmed!
            </Text>
          </Animated.View>
        )}

        {/* Ticket Component */}
        <View style={spacing.mb5}>
          <TicketComponent
            ticket={ticketData}
            onCancel={(cancelData) => {
              // Navigate back to Bookings after successful cancellation
              Alert.alert(
                'Ticket Cancelled',
                'Your ticket has been cancelled. You will be redirected to your bookings.',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      navigation.navigate("Main");
                      // Note: To navigate to a specific tab, you may need to use navigation.navigate("Main", { screen: "Bookings" })
                      // or use a navigation listener to switch tabs
                    },
                  },
                ]
              );
            }}
          />
        </View>

        {/* Action Buttons */}
        <View style={[layouts.rowBetween, spacing.mt3, spacing.ph4]}>
          <PrimaryButton
            onClick={() => navigation.navigate("Main", { screen: "Bookings" })}
            title="View My Bookings"
            isIconButton={true}
            iconName="ticket-outline"
            style={[styles.buttonPrimary, { flex: 1, marginRight: 6 }]}
            textStyle={styles.buttonTextPrimary}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate("Main")}
            style={[spacing.p3, spacing.br1, { flex: 1, marginLeft: 6, backgroundColor: LightGray, borderWidth: 1, borderColor: DarkGray, alignItems: "center", justifyContent: "center" }]}
          >
            <Text style={[typography.font16, { color: BlackColor, fontWeight: "600" }]}>Continue Booking</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

// All styles now use centralized styles from utils/styles
