import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the context object
const AuthContext = createContext();

// Create the provider component. This will wrap your entire app.
export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // This effect runs once on app startup to check for a stored token
    useEffect(() => {
        const bootstrapAsync = async () => {
            let token = null;
            try {
                // We only need to check for the token. The user_id is secondary.
                token = await AsyncStorage.getItem('user_token');
            } catch (e) {
                console.error("AuthContext: Failed to restore token", e);
            }

            // Update state based on the token found
            setUserToken(token);
            setIsLoading(false); // Finished loading, ready to show the app
        };

        bootstrapAsync();
    }, []);

    // useMemo optimizes performance by memoizing the context value
    const authContextValue = useMemo(
        () => ({
            // Call this function when the user successfully logs in
            signIn: async (token) => {
                setIsLoading(true);
                await AsyncStorage.setItem('user_token', token);
                setUserToken(token);
                setIsLoading(false);
            },
            // Call this function to log the user out
            signOut: async () => {
                setIsLoading(true);
                await AsyncStorage.removeItem('user_token');
                setUserToken(null);
                setIsLoading(false);
            },
            userToken,
        }),
        [userToken]
    );

    // While checking for the token, display a loading indicator.
    // This prevents the screen flicker.
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

// A custom hook to easily access the auth context from any component
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
