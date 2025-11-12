import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { BackHandler, Animated, Alert } from 'react-native';
import { getTicketDetails } from '../actions/busActions';

/**
 * Custom hook for ConfirmationPage business logic
 * 
 * Handles:
 * - Ticket details fetching
 * - Data transformation for TicketComponent
 * - Header animation logic
 * - Back handler
 * - Error handling
 * 
 * @param {Object} route - Navigation route with block_details
 * @param {Object} navigation - Navigation object
 * @returns {Object} Confirmation page state and methods
 */
export const useConfirmationPage = (route, navigation) => {
    const { details: block_details } = route.params || {};
    const { SearchTokenId, originCity, destinationCity, date_of_journey } = useSelector(
        (state) => state.bus
    );

    const [ticketDataApi, setTicketData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    // Animation refs
    const headerOpacity = useRef(new Animated.Value(1)).current;
    const headerTranslateY = useRef(new Animated.Value(0)).current;
    const scrollY = useRef(new Animated.Value(0)).current;
    const fadeOutTimer = useRef(null);
    const hasScrolled = useRef(false);

    /**
     * Fetch ticket details on mount
     */
    useEffect(() => {
        const getTicketDetailsData = async () => {
            try {
                setLoading(true);
                setError(null);

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

    /**
     * Transform API response into ticket format
     * Memoized to avoid recalculation
     */
    const ticketData = useMemo(() => {
        if (!ticketDataApi) return null;

        const boardingDetails =
            ticketDataApi.BoardingPointDetails ||
            (Array.isArray(ticketDataApi.boarding_point_details) &&
                ticketDataApi.boarding_point_details[0]) ||
            ticketDataApi.boarding_point_details ||
            {};

        const droppingDetails =
            ticketDataApi.DroppingPointDetails ||
            (Array.isArray(ticketDataApi.dropping_point_details) &&
                ticketDataApi.dropping_point_details[0]) ||
            ticketDataApi.dropping_point_details ||
            {};

        const passengers = ticketDataApi.passengers || ticketDataApi.Passenger || [];

        return {
            travel_name: ticketDataApi.travel_name || ticketDataApi.TravelName || 'Bus Service',
            bus_type: ticketDataApi.bus_type || ticketDataApi.BusType || 'AC Sleeper',
            date_of_journey: ticketDataApi.date_of_journey || date_of_journey || '',
            departure_time: ticketDataApi.DepartureTime || ticketDataApi.departure_time || '',
            arrival_time: ticketDataApi.ArrivalTime || ticketDataApi.arrival_time || '',
            duration: ticketDataApi.Duration || ticketDataApi.duration || '0',
            boarding_point:
                ticketDataApi.boarding_point || ticketDataApi.boarding_details || originCity || '',
            dropping_point:
                ticketDataApi.dropping_point || ticketDataApi.drop_off_details || destinationCity || '',
            passengers: passengers,
            pnr_number: ticketDataApi.pnr_number || ticketDataApi.pnr || '',
            boarding_point_details: {
                CityPointName: boardingDetails.CityPointName || '',
                CityPointAddress:
                    boardingDetails.CityPointAddress || boardingDetails.CityPointLocation || '',
            },
            dropping_point_details: {
                CityPointName: droppingDetails.CityPointName || '',
                CityPointLocation:
                    droppingDetails.CityPointLocation || droppingDetails.CityPointAddress || '',
            },
            total_fare: ticketDataApi.total_fare || ticketDataApi.TotalFare || ticketDataApi.Fare || 0,
            BookingId: ticketDataApi.BookingId || ticketDataApi.booking_id || '',
            SearchTokenId: ticketDataApi.SearchTokenId || SearchTokenId || '',
        };
    }, [ticketDataApi, SearchTokenId, originCity, destinationCity, date_of_journey]);

    /**
     * Get passenger name from ticket data
     * Memoized to avoid recalculation
     */
    const passengerName = useMemo(() => {
        if (!ticketDataApi) {
            if (block_details?.Passenger || block_details?.passengers) {
                const passengers = block_details.Passenger || block_details.passengers || [];
                const leadPassenger = passengers.find((p) => p.LeadPassenger) || passengers[0];
                if (leadPassenger) {
                    return `${leadPassenger.FirstName || ''} ${leadPassenger.LastName || ''}`.trim() || 'Guest';
                }
            }
            return 'Guest';
        }

        const passengers = ticketDataApi.passengers || ticketDataApi.Passenger || [];
        const leadPassenger = passengers.find((p) => p.LeadPassenger) || passengers[0];
        if (leadPassenger) {
            return `${leadPassenger.FirstName || ''} ${leadPassenger.LastName || ''}`.trim() || 'Guest';
        }
        return 'Guest';
    }, [ticketDataApi, block_details]);

    /**
     * Handle scroll animation for header fade out
     */
    useEffect(() => {
        const listener = scrollY.addListener(({ value }) => {
            if (value > 0 && !hasScrolled.current) {
                hasScrolled.current = true;
                if (fadeOutTimer.current) {
                    clearTimeout(fadeOutTimer.current);
                    fadeOutTimer.current = null;
                }
            }

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
                    setTimeout(() => {
                        if (value > 50) {
                            setIsHeaderVisible(false);
                        }
                    }, 0);
                });
            } else {
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
    }, [headerOpacity, headerTranslateY, scrollY]);

    /**
     * Auto-fade out header after 3 seconds if not scrolled
     */
    useEffect(() => {
        if (ticketData && !loading && !hasScrolled.current) {
            fadeOutTimer.current = setTimeout(() => {
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
    }, [ticketData, loading, headerOpacity, headerTranslateY]);

    /**
     * Handle hardware back button
     */
    useEffect(() => {
        const backhandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.navigate('Main');
            return true;
        });
        return () => backhandler.remove();
    }, [navigation]);

    /**
     * Handle ticket cancellation
     */
    const handleCancel = useCallback(
        (cancelData) => {
            Alert.alert(
                'Ticket Cancelled',
                'Your ticket has been cancelled. You will be redirected to your bookings.',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.navigate('Main');
                        },
                    },
                ]
            );
        },
        [navigation]
    );

    /**
     * Navigate to bookings
     */
    const navigateToBookings = useCallback(() => {
        navigation.navigate('Main', { screen: 'Bookings' });
    }, [navigation]);

    /**
     * Navigate to home
     */
    const navigateToHome = useCallback(() => {
        navigation.navigate('Main');
    }, [navigation]);

    return {
        // State
        loading,
        error,
        ticketData,
        passengerName,
        isHeaderVisible,

        // Animation values
        headerOpacity,
        headerTranslateY,
        scrollY,

        // Bus info
        originCity,
        destinationCity,

        // Methods
        handleCancel,
        navigateToBookings,
        navigateToHome,
    };
};
