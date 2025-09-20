import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { AUTH_USER, LOGOUT } from '../utils/constants'; // adjust path if constants live elsewhere

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [userToken, setUserToken] = useState(null);
    const [isGuest, setIsGuest] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const bootstrapAsync = async () => {
            try {
                const token = await AsyncStorage.getItem('user_token');
                const userJson = await AsyncStorage.getItem('user'); // saved JSON user object
                const isGuestFlag = await AsyncStorage.getItem('is_guest');

                if (token && userJson) {
                    const user = JSON.parse(userJson);
                    // update redux with user object so app can immediately use it
                    dispatch({ type: AUTH_USER, payload: user });
                    setUserToken(token);
                    setIsGuest(false);
                } else if (isGuestFlag === 'true') {
                    setIsGuest(true);
                    setUserToken(null);
                } else {
                    setIsGuest(true); // default to guest for smoother UX
                    setUserToken(null);
                }
            } catch (e) {
                // silently continue; app will behave as guest
                console.warn('Auth bootstrap failed', e);
            } finally {
                // Prevent flicker: only render app after bootstrap completes
                setIsLoading(false);
            }
        };

        bootstrapAsync();
    }, [dispatch]);

    const authContextValue = useMemo(
        () => ({
            signIn: async (token, user = null) => {
                setIsLoading(true);
                try {
                    if (token) {
                        await AsyncStorage.setItem('user_token', token);
                        setUserToken(token);
                    }
                    if (user) {
                        await AsyncStorage.setItem('user', JSON.stringify(user));
                        if (user.mobile_number) {
                            await AsyncStorage.setItem('mobile_number', String(user.mobile_number));
                        }
                        if (user.id !== undefined && user.id !== null) {
                            await AsyncStorage.setItem('user_id', String(user.id));
                        }
                        // update redux immediately
                        dispatch({ type: AUTH_USER, payload: user });
                    } else {
                        // try to read existing saved user
                        const savedUser = await AsyncStorage.getItem('user');
                        if (savedUser) {
                            dispatch({ type: AUTH_USER, payload: JSON.parse(savedUser) });
                        }
                    }
                    await AsyncStorage.removeItem('is_guest');
                    setIsGuest(false);
                } catch (e) {
                    console.warn('signIn save error', e);
                } finally {
                    setIsLoading(false);
                }
            },

            skipForNow: async () => {
                setIsLoading(true);
                try {
                    await AsyncStorage.setItem('is_guest', 'true');
                    setIsGuest(true);
                    setUserToken(null);
                    // ensure redux cleared for guest
                    dispatch({ type: LOGOUT });
                } catch (e) {
                    console.warn('skipForNow error', e);
                } finally {
                    setIsLoading(false);
                }
            },

            signOut: async () => {
                setIsLoading(true);
                try {
                    await AsyncStorage.removeItem('user_token');
                    await AsyncStorage.removeItem('user');
                    await AsyncStorage.removeItem('mobile_number');
                    await AsyncStorage.removeItem('user_id');
                    await AsyncStorage.removeItem('is_guest');
                    setUserToken(null);
                    setIsGuest(false);
                    dispatch({ type: LOGOUT });
                } catch (e) {
                    console.warn('signOut error', e);
                } finally {
                    setIsLoading(false);
                }
            },

            userToken,
            isGuest,
        }),
        [userToken, isGuest, dispatch]
    );

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
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
});
