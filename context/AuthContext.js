import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [isGuest, setIsGuest] = useState(false); // New state for guest users
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const bootstrapAsync = async () => {
            let token = null;
            let guestFlag = null;
            try {
                token = await AsyncStorage.getItem('user_token');
                guestFlag = await AsyncStorage.getItem('is_guest');
            } catch (e) {
                console.error("AuthContext: Failed to restore session", e);
            }

            setUserToken(token);
            setIsGuest(guestFlag === 'true');
            setIsLoading(false);
        };

        bootstrapAsync();
    }, []);

    const authContextValue = useMemo(
        () => ({
            signIn: async (token) => {
                setIsLoading(true);
                await AsyncStorage.setItem('user_token', token);
                await AsyncStorage.removeItem('is_guest'); // Ensure guest flag is removed
                setUserToken(token);
                setIsGuest(false);
                setIsLoading(false);
            },
            // New function for skipping login
            skipForNow: async () => {
                setIsLoading(true);
                await AsyncStorage.setItem('is_guest', 'true');
                setIsGuest(true);
                setIsLoading(false);
            },
            signOut: async () => {
                setIsLoading(true);
                await AsyncStorage.removeItem('user_token');
                await AsyncStorage.removeItem('is_guest'); // Also clear guest flag on logout
                setUserToken(null);
                setIsGuest(false);
                setIsLoading(false);
            },
            userToken,
            isGuest, // Expose guest state to the rest of the app
        }),
        [userToken, isGuest]
    );

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
