import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { verifyUserOTP } from '../actions/userActions';

/**
 * Custom hook for OTP Verification screen business logic
 * 
 * Handles:
 * - OTP input management
 * - OTP verification with backend
 * - Token persistence
 * - Navigation after successful verification
 * - Error handling
 * 
 * @returns {Object} OTP verification state and methods
 */
export const useOTPVerification = () => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    const { mobile_number, message } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { signIn } = useAuth();
    const navigation = useNavigation();

    /**
     * Verify OTP with backend
     * On success: persists token, updates Redux, navigates to main screen
     * On failure: shows error message to user
     */
    const verifyOTP = useCallback(async () => {
        setLoading(true);

        try {
            // Dispatch OTP verification action
            const result = await dispatch(verifyUserOTP(mobile_number, otp));

            // Check if verification was successful
            if (result && result.status === 200 && result.token) {
                // Persist token and user data (AuthContext updates Redux as well)
                await signIn(result.token, result.user);

                // Show success message
                console.log('Verification successful!');

                // Navigate to main screen
                navigation.replace('Main');
            } else {
                // Verification failed
                console.warn('Verification failed. Please check the OTP and try again.');
            }
        } catch (err) {
            console.error('OTP verification error:', err);

            // Handle different error scenarios
            const errorMessage = err?.response?.data?.message || 'OTP verification failed. Please try again.';
            console.warn(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [mobile_number, otp, dispatch, signIn, navigation]);

    /**
     * Resend OTP to user's mobile number
     */
    const resendOTP = useCallback(async () => {
        try {
            // TODO: Implement resend OTP action
            // await dispatch(resendOTPAction(mobile_number));
            console.log('A new code has been sent to your mobile number.');
        } catch (err) {
            console.error('Resend OTP error:', err);
            console.warn('Failed to resend OTP. Please try again.');
        }
    }, [mobile_number]);

    /**
     * Update OTP value from OTP component
     */
    const handleOTPChange = useCallback((value) => {
        setOtp(value);
    }, []);

    return {
        // State
        otp,
        loading,
        mobile_number,
        message,

        // Methods
        verifyOTP,
        resendOTP,
        handleOTPChange,
    };
};
