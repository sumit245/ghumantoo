import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { authFromMobile } from '../actions/userActions';

/**
 * Custom hook for Sign In screen business logic
 * 
 * Handles:
 * - Phone number validation
 * - OTP sending
 * - Guest mode (skip for now)
 * - Error handling and user feedback
 * 
 * @returns {Object} Sign-in state and methods
 */
export const useSignIn = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { skipForNow } = useAuth();

    /**
     * Validate phone number format
     * Expected format: +91XXXXXXXXXX (13 characters)
     * @param {string} phone - Phone number to validate
     * @returns {boolean} True if valid
     */
    const validatePhoneNumber = useCallback((phone) => {
        const isValid = phone.length === 13;
        setError(!isValid);
        return isValid;
    }, []);

    /**
     * Send OTP to the provided phone number
     * Validates phone number, dispatches auth action, navigates to OTP screen
     */
    const sendOTP = useCallback(async () => {
        setLoading(true);

        try {
            // Validate phone number
            if (!validatePhoneNumber(phoneNumber)) {
                console.warn('Please enter a valid phone number');
                setLoading(false);
                return;
            }

            // Extract actual number (remove country code)
            const actualNumber = phoneNumber.slice(3); // Removes "+91"

            // Dispatch authentication action
            await dispatch(authFromMobile(actualNumber));

            // Navigate to OTP verification screen
            navigation.navigate('verification');
        } catch (err) {
            console.error('Send OTP error:', err);
        } finally {
            setLoading(false);
        }
    }, [phoneNumber, validatePhoneNumber, dispatch, navigation]);

    /**
     * Handle guest mode (skip sign in)
     * Sets guest flag and navigates to main app
     */
    const handleSkip = useCallback(async () => {
        setLoading(true);

        try {
            await skipForNow();
            navigation.navigate('Main', { screen: 'Home' });
        } catch (err) {
            console.error('Skip sign in error:', err);
        } finally {
            setLoading(false);
        }
    }, [skipForNow, navigation]);

    /**
     * Update phone number and clear error state
     */
    const handlePhoneChange = useCallback((value) => {
        setPhoneNumber(value);
        if (error) setError(false);
    }, [error]);

    return {
        // State
        phoneNumber,
        error,
        loading,

        // Methods
        sendOTP,
        handleSkip,
        handlePhoneChange,
    };
};
