import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { getMyTickets } from '../actions/userActions';

export const useBookings = () => {
    const navigation = useNavigation();
    const { signOut, isGuest } = useAuth();
    const { mobile_number = null } = useSelector(state => state.user);

    const [index, setIndex] = useState(0);
    const [hasTickets, setHasTickets] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [upcomingTickets, setUpcomingTickets] = useState([]);
    const [cancelledTickets, setCancelledTickets] = useState([]);

    // Define routes with trip counts
    const routes = useMemo(() => [
        { key: 'upcoming', title: 'Upcoming', tripCount: upcomingTickets.length },
        { key: 'cancelled', title: 'Cancelled', tripCount: cancelledTickets.length },
    ], [upcomingTickets.length, cancelledTickets.length]);

    // Fetch tickets when user is logged in
    useEffect(() => {
        async function fetchData() {
            if (!isGuest && mobile_number) {
                try {
                    const fetchedTickets = await getMyTickets(mobile_number);

                    if (fetchedTickets && fetchedTickets.length > 0) {
                        setHasTickets(true);
                        setTickets(fetchedTickets);
                        setUpcomingTickets(fetchedTickets.filter(t => t.status === 'Booked'));
                        setCancelledTickets(fetchedTickets.filter(t => t.status !== 'Booked'));
                    } else {
                        setHasTickets(false);
                    }
                } catch (error) {
                    console.warn('Failed to fetch tickets:', error);
                    setHasTickets(false);
                }
            }
        }

        fetchData();
    }, [isGuest, mobile_number]);

    // Navigation handlers
    const handleLoginPress = () => {
        signOut();
    };

    const handleBookNow = () => {
        navigation.navigate('Main');
    };

    return {
        // Auth state
        isGuest,
        mobile_number,

        // Tickets state
        hasTickets,
        upcomingTickets,
        cancelledTickets,

        // Tab state
        index,
        setIndex,
        routes,

        // Handlers
        handleLoginPress,
        handleBookNow,
    };
};
