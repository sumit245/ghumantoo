import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Linking } from 'react-native';
import { useAuth } from '../context/AuthContext';

export const useAccount = () => {
    const navigation = useNavigation();
    const { signOut, isGuest } = useAuth();

    // Get user data from Redux store
    const { email_id, mobile_number, name } = useSelector((state) => state.user);

    // Handle logout
    const handleLogout = useCallback(async () => {
        await signOut();
    }, [signOut]);

    // Handle profile edit navigation
    const handleEditProfile = useCallback(() => {
        navigation.navigate('editProfile');
    }, [navigation]);

    // Handle menu item click (open URL or navigate)
    const handleMenuItemPress = useCallback(async (whereTo) => {
        if (whereTo.startsWith('http')) {
            await Linking.openURL(whereTo);
        } else {
            navigation.navigate(whereTo);
        }
    }, [navigation]);

    // Handle login press for guest users
    const handleLoginPress = useCallback(() => {
        signOut();
    }, [signOut]);

    return {
        // User data
        name: name || "Guest",
        email: email_id || "Not provided",
        mobile: mobile_number,

        // Auth state
        isGuest,

        // Handlers
        handleLogout,
        handleEditProfile,
        handleMenuItemPress,
        handleLoginPress,
    };
};
