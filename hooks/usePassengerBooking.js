import { useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import dayjs from 'dayjs';
import { RAZORPAY_KEY_ID } from '../utils/constants';
import { blockSeat, confirmTicket } from '../actions/busActions';
import { PrimaryColor } from '../utils/styles';

/**
 * Custom hook for Passenger booking business logic
 * 
 * Handles:
 * - Form state management
 * - Form validation
 * - Seat blocking API call
 * - Razorpay payment integration
 * - Ticket confirmation
 * - Navigation to confirmation page
 * 
 * @returns {Object} Passenger booking state and methods
 */
export const usePassengerBooking = () => {
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('first'); // 'first' = Male, 'second' = Female
    const [address, setAddress] = useState('');
    const [age, setAge] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const route = useRoute();
    const { boardingPoint, droppingPoint } = route.params;

    const {
        SearchTokenId,
        originCity,
        destinationCity,
        date_of_journey,
        departureTime,
        arrivalTime,
        selectedBus,
        selectedSeats,
        resultIndex,
        priceToPay,
        selectedDroppingPoint,
        selectedBoardingPoint,
    } = useSelector((state) => state.bus);

    const { mobile_number, email_id } = useSelector((state) => state.user);

    /**
     * Memoize formatted date to avoid recalculating on every render
     */
    const formattedJourneyDate = useMemo(
        () => dayjs(date_of_journey).format('DD MMM YYYY'),
        [date_of_journey]
    );

    /**
     * Memoize payment description
     */
    const paymentDescription = useMemo(
        () =>
            `Payment for seat booking from ${originCity} to ${destinationCity} on ${formattedJourneyDate} via Ghumantoo`,
        [originCity, destinationCity, formattedJourneyDate]
    );

    /**
     * Memoize formatted travel times
     */
    const formattedTimes = useMemo(
        () => ({
            departureDate: dayjs(date_of_journey).format('ddd, D MMM'),
            departureTime: dayjs(departureTime).format('hh:mm A'),
            arrivalDate: dayjs(arrivalTime).isBefore(dayjs(departureTime))
                ? dayjs(date_of_journey).add(1, 'day').format('ddd, D MMM')
                : dayjs(date_of_journey).format('ddd, D MMM'),
            arrivalTime: dayjs(arrivalTime).format('hh:mm A'),
        }),
        [date_of_journey, departureTime, arrivalTime]
    );

    /**
     * Validate form fields
     */
    const validateForm = useCallback(() => {
        if (!name || !age || !phone || !address) {
            Alert.alert('Error', 'Please fill all required fields.');
            return false;
        }

        if (phone.length !== 10) {
            Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
            return false;
        }

        return true;
    }, [name, age, phone, address]);

    /**
     * Prepare seat data for API
     */
    const prepareSeatData = useCallback(() => {
        const nameParts = name.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ') || 'surname';
        const userPhone = mobile_number || phone;
        const userEmail = email_id || 'guest@vindhyashrisolutions.com';
        const seatsString = selectedSeats.map((seat) => seat.seat_id).join(',');
        const genderValue = gender === 'first' ? 1 : 2;
        const ageValue = parseInt(age, 10);

        return {
            UserIp: '102.101.109.2',
            SearchTokenId,
            ResultIndex: resultIndex,
            BoardingPointId: selectedBoardingPoint?.CityPointIndex || '',
            DroppingPointId: selectedDroppingPoint?.CityPointIndex || '',
            Address: address,
            age: ageValue,
            Gender: genderValue,
            FirstName: firstName,
            LastName: lastName,
            Email: userEmail,
            Phoneno: userPhone,
            Seats: seatsString,
        };
    }, [
        name,
        age,
        phone,
        address,
        gender,
        mobile_number,
        email_id,
        selectedSeats,
        SearchTokenId,
        resultIndex,
        selectedBoardingPoint,
        selectedDroppingPoint,
    ]);

    /**
     * Prepare Razorpay prefill data
     */
    const preparePrefillData = useCallback(() => {
        const userPhone = mobile_number || phone;
        const userEmail = email_id || 'guest@vindhyashrisolutions.com';

        return {
            email: userEmail,
            contact: userPhone,
            name: name,
        };
    }, [mobile_number, phone, email_id, name]);

    /**
     * Handle ticket booking process
     */
    const handleTicketBooking = useCallback(async () => {
        // Validate form
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Prepare data
            const seatData = prepareSeatData();
            const prefillData = preparePrefillData();

            // Block seats
            const blockResponse = await blockSeat(seatData);

            if (!blockResponse?.success || !blockResponse?.order_id) {
                Alert.alert(
                    'Booking Failed',
                    blockResponse?.message || 'Failed to block seats. Please try again.'
                );
                setLoading(false);
                return;
            }

            const { amount, order_id, currency, ticket_id } = blockResponse;

            // Prepare Razorpay options
            const options = {
                description: paymentDescription,
                image: 'https://vindhyashrisolutions.com/assets/images/logoIcon/logo.png',
                currency: currency || 'INR',
                key: RAZORPAY_KEY_ID,
                amount: Math.round(amount * 100), // Amount in paise
                name: 'Ghumantoo',
                order_id: order_id,
                prefill: prefillData,
                theme: { color: PrimaryColor },
            };

            // Open Razorpay
            RazorpayCheckout.open(options)
                .then(async (data) => {
                    // Handle payment success
                    const paymentData = {
                        razorpay_payment_id: data.razorpay_payment_id,
                        razorpay_order_id: data.razorpay_order_id,
                        razorpay_signature: data.razorpay_signature,
                        ticket_id: ticket_id,
                        amount: amount,
                    };

                    try {
                        const { success, block_details } = await confirmTicket(paymentData);
                        if (success) {
                            navigation.navigate('ConfirmationPage', { details: block_details });
                        } else {
                            Alert.alert(
                                'Verification Failed',
                                'Payment verification failed. Please contact support.'
                            );
                        }
                    } catch (confirmError) {
                        console.error('Confirm ticket error:', confirmError);
                        Alert.alert(
                            'Verification Failed',
                            'Payment verification failed. Please contact support.'
                        );
                    } finally {
                        setLoading(false);
                    }
                })
                .catch(({ error }) => {
                    // Handle Razorpay errors
                    if (error?.code === 'BAD_REQUEST_ERROR') {
                        Alert.alert(
                            'Payment Error',
                            error.description || 'Invalid request'
                        );
                    } else if (error?.code === 'NETWORK_ERROR') {
                        Alert.alert(
                            'Network Error',
                            'Please check your connection and try again.'
                        );
                    } else {
                        Alert.alert(
                            'Payment Cancelled',
                            error?.description || 'Payment was cancelled or failed.'
                        );
                    }
                    setLoading(false);
                });
        } catch (error) {
            console.error('Block seat error:', error);
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                'Failed to process booking. Please try again.';
            Alert.alert('Booking Error', errorMessage);
            setLoading(false);
        }
    }, [
        validateForm,
        prepareSeatData,
        preparePrefillData,
        paymentDescription,
        navigation,
    ]);

    /**
     * Handle input changes with validation
     */
    const handleNameChange = useCallback((text) => {
        const alphabeticText = text.replace(/[^A-Za-z\s]/g, '');
        setName(alphabeticText);
    }, []);

    const handleAgeChange = useCallback((text) => {
        const numericText = text.replace(/[^0-9]/g, '');
        setAge(numericText);
    }, []);

    const handlePhoneChange = useCallback((text) => {
        const numericText = text.replace(/[^0-9]/g, '');
        setPhone(numericText);
    }, []);

    return {
        // State
        phone,
        name,
        gender,
        address,
        age,
        loading,

        // Bus info
        originCity,
        destinationCity,
        date_of_journey,
        departureTime,
        arrivalTime,
        selectedBus,
        selectedSeats,
        priceToPay,
        boardingPoint,
        droppingPoint,

        // Formatted data
        formattedTimes,

        // Methods
        setGender,
        setAddress,
        handleNameChange,
        handleAgeChange,
        handlePhoneChange,
        handleTicketBooking,
    };
};
